'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HardHat, ShieldCheck, Star, Award, Heart, CheckCircle2, LogOut, ArrowUpRight, DollarSign } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const [workerSession, setWorkerSession] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('sahakar_worker_session');
    if (session) {
      setWorkerSession(JSON.parse(session));
    } else {
      // Default mock worker for demo
      setWorkerSession({
        workerCode: 'SKC-GOVT-401',
        name: 'Ramesh Kumar Patil',
        age: 38,
        rating: 4.9,
        hourlyRate: 350,
        category: 'Electrical Services',
        workerType: 'government',
        completedJobs: 142,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sahakar_worker_session');
    router.push('/worker-portal');
  };

  if (!workerSession) return null;

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-[#1B5E4B] text-white flex items-center justify-center font-extrabold text-base">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#1B5E4B]">Worker Dashboard</h1>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              ONLINE & READY
            </span>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Worker Member Card */}
      <div className="bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] p-5 rounded-2xl text-white mb-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              {workerSession.workerType?.toUpperCase() || 'GOVERNMENT'} MEMBER
            </span>
            <h2 className="text-xl font-extrabold mt-1">{workerSession.name}</h2>
            <p className="text-xs text-emerald-100 font-mono mt-0.5">ID: {workerSession.workerCode}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold border border-white/30">
            {workerSession.name
              ? workerSession.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2)
              : 'RK'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
          <div>
            <span className="text-[10px] text-emerald-200 block">Rating</span>
            <span className="text-sm font-extrabold flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 mr-1" />
              {workerSession.rating || '4.9'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block">Age</span>
            <span className="text-sm font-extrabold">{workerSession.age || '38'} yrs</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block">Rate</span>
            <span className="text-sm font-extrabold">₹{workerSession.hourlyRate || '350'}/hr</span>
          </div>
        </div>
      </div>

      {/* Today's Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <DollarSign className="w-4 h-4 text-[#1B5E4B]" />
            <span className="text-xs font-bold text-gray-600">Today's Earnings</span>
          </div>
          <span className="text-xl font-extrabold text-[#1B5E4B]">₹1,400.00</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">88% Direct Payout</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <CheckCircle2 className="w-4 h-4 text-[#C67B4C]" />
            <span className="text-xs font-bold text-gray-600">Jobs Completed</span>
          </div>
          <span className="text-xl font-extrabold text-[#2B2B2B]">4 Jobs</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Total: {workerSession.completedJobs || 142}</span>
        </div>
      </div>

      {/* Active Job Alert Banner */}
      <div className="bg-white p-4 rounded-2xl border-2 border-[#1B5E4B] shadow-md mb-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
              New Fair-Match Job Offer
            </span>
            <h3 className="font-extrabold text-sm text-[#1B5E4B] mt-1.5">Electrical Inspection & Repair</h3>
            <p className="text-xs text-gray-600 mt-0.5">Location: Bandra West (1.2 km away)</p>
            <span className="text-xs font-extrabold text-[#1B5E4B] block mt-1">Payout: ₹440.00 (88% split)</span>
          </div>
          <button className="bg-[#1B5E4B] text-white text-xs font-bold px-3 py-2 rounded-xl shadow cursor-pointer flex items-center">
            Accept <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Welfare Fund & Protections */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs mb-5">
        <h3 className="text-xs font-extrabold text-[#1B5E4B] uppercase tracking-wider mb-2 flex items-center">
          <Heart className="w-4 h-4 text-rose-500 mr-1.5" /> Society Welfare Coverage
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          Your society welfare fund has <strong className="text-[#1B5E4B]">₹25,000.00</strong> available for medical & tool loss claims.
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout from Worker Portal</span>
      </button>
    </div>
  );
}
