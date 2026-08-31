'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, AlertCircle, FileCheck } from 'lucide-react';

export default function KycVerificationAdminPage() {
  const [searchUan, setSearchUan] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);

  const handleLookup = () => {
    if (!searchUan) return;
    setLookupResult({
      uan: searchUan,
      workerName: 'Rajesh Shinde',
      eShramStatus: 'VERIFIED',
      tradeCategory: 'Electrical Worker (NCO 7411)',
      digiLockerAadhaar: 'XXXX-XXXX-8812 (Verified via DigiLocker)',
      issuedBy: 'Ministry of Labour & Employment (Govt of India)',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-[#0B4F4A]">e-Shram & DigiLocker Member Verification</h1>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-300">
            MOCK INTEGRATION
          </span>
        </div>
        <p className="text-sm text-gray-600">Honest Phased Verification Lookup (INTEGRATIONS.md §4 & §5)</p>
      </header>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 max-w-2xl">
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
          Enter e-Shram UAN (Universal Account Number)
        </label>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="e.g. 1000 4488 9912"
            value={searchUan}
            onChange={(e) => setSearchUan(e.target.value)}
            className="flex-1 text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B4F4A]"
          />
          <button
            onClick={handleLookup}
            className="bg-[#0B4F4A] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow hover:bg-[#147D74] flex items-center"
          >
            <Search className="w-4 h-4 mr-1.5" /> Lookup UAN
          </button>
        </div>
      </div>

      {lookupResult && (
        <div className="bg-white p-6 rounded-xl border border-[#2E8B57] shadow-md max-w-2xl">
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
            <div>
              <span className="bg-[#2E8B57]/10 text-[#2E8B57] text-xs font-bold px-2.5 py-1 rounded-full uppercase inline-flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {lookupResult.eShramStatus}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-2">{lookupResult.workerName}</h3>
            </div>
            <span className="text-xs font-mono text-gray-500">UAN: {lookupResult.uan}</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Trade Classification:</span>
              <span className="font-semibold text-[#0B4F4A]">{lookupResult.tradeCategory}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Aadhaar Identity Verification:</span>
              <span className="font-semibold text-gray-800">{lookupResult.digiLockerAadhaar}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Issuer Authority:</span>
              <span className="font-medium text-gray-700">{lookupResult.issuedBy}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
            <button className="bg-[#2E8B57] text-white text-xs font-bold px-4 py-2 rounded-lg shadow hover:bg-[#246e44]">
              Approve Worker Member Credentials
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
