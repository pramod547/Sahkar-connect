import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-[#1B5E4B]">SahakarConnect Governance Portal</h1>
          <p className="text-sm text-gray-600">Cooperative Society & Federation Administration</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-[#1B5E4B] text-white text-xs px-3.5 py-1.5 rounded-full font-bold">
            Society Admin Scoped
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Workers</span>
          <p className="text-2xl font-bold text-[#1B5E4B] mt-1">24</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Approvals</span>
          <p className="text-2xl font-bold text-[#C67B4C] mt-1">3</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Disputes SLA</span>
          <p className="text-2xl font-bold text-[#7BA68D] mt-1">0 Breach</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Welfare Fund Balance</span>
          <p className="text-2xl font-bold text-[#1B5E4B] mt-1">₹25,000</p>
        </div>
      </div>
    </div>
  );
}
