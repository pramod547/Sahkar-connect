import { PrismaClient, PaymentStatus, PayoutStatus, WelfareEntryType, WelfareClaimStatus } from '@prisma/client';
import { CreateWelfareClaimInput, ReviewWelfareClaimInput } from '@sahakar/shared-types';

export class PaymentsService {
  constructor(private prisma: PrismaClient) {}

  async createRazorpayOrder(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new Error('BOOKING_NOT_FOUND');
    }

    const mockOrderId = `order_mock_${Date.now()}`;
    return {
      razorpay_order_id: mockOrderId,
      amount: Number(booking.total_price),
      currency: 'INR',
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkeyid12345',
    };
  }

  /**
   * COOP_BUSINESS_LOGIC.md §2:
   * Commission math: 88% Worker Payout, 5% Tech Ops Fee, 4% Welfare Fund, 3% Federation Fee.
   */
  async handlePaymentCapture(bookingId: string, razorpayOrderId: string, amountNum: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        job_assignment: true,
      },
    });

    if (!booking || !booking.job_assignment) {
      throw new Error('BOOKING_OR_ASSIGNMENT_NOT_FOUND');
    }

    const workerId = booking.job_assignment.worker_id;

    const workerPayoutAmount = Number((amountNum * 0.88).toFixed(2));
    const techOpsFeeAmount = Number((amountNum * 0.05).toFixed(2));
    const welfareContribAmount = Number((amountNum * 0.04).toFixed(2));
    const federationFeeAmount = Number((amountNum * 0.03).toFixed(2));

    // 1. Create Payment record
    const payment = await this.prisma.payment.create({
      data: {
        booking_id: bookingId,
        razorpay_order_id: razorpayOrderId,
        amount: amountNum,
        status: PaymentStatus.captured,
        worker_payout_amount: workerPayoutAmount,
        tech_ops_fee_amount: techOpsFeeAmount,
        welfare_contribution_amount: welfareContribAmount,
        federation_fee_amount: federationFeeAmount,
      },
    });

    // 2. Create Payout entry for worker ledger
    const payout = await this.prisma.payout.create({
      data: {
        worker_id: workerId,
        payment_id: payment.id,
        amount: workerPayoutAmount,
        status: PayoutStatus.pending,
      },
    });

    // 3. Create Welfare Fund Ledger entry for society
    const latestLedgerEntry = await this.prisma.welfareFundLedger.findFirst({
      where: { society_id: booking.society_id },
      orderBy: { created_at: 'desc' },
    });

    const currentBalance = latestLedgerEntry ? Number(latestLedgerEntry.running_balance) : 0;
    const newBalance = Number((currentBalance + welfareContribAmount).toFixed(2));

    await this.prisma.welfareFundLedger.create({
      data: {
        society_id: booking.society_id,
        entry_type: WelfareEntryType.contribution,
        amount: welfareContribAmount,
        related_payment_id: payment.id,
        running_balance: newBalance,
      },
    });

    return { payment, payout, welfare_contribution: welfareContribAmount };
  }

  async getWorkerPayouts(workerId: string) {
    const payouts = await this.prisma.payout.findMany({
      where: { worker_id: workerId },
      include: {
        payment: {
          include: {
            booking: {
              include: {
                listing: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    const pendingTotal = payouts
      .filter((p) => p.status === 'pending')
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const paidTotal = payouts
      .filter((p) => p.status === 'paid')
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      payouts,
      pending_total: pendingTotal.toFixed(2),
      paid_total: paidTotal.toFixed(2),
    };
  }

  async getSocietyWelfareFund(societyId: string) {
    const latest = await this.prisma.welfareFundLedger.findFirst({
      where: { society_id: societyId },
      orderBy: { created_at: 'desc' },
    });

    const history = await this.prisma.welfareFundLedger.findMany({
      where: { society_id: societyId },
      orderBy: { created_at: 'desc' },
      take: 20,
    });

    return {
      running_balance: latest ? Number(latest.running_balance).toFixed(2) : '0.00',
      history,
    };
  }

  async createWelfareClaim(workerId: string, input: CreateWelfareClaimInput) {
    return this.prisma.welfareClaim.create({
      data: {
        worker_id: workerId,
        category: input.category as any,
        description: input.description,
        document_url: input.document_url || null,
        status: WelfareClaimStatus.filed,
      },
    });
  }

  async reviewWelfareClaim(claimId: string, adminUserId: string, input: ReviewWelfareClaimInput) {
    const claim = await this.prisma.welfareClaim.findUnique({
      where: { id: claimId },
      include: {
        worker: true,
      },
    });

    if (!claim) {
      throw new Error('CLAIM_NOT_FOUND');
    }

    const newStatus = input.status === 'approved' ? WelfareClaimStatus.approved : WelfareClaimStatus.rejected;

    const updatedClaim = await this.prisma.welfareClaim.update({
      where: { id: claimId },
      data: {
        status: newStatus,
        reviewed_by: adminUserId,
        review_note: input.review_note || null,
      },
    });

    // If approved, record disbursement in WelfareFundLedger
    if (newStatus === WelfareClaimStatus.approved) {
      const claimAmount = 5000.0; // Default grant amount for demo claim
      const latestLedgerEntry = await this.prisma.welfareFundLedger.findFirst({
        where: { society_id: claim.worker.society_id },
        orderBy: { created_at: 'desc' },
      });

      const currentBalance = latestLedgerEntry ? Number(latestLedgerEntry.running_balance) : 0;
      const newBalance = Number((currentBalance - claimAmount).toFixed(2));

      await this.prisma.welfareFundLedger.create({
        data: {
          society_id: claim.worker.society_id,
          entry_type: WelfareEntryType.claim_payout,
          amount: -claimAmount,
          related_claim_id: claim.id,
          running_balance: newBalance,
        },
      });
    }

    return updatedClaim;
  }
}
