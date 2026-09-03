'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HardHat, ShieldCheck, Star, Award, Heart, CheckCircle2, LogOut, ArrowUpRight, DollarSign, MapPin, Navigation, PhoneCall } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const [workerSession, setWorkerSession] = useState<any>(null);
  const [isJobAccepted, setIsJobAccepted] = useState(false);
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
            <h1 className="text-base font-extrabold text-[#1B5E4B]">Service Provider Dashboard</h1>
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

      {/* Active Job Alert Banner / Live Map Navigation */}
      {isJobAccepted ? (
        <div className="bg-white p-4 rounded-2xl border-2 border-[#1B5E4B] shadow-md mb-5 overflow-hidden relative">
          {/* Map Visualization Placeholder */}
          <div className="absolute inset-0 bg-blue-50 opacity-40 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Route Line */}
              <path d="M 40 120 Q 150 180 250 80 T 350 140" fill="none" stroke="#1B5E4B" strokeWidth="4" strokeDasharray="6,4" />
              <circle cx="40" cy="120" r="6" fill="#1B5E4B" />
              <circle cx="350" cy="140" r="8" fill="#C67B4C" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm">
              <div>
                <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full uppercase flex items-center w-max mb-1">
                  <Navigation className="w-3 h-3 mr-1" /> Live Navigation
                </span>
                <h3 className="font-extrabold text-sm text-[#2B2B2B]">En Route to Customer</h3>
                <p className="text-[11px] text-gray-500 font-bold mt-0.5">ETA: 8 mins (1.2 km)</p>
              </div>
              <button 
                onClick={() => setIsJobAccepted(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow cursor-pointer transition"
              >
                Arrived
              </button>
            </div>
            
            <div className="bg-white/95 p-3 rounded-xl border border-gray-100 shadow-sm mt-32">
              <h4 className="text-[10px] uppercase font-extrabold text-gray-500 mb-1">Customer Details</h4>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-[#1B5E4B] block">Ananya Sharma</span>
                  <span className="text-xs text-gray-600 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C67B4C] mr-1" /> Bandra West, Mumbai
                  </span>
                </div>
                <a href="tel:9123456789" className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
            <button 
              onClick={() => setIsJobAccepted(true)}
              className="bg-[#1B5E4B] text-white text-xs font-bold px-3 py-2 rounded-xl shadow cursor-pointer flex items-center transition hover:bg-[#7BA68D]"
            >
              Accept <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      )}

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
        <span>Logout from Service Provider Portal</span>
      </button>
    </div>
  );
}
