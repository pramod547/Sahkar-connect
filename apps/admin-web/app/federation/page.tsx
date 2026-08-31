'use client';

import React from 'react';
import { Building2, ShieldCheck, Heart, Award, FileSpreadsheet } from 'lucide-react';

export default function FederationOverviewAdminPage() {
  const federationOverview = {
    name: 'Maharashtra State Labour Cooperative Federation',
    ncctReg: 'NCCT/MH/2021/0042',
    totalSocieties: 2,
    totalWorkers: 15,
    activeJobs: 2,
    totalWelfareFundPool: '₹43,500.00',
    societies: [
      {
        id: 'soc-1',
        name: 'Mumbai District Electricians Labour Cooperative Society',
        district: 'Mumbai Suburban',
        trade: 'Electrical & Appliance Repair',
        workerCount: 8,
        activeJobs: 1,
        welfareFundBalance: '₹25,000.00',
        avgRating: 4.76,
      },
      {
        id: 'soc-2',
        name: 'Pune Domestic Care & Cleaning Labour Cooperative Society',
        district: 'Pune',
        trade: 'Domestic Help & Cleaning',
        workerCount: 7,
        activeJobs: 1,
        welfareFundBalance: '₹18,500.00',
        avgRating: 4.80,
      },
    ],
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-[#0B4F4A]" />
            <h1 className="text-2xl font-bold text-[#0B4F4A]">{federationOverview.name}</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            NCCT Registration: {federationOverview.ncctReg} • Aggregate Federation Oversight
          </p>
        </div>

        <button className="bg-[#0B4F4A] text-white text-xs font-bold px-4 py-2 rounded-lg shadow hover:bg-[#147D74] flex items-center">
          <FileSpreadsheet className="w-4 h-4 mr-1.5" /> Export NCCT Audit Report
        </button>
      </header>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Affiliated Societies</span>
          <p className="text-2xl font-bold text-[#0B4F4A] mt-1">{federationOverview.totalSocieties}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Registered Workers</span>
          <p className="text-2xl font-bold text-[#0B4F4A] mt-1">{federationOverview.totalWorkers}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Active Jobs</span>
          <p className="text-2xl font-bold text-[#2E8B57] mt-1">{federationOverview.activeJobs}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Combined Welfare Pool</span>
          <p className="text-2xl font-bold text-[#E8A33D] mt-1">{federationOverview.totalWelfareFundPool}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-[#0B4F4A] mb-4">Affiliated Member Societies Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {federationOverview.societies.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-[#E8A33D] uppercase bg-[#FBF7EF] px-2 py-0.5 rounded border border-[#E8A33D]/20">
                  {s.district}
                </span>
                <h3 className="text-base font-bold text-[#0B4F4A] mt-1">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.trade}</p>
              </div>
              <span className="bg-[#2E8B57]/10 text-[#2E8B57] text-xs font-bold px-2.5 py-1 rounded-full">
                ★ {s.avgRating} Avg
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-center">
              <div>
                <span className="text-[11px] text-gray-500 block">Workers</span>
                <span className="text-base font-bold text-gray-800">{s.workerCount}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block">Live Jobs</span>
                <span className="text-base font-bold text-gray-800">{s.activeJobs}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block">Welfare Fund</span>
                <span className="text-base font-bold text-[#0B4F4A]">{s.welfareFundBalance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
