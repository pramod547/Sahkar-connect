import React from 'react';

export default function HomePage() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B4F4A]">SahakarConnect</h1>
        <p className="text-sm text-gray-600">Cooperative Household Services</p>
      </header>

      <div className="bg-[#FBF7EF] p-4 rounded-xl border border-[#E8A33D]/30 mb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#0B4F4A] mb-1">
          <span className="bg-[#E8A33D] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">Cooperative</span>
          <span>100% Member Owned & Verified</span>
        </div>
        <p className="text-xs text-gray-700">
          Services provided by Labour Cooperative Societies. Transparent 12% total platform fee.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-[#0B4F4A] mb-3">Browse Services</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg border border-gray-200 hover:border-[#0B4F4A] transition bg-white shadow-sm flex flex-col items-center text-center">
            <span className="text-3xl mb-2">⚡</span>
            <span className="font-medium text-sm">Electrical</span>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 hover:border-[#0B4F4A] transition bg-white shadow-sm flex flex-col items-center text-center">
            <span className="text-3xl mb-2">✨</span>
            <span className="font-medium text-sm">Cleaning</span>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 hover:border-[#0B4F4A] transition bg-white shadow-sm flex flex-col items-center text-center">
            <span className="text-3xl mb-2">💧</span>
            <span className="font-medium text-sm">Plumbing</span>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 hover:border-[#0B4F4A] transition bg-white shadow-sm flex flex-col items-center text-center">
            <span className="text-3xl mb-2">❤️</span>
            <span className="font-medium text-sm">Caregiving</span>
          </div>
        </div>
      </section>
    </div>
  );
}
