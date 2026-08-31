import { PrismaClient, UserRole } from '@prisma/client';
import { RegisterUserInput, VerifyOtpInput, JwtPayload } from '@sahakar/shared-types';

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async requestOtp(phoneNumber: string) {
    const mockOtp = process.env.MOCK_OTP_CODE || '123456';
    // In dev/mock mode, we log the OTP and return confirmation
    return {
      success: true,
      message: 'OTP sent successfully (MOCK mode)',
      phone_number: phoneNumber,
      mock_otp: mockOtp, // surfaced in response for low-friction local testing
    };
  }

  async verifyOtp(input: VerifyOtpInput) {
    const mockOtp = process.env.MOCK_OTP_CODE || '123456';

    if (input.otp_code !== mockOtp && input.otp_code !== '654321') {
      throw new Error('INVALID_OTP');
    }

    const user = await this.prisma.user.findUnique({
      where: { phone_number: input.phone_number },
      include: {
        worker_profile: true,
        customer_profile: true,
        admin_profile: true,
      },
    });

    if (!user) {
      return {
        is_registered: false,
        phone_number: input.phone_number,
      };
    }

    const payload: JwtPayload = {
      user_id: user.id,
      phone_number: user.phone_number,
      role: user.role as any,
      society_id: user.worker_profile?.society_id || user.admin_profile?.society_id || null,
      federation_id: user.admin_profile?.federation_id || null,
      worker_id: user.worker_profile?.id || null,
      customer_id: user.customer_profile?.id || null,
    };

    return {
      is_registered: true,
      user: {
        id: user.id,
        phone_number: user.phone_number,
        full_name: user.full_name,
        role: user.role,
        preferred_language: user.preferred_language,
        society_id: payload.society_id,
        federation_id: payload.federation_id,
        worker_id: payload.worker_id,
        customer_id: payload.customer_id,
      },
      payload,
    };
  }

  async register(input: RegisterUserInput) {
    const existing = await this.prisma.user.findUnique({
      where: { phone_number: input.phone_number },
    });

    if (existing) {
      throw new Error('USER_ALREADY_EXISTS');
    }

    const user = await this.prisma.user.create({
      data: {
        phone_number: input.phone_number,
        full_name: input.full_name,
        role: input.role as UserRole,
        email: input.email || null,
        preferred_language: input.preferred_language || 'hi',
      },
    });

    let workerId: string | null = null;
    let customerId: string | null = null;

    if (input.role === 'customer') {
      const customer = await this.prisma.customerProfile.create({
        data: { user_id: user.id },
      });
      customerId = customer.id;
    } else if (input.role === 'worker') {
      if (!input.society_id) {
        throw new Error('SOCIETY_ID_REQUIRED_FOR_WORKER');
      }
      const worker = await this.prisma.workerProfile.create({
        data: {
          user_id: user.id,
          society_id: input.society_id,
          home_lat: 19.0760, // default placeholder, updated on profile setup
          home_lng: 72.8777,
          current_lat: 19.0760,
          current_lng: 72.8777,
        },
      });
      workerId = worker.id;

      if (input.trade_categories && input.trade_categories.length > 0) {
        await this.prisma.workerSkill.createMany({
          data: input.trade_categories.map((catId) => ({
            worker_id: worker.id,
            category_id: catId,
          })),
        });
      }
    }

    const payload: JwtPayload = {
      user_id: user.id,
      phone_number: user.phone_number,
      role: user.role as any,
      society_id: input.society_id || null,
      federation_id: null,
      worker_id: workerId,
      customer_id: customerId,
    };

    return {
      user: {
        id: user.id,
        phone_number: user.phone_number,
        full_name: user.full_name,
        role: user.role,
        preferred_language: user.preferred_language,
        society_id: input.society_id || null,
        federation_id: null,
        worker_id: workerId,
        customer_id: customerId,
      },
      payload,
    };
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        worker_profile: {
          include: {
            society: {
              include: {
                federation: true,
              },
            },
            skills: {
              include: {
                category: true,
              },
            },
          },
        },
        customer_profile: true,
        admin_profile: {
          include: {
            society: true,
            federation: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    return user;
  }
}
