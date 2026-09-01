'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, MapPin, Calendar, Star, LogOut, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function UserProfilePage() {
  const router = useRouter();
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('sahakar_user_session');
    if (session) {
      setUserSession(JSON.parse(session));
    } else {
      setUserSession({
        name: 'Ananya Sharma',
        phone: '9123456789',
        address: 'Bandra West, Mumbai',
      });
    }
  }, []);

  const mockBookings = [
    {
      id: 'demo-booking-101',
      serviceName: 'Electrical Repair & Inspection',
      workerName: 'Ramesh Kumar Patil',
      workerCode: 'SKC-GOVT-401',
      date: 'Today, 4:00 PM',
      status: 'completed',
      amount: '₹350.00',
    },
    {
      id: 'demo-booking-102',
      serviceName: 'Deep Home Cleaning',
      workerName: 'Sunita Sharma',
      workerCode: 'SKC-PRIV-802',
      date: 'Yesterday, 11:00 AM',
      status: 'completed',
      amount: '₹400.00',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sahakar_user_session');
    router.push('/');
  };

  if (!userSession) return null;

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-[#1B5E4B] text-white flex items-center justify-center font-extrabold text-base">
            <User className="w-5 h-5" />
          </div>
          <h1 className="text-base font-extrabold text-[#1B5E4B]">Customer Profile</h1>
        </div>
        <LanguageSwitcher />
      </div>

      {/* User Info Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md mb-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#1B5E4B]">{userSession.name}</h2>
            <span className="text-xs text-gray-500 block">+91 {userSession.phone}</span>
            <div className="flex items-center text-xs text-gray-600 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C67B4C] mr-1" />
              <span>{userSession.address}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#F5ECD7] flex items-center justify-center font-bold text-[#1B5E4B] text-base border-2 border-[#1B5E4B]">
            AS
          </div>
        </div>
      </div>

      {/* Booking History & Feedback Prompts */}
      <div className="mb-5">
        <h3 className="text-xs font-extrabold text-[#1B5E4B] uppercase tracking-wider mb-3">
          Your Booking History
        </h3>

        <div className="space-y-3">
          {mockBookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    {b.status}
                  </span>
                  <h4 className="font-extrabold text-sm text-[#2B2B2B] mt-1">{b.serviceName}</h4>
                  <span className="text-xs text-gray-500 font-medium block mt-0.5">
                    Worker: {b.workerName} ({b.workerCode})
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#1B5E4B]">{b.amount}</span>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-2">
                <span className="text-[11px] text-gray-400 font-medium flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {b.date}
                </span>

                <Link
                  href={`/feedback/${b.id}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#C67B4C] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 transition"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Rate Worker</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-xs cursor-pointer"
      >
        <LogOut className="w-4 h-4 text-gray-400" />
        <span>Logout</span>
      </button>
    </div>
  );
}
