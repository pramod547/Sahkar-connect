'use client';

import React from 'react';
import Link from 'next/link';
import { HardHat, LogIn, UserPlus, ShieldCheck, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export default function WorkerPortalLanding() {
  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-[#1B5E4B] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#1B5E4B]">Sahakar Worker Portal</h1>
              <p className="text-[11px] text-gray-500">Cooperative Member Services</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] p-5 rounded-2xl text-white mb-6 shadow-lg">
          <span className="bg-[#C67B4C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Worker Ownership
          </span>
          <h2 className="text-lg font-extrabold mt-2 leading-snug">
            Get 88% Direct Payouts on Every Job
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Join verified Labour Cooperative Societies. Free skill upgrade training & 4% society welfare coverage.
          </p>
        </div>

        {/* Worker Categories Banner */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 space-y-3">
          <h3 className="text-xs font-bold text-[#1B5E4B] uppercase tracking-wider">
            Who Can Register?
          </h3>

          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="text-xs font-bold block">Government Certified Workers</span>
                <span className="text-[10px] text-emerald-700">NCCT / Skill India Certified Professionals</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
              <UserCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <span className="text-xs font-bold block">Independent Labour Co-op Members</span>
                <span className="text-[10px] text-amber-700">Self-employed tradespeople & artisans</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200">
              <Building2 className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <span className="text-xs font-bold block">Private Partner Companies</span>
                <span className="text-[10px] text-blue-700">Authorized staffing agency & vendor partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-4">
        <Link
          href="/worker-portal/register"
          className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-sm"
        >
          <UserPlus className="w-5 h-5" />
          <span>Register as a Worker / Partner</span>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </Link>

        <Link
          href="/worker-portal/login"
          className="w-full bg-white hover:bg-gray-50 border-2 border-[#1B5E4B] text-[#1B5E4B] font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-2 text-sm"
        >
          <LogIn className="w-5 h-5" />
          <span>Existing Worker Login</span>
        </Link>
      </div>
    </div>
  );
}
