'use client';

import React, { useState } from 'react';
import { UserCheck, Shield, FileText, CheckCircle, Clock } from 'lucide-react';

export default function WorkersAdminPage() {
  const [workers, setWorkers] = useState([
    {
      id: 'w-101',
      name: 'Amitabh Kamble',
      phone: '+91 92000 00005',
      trade: 'Electrical Services',
      status: 'documents_pending',
      kycType: 'e_shram_card',
      storageUrl: 'https://mock-storage.sahakar.in/kyc/eshram_mock.pdf',
    },
    {
      id: 'w-102',
      name: 'Santosh Chavan',
      phone: '+91 92000 00006',
      trade: 'Electrical Services',
      status: 'verified',
      kycType: 'e_shram_card',
      storageUrl: 'https://mock-storage.sahakar.in/kyc/eshram_mock.pdf',
    },
  ]);

  const handleApproveWorker = (workerId: string) => {
    setWorkers(
      workers.map((w) => (w.id === workerId ? { ...w, status: 'active' } : w))
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0B4F4A]">Worker Verification & Approval Queue</h1>
        <p className="text-sm text-gray-600">Society Admin KYC & Certification Verification</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0B4F4A] text-white uppercase text-xs">
            <tr>
              <th className="p-4">Worker Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Trade</th>
              <th className="p-4">KYC Document</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workers.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-900">{w.name}</td>
                <td className="p-4 text-gray-600">{w.phone}</td>
                <td className="p-4 font-medium text-[#0B4F4A]">{w.trade}</td>
                <td className="p-4">
                  <span className="inline-flex items-center text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                    <FileText className="w-3.5 h-3.5 mr-1 text-[#0B4F4A]" /> {w.kycType} (MOCK)
                  </span>
                </td>
                <td className="p-4">
                  {w.status === 'active' ? (
                    <span className="inline-flex items-center text-xs font-bold bg-[#2E8B57]/10 text-[#2E8B57] px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-bold bg-[#E8A33D]/10 text-[#E8A33D] px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Pending Verification
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {w.status !== 'active' && (
                    <button
                      onClick={() => handleApproveWorker(w.id)}
                      className="bg-[#2E8B57] hover:bg-[#246e44] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition inline-flex items-center"
                    >
                      <UserCheck className="w-3.5 h-3.5 mr-1" /> Approve Worker
                    </button>
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
