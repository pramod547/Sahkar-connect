'use client';

import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export default function DisputesAdminPage() {
  const [disputes, setDisputes] = useState([
    {
      id: 'dsp-301',
      bookingId: 'bk-1001',
      filedBy: 'Aarav Sharma (Customer)',
      category: 'quality',
      description: 'Fan speed control switch was not properly connected after repair.',
      status: 'society_review',
      slaDeadline: '2026-09-02T14:00:00Z (38h remaining)',
    },
  ]);

  const handleResolveDispute = (disputeId: string) => {
    setDisputes(
      disputes.map((d) => (d.id === disputeId ? { ...d, status: 'resolved' } : d))
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0B4F4A]">Dispute Queue & SLA Escalation</h1>
        <p className="text-sm text-gray-600">48-Hour Society Resolution SLA (Auto-Escalates to Federation on Breach)</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0B4F4A] text-white uppercase text-xs">
            <tr>
              <th className="p-4">Dispute ID</th>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Filed By</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">48h SLA Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {disputes.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-mono font-semibold text-gray-700">{d.id}</td>
                <td className="p-4 font-mono text-xs text-gray-600">{d.bookingId}</td>
                <td className="p-4 font-medium text-gray-900">{d.filedBy}</td>
                <td className="p-4 uppercase text-xs font-bold text-[#C0392B]">{d.category}</td>
                <td className="p-4 text-xs text-gray-700 max-w-xs">{d.description}</td>
                <td className="p-4 text-xs">
                  <span className="inline-flex items-center text-[#D97706] font-bold bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 mr-1" /> {d.slaDeadline}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {d.status !== 'resolved' ? (
                    <button
                      onClick={() => handleResolveDispute(d.id)}
                      className="bg-[#0B4F4A] hover:bg-[#147D74] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition inline-flex items-center"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Resolve Dispute
                    </button>
                  ) : (
                    <span className="text-[#2E8B57] font-bold text-xs">RESOLVED</span>
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
