'use client';

import React, { useState } from 'react';
import { Eye, Shield, MapPin, Sparkles } from 'lucide-react';

export default function LiveJobsAdminPage() {
  const [selectedJobExplain, setSelectedJobExplain] = useState<any>(null);

  const jobs = [
    {
      id: 'bk-1001',
      customer: 'Aarav Sharma',
      address: 'Bandra West, Mumbai',
      service: 'Fan Installation & Repair',
      status: 'assigned',
      assignedWorker: 'Rajesh Shinde',
      fairMatchScore: 0.8925,
      breakdown: {
        proximity: 0.95,
        rating: 0.97,
        fairness: 0.75, // 2 jobs this week
        skill: 1.0,
      },
    },
    {
      id: 'bk-1002',
      customer: 'Priya Iyer',
      address: 'Andheri East, Mumbai',
      service: 'Switchboard Repair',
      status: 'in_progress',
      assignedWorker: 'Mahesh Jadhav',
      fairMatchScore: 0.8450,
      breakdown: {
        proximity: 0.80,
        rating: 0.98,
        fairness: 0.60,
        skill: 1.0,
      },
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#1B5E4B]">Society Live Jobs & Fair-Match Audit</h1>
        <p className="text-sm text-gray-600">Society-Scoped Dispatch Monitoring & Explainability</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1B5E4B] text-white uppercase text-xs">
            <tr>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Status</th>
              <th className="p-4">Assigned Worker</th>
              <th className="p-4">Fair-Match Score</th>
              <th className="p-4 text-right">Explainability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-mono font-semibold text-gray-700">{j.id}</td>
                <td className="p-4 font-medium text-gray-900">{j.customer}</td>
                <td className="p-4 text-gray-700">{j.service}</td>
                <td className="p-4">
                  <span className="bg-[#1B5E4B]/10 text-[#1B5E4B] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    {j.status}
                  </span>
                </td>
                <td className="p-4 font-semibold text-[#1B5E4B]">{j.assignedWorker}</td>
                <td className="p-4 font-bold text-[#C67B4C]">{j.fairMatchScore.toFixed(4)}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedJobExplain(j)}
                    className="bg-[#1B5E4B] hover:bg-[#7BA68D] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition inline-flex items-center cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C67B4C]" /> Audit Match
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fair-Match Explainability Panel Modal (design.md §4 & §5) */}
      {selectedJobExplain && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FEFAF3] rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-gray-200">
            <div className="flex justify-between items-start mb-4 border-b pb-3">
              <div>
                <span className="text-xs font-bold text-[#C67B4C] uppercase tracking-wider">
                  Fair-Match Explainability Audit
                </span>
                <h3 className="text-lg font-bold text-[#1B5E4B]">
                  Dispatch Calculation for {selectedJobExplain.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobExplain(null)}
                className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Selected Worker: <strong className="text-[#1B5E4B]">{selectedJobExplain.assignedWorker}</strong> (Final Score: {selectedJobExplain.fairMatchScore})
            </p>

            <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Proximity Score (W_prox = 30%)</span>
                  <span className="font-bold text-[#7BA68D]">{(selectedJobExplain.breakdown.proximity * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#7BA68D] h-full"
                    style={{ width: `${selectedJobExplain.breakdown.proximity * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Rotation Fairness Score (W_fair = 35%) — HIGHEST WEIGHT</span>
                  <span className="font-bold text-[#1B5E4B]">{(selectedJobExplain.breakdown.fairness * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1B5E4B] h-full"
                    style={{ width: `${selectedJobExplain.breakdown.fairness * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">
                  * High score gives priority to member-workers below society median weekly job count.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Rating Score (W_rating = 20%)</span>
                  <span className="font-bold text-[#D4A843]">{(selectedJobExplain.breakdown.rating * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D4A843] h-full"
                    style={{ width: `${selectedJobExplain.breakdown.rating * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Skill Match Score (W_skill = 15%)</span>
                  <span className="font-bold text-[#C67B4C]">{(selectedJobExplain.breakdown.skill * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C67B4C] h-full"
                    style={{ width: `${selectedJobExplain.breakdown.skill * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedJobExplain(null)}
                className="bg-[#1B5E4B] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close Audit Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
