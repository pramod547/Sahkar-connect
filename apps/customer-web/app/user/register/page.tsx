'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, User, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function UserRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // User details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [area, setArea] = useState('Bandra West');
  const [region, setRegion] = useState('Western Suburbs Region');
  const [pincode, setPincode] = useState('400050');
  const [otp, setOtp] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && area && city) {
      setStep(2);
    }
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    const userSession = {
      name,
      phone,
      city,
      area,
      region,
      pincode,
      address: `${area}, ${city} - ${pincode}`,
      isAuthenticated: true,
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem('sahakar_user_session', JSON.stringify(userSession));

    setTimeout(() => {
      router.push('/workers');
    }, 1200);
  };

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.back()} className="text-xs font-bold text-[#1B5E4B] flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <LanguageSwitcher />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-extrabold text-[#1B5E4B]">Customer Registration</h1>
          <span className="text-xs font-bold bg-[#1B5E4B]/10 text-[#1B5E4B] px-2.5 py-1 rounded-full">
            Step {step} of 2
          </span>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h2 className="text-lg font-extrabold text-[#1B5E4B]">Registration Verified!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Location set to <strong>{area}, {city}</strong>. Loading nearby verified cooperative workers...
            </p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full text-xs pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full text-xs pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                  required
                />
              </div>
            </div>

            {/* Location Region Section */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-extrabold text-[#1B5E4B] flex items-center mb-2">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#C67B4C]" /> Select Your Region & Area (For Worker Match)
              </span>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="text-[11px] text-gray-600 font-semibold block mb-0.5">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E4B]"
                  >
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Thane</option>
                    <option>Nashik</option>
                    <option>Nagpur</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 font-semibold block mb-0.5">Region Zone</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E4B]"
                  >
                    <option>Western Suburbs Region</option>
                    <option>Central Suburbs Region</option>
                    <option>South Mumbai Region</option>
                    <option>Navi Mumbai Region</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-600 font-semibold block mb-0.5">Area / Neighborhood</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Bandra West"
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E4B]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 font-semibold block mb-0.5">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400050"
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E4B]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer text-xs mt-4"
            >
              <span>Get Security OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleCompleteRegistration} className="space-y-4">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              <span>OTP code sent to +91 {phone} for security verification.</span>
              <span className="block text-[11px] font-mono mt-0.5 text-emerald-600">Demo Security OTP: 123456</span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Enter Security OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B] font-mono tracking-widest text-center text-base"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer text-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Show Local Workers</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
