'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2, XCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function WelfareFundAdminPage() {
  const [balance, setBalance] = useState(25000.0);
  const [claims, setClaims] = useState([
    {
      id: 'clm-201',
      workerName: 'Rajesh Shinde',
      category: 'Medical Assistance',
      description: 'Emergency medical treatment for eye injury during electrical work',
      requestedAmount: 5000.0,
      status: 'filed',
      date: '2026-08-31',
    },
  ]);

  const handleReviewClaim = (claimId: string, action: 'approve' | 'reject') => {
    setClaims(
      claims.map((c) => (c.id === claimId ? { ...c, status: action === 'approve' ? 'approved' : 'rejected' } : c))
    );
    if (action === 'approve') {
      setBalance((prev) => prev - 5000.0);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0B4F4A]">Society Welfare Fund & Member Safety Net</h1>
        <p className="text-sm text-gray-600">Fund Pool Oversight & Claim Approvals (COOP_BUSINESS_LOGIC.md §4)</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Running Fund Balance</span>
          <p className="text-3xl font-bold text-[#0B4F4A] mt-2">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-[#2E8B57] mt-2 flex items-center font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Funded by 4% auto-split per booking
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-2 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-[#0B4F4A] text-lg">Cooperative Safety Guarantee</h3>
            <p className="text-xs text-gray-600 mt-1 max-w-md">
              Medical assistance, equipment grants, and accident coverage claims are filed by worker-members and approved by Society Governance.
            </p>
          </div>
          <Heart className="w-12 h-12 text-[#E8A33D]" />
        </div>
      </div>

      <h2 className="text-lg font-bold text-[#0B4F4A] mb-4">Pending Member Claims</h2>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0B4F4A] text-white uppercase text-xs">
            <tr>
              <th className="p-4">Worker</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">Claim Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-900">{c.workerName}</td>
                <td className="p-4 font-medium text-[#E8A33D]">{c.category}</td>
                <td className="p-4 text-gray-600 text-xs max-w-xs">{c.description}</td>
                <td className="p-4 font-bold text-[#0B4F4A]">₹{c.requestedAmount.toFixed(2)}</td>
                <td className="p-4 uppercase text-xs font-bold">
                  {c.status === 'approved' ? (
                    <span className="text-[#2E8B57]">APPROVED</span>
                  ) : c.status === 'rejected' ? (
                    <span className="text-[#C0392B]">REJECTED</span>
                  ) : (
                    <span className="text-[#E8A33D]">FILED (PENDING)</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  {c.status === 'filed' && (
                    <>
                      <button
                        onClick={() => handleReviewClaim(c.id, 'approve')}
                        className="bg-[#2E8B57] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow hover:bg-[#246e44]"
                      >
                        Approve Claim
                      </button>
                      <button
                        onClick={() => handleReviewClaim(c.id, 'reject')}
                        className="bg-[#C0392B] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow hover:bg-[#a52d21]"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
