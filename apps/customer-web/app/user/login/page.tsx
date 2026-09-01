'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Lock, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function UserLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('9123456789');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem(
        'sahakar_user_session',
        JSON.stringify({
          phone,
          name: 'Ananya Sharma',
          address: 'Bandra West, Mumbai',
        })
      );
      router.push('/user/profile');
    }, 600);
  };

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-base">
              <User className="w-5 h-5" />
            </div>
            <h1 className="text-base font-extrabold text-[#1B5E4B]">Customer Login</h1>
          </div>
          <LanguageSwitcher />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <h2 className="text-lg font-extrabold text-[#1B5E4B] mb-1">Customer Portal</h2>
          <p className="text-xs text-gray-500 mb-6">Log in to track bookings, view history, and rate workers</p>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <span>Send OTP Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>OTP sent to +91 {phone} (Demo OTP: 123456)</span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Enter 6-Digit OTP</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B] tracking-widest font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <span>{isSubmitting ? 'Logging in...' : 'Login to Profile'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
