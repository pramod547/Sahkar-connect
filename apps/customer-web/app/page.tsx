'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { WorkerCard, Worker } from '../components/WorkerCard';
import {
  Zap,
  Sparkles,
  Droplets,
  HeartHandshake,
  Paintbrush,
  Hammer,
  Search,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Phone,
  Lock,
  User,
  HardHat,
  LogOut,
  CheckCircle2,
  Building2,
  UserCheck,
} from 'lucide-react';

const TOP_WORKERS: Worker[] = [
  {
    id: 'w-101',
    workerCode: 'SKC-GOVT-401',
    name: 'Ramesh Kumar Patil',
    age: 38,
    rating: 4.9,
    hourlyRate: 350,
    category: 'Electrical Services',
    experienceYears: 12,
    workerType: 'government',
    isVerified: true,
    completedJobs: 142,
    area: 'Bandra West',
    city: 'Mumbai',
  },
  {
    id: 'w-102',
    workerCode: 'SKC-PRIV-802',
    name: 'Sunita Sharma',
    age: 32,
    rating: 4.8,
    hourlyRate: 400,
    category: 'Deep Cleaning',
    experienceYears: 7,
    workerType: 'private',
    companyName: 'Apex Facility Solutions',
    isVerified: true,
    completedJobs: 98,
    area: 'Bandra West',
    city: 'Mumbai',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  
  // Authentication State
  const [userSession, setUserSession] = useState<any>(null);
  const [workerSession, setWorkerSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auth Gate Form State (When not logged in)
  const [authRole, setAuthRole] = useState<'customer' | 'worker'>('customer');
  const [authStep, setAuthStep] = useState<'details' | 'otp'>('details');
  
  // Customer Login Fields
  const [name, setName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('9123456789');
  const [city, setCity] = useState('Mumbai');
  const [area, setArea] = useState('Bandra West');
  const [pincode, setPincode] = useState('400050');
  
  // Worker Login Fields
  const [workerPhone, setWorkerPhone] = useState('9876543210');
  const [workerCode, setWorkerCode] = useState('SKC-GOVT-401');

  // OTP State
  const [otp, setOtp] = useState('123456');

  useEffect(() => {
    // Check if customer or worker session exists in localStorage
    const storedUser = localStorage.getItem('sahakar_user_session');
    const storedWorker = localStorage.getItem('sahakar_worker_session');

    if (storedWorker) {
      setWorkerSession(JSON.parse(storedWorker));
    } else if (storedUser) {
      setUserSession(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authRole === 'customer') {
      const session = {
        name,
        phone,
        city,
        area,
        pincode,
        address: `${area}, ${city} - ${pincode}`,
        isAuthenticated: true,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('sahakar_user_session', JSON.stringify(session));
      setUserSession(session);
    } else {
      const session = {
        name: 'Ramesh Kumar Patil',
        phone: workerPhone,
        workerCode,
        workerType: 'government',
        isAuthenticated: true,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('sahakar_worker_session', JSON.stringify(session));
      setWorkerSession(session);
      router.push('/worker-portal/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sahakar_user_session');
    localStorage.removeItem('sahakar_worker_session');
    setUserSession(null);
    setWorkerSession(null);
    setAuthStep('details');
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-[#FEFAF3] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#1B5E4B] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs font-bold text-[#1B5E4B]">Loading SahakarConnect...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // MANDATORY AUTHENTICATION WALL (IF NOT LOGGED IN)
  // ==========================================
  if (!userSession && !workerSession) {
    return (
      <div className="p-4 bg-[#FEFAF3] min-h-screen flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-[#1B5E4B] text-white flex items-center justify-center font-extrabold text-base shadow-md">
                S
              </div>
              <div>
                <h1 className="text-base font-extrabold text-[#1B5E4B] leading-tight">SahakarConnect</h1>
                <span className="text-[10px] text-gray-500 font-medium">Cooperative Services App</span>
              </div>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Blinkit-style Auth Gate Banner */}
          <div className="bg-gradient-to-r from-[#1B5E4B] to-[#7BA68D] p-5 rounded-2xl text-white mb-5 shadow-lg">
            <div className="inline-flex items-center space-x-1 bg-[#C67B4C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Authentication Required</span>
            </div>
            <h2 className="text-lg font-extrabold leading-snug">
              Log in or Register to Access Cooperative Services
            </h2>
            <p className="text-xs text-emerald-100 mt-1">
              Enter your mobile number & location area to view verified local workers.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex rounded-xl bg-gray-200 p-1 mb-5">
            <button
              onClick={() => { setAuthRole('customer'); setAuthStep('details'); }}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                authRole === 'customer' ? 'bg-[#1B5E4B] text-white shadow-md' : 'text-gray-700 hover:text-[#1B5E4B]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Customer Login</span>
            </button>
            <button
              onClick={() => { setAuthRole('worker'); setAuthStep('details'); }}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                authRole === 'worker' ? 'bg-[#1B5E4B] text-white shadow-md' : 'text-gray-700 hover:text-[#1B5E4B]'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Worker Login</span>
            </button>
          </div>

          {/* Authentication Form Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md">
            {authStep === 'details' ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <h3 className="text-sm font-extrabold text-[#1B5E4B] mb-1">
                  {authRole === 'customer' ? 'Customer Phone & Region Entry' : 'Worker Login Entry'}
                </h3>

                {authRole === 'customer' ? (
                  <>
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9123456789"
                          className="w-full text-xs pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-0.5">City</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full text-xs p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                        >
                          <option>Mumbai</option>
                          <option>Pune</option>
                          <option>Thane</option>
                          <option>Nashik</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Area / Neighborhood</label>
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="Bandra West"
                          className="w-full text-xs p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Worker Registered Mobile</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          value={workerPhone}
                          onChange={(e) => setWorkerPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full text-xs pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Worker Code / ID</label>
                      <input
                        type="text"
                        value={workerCode}
                        onChange={(e) => setWorkerCode(e.target.value)}
                        placeholder="SKC-GOVT-401"
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-xs cursor-pointer mt-2"
                >
                  <span>Send Security OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Security OTP sent to +91 {authRole === 'customer' ? phone : workerPhone} (Demo: 123456)</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Enter 6-Digit Security OTP</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B] font-mono tracking-widest text-center"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-xs cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP & Unlock Application</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthStep('details')}
                  className="w-full text-xs text-gray-500 hover:text-[#1B5E4B] underline text-center block mt-1"
                >
                  Edit details
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center text-[10px] text-gray-400 py-4">
          SahakarConnect Protection • Strict OTP Authentication Enabled
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED-IN CUSTOMER / WORKER APPLICATION INTERFACE
  // ==========================================
  const categories = [
    { id: 'electrical', name: 'Electrical', icon: Zap, price: '₹350/hr', listingId: 'demo-listing-1', color: 'bg-[#F5ECD7] text-[#1B5E4B]' },
    { id: 'cleaning', name: 'Cleaning', icon: Sparkles, price: '₹400/hr', listingId: 'demo-listing-2', color: 'bg-emerald-50 text-emerald-800' },
    { id: 'plumbing', name: 'Plumbing', icon: Droplets, price: '₹300/hr', listingId: 'demo-listing-3', color: 'bg-sky-50 text-sky-800' },
    { id: 'caregiving', name: 'Elder Care', icon: HeartHandshake, price: '₹450/hr', listingId: 'demo-listing-4', color: 'bg-amber-50 text-amber-800' },
    { id: 'painting', name: 'Painting', icon: Paintbrush, price: '₹500/hr', listingId: 'demo-listing-1', color: 'bg-purple-50 text-purple-800' },
    { id: 'carpentry', name: 'Carpentry', icon: Hammer, price: '₹380/hr', listingId: 'demo-listing-3', color: 'bg-orange-50 text-orange-800' },
  ];

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen">
      {/* Sticky Header with Logged-in User Badge */}
      <header className="flex items-center justify-between mb-4 pt-1">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] text-white flex items-center justify-center font-extrabold text-base shadow-md">
            S
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#1B5E4B] leading-tight flex items-center">
              {t('appTitle')}
            </h1>
            <div className="flex items-center text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3 text-[#C67B4C] mr-0.5" />
              <span>{userSession?.area || 'Bandra West'}, {userSession?.city || 'Mumbai'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 bg-white border border-gray-200 rounded-full hover:bg-red-50 text-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Authenticated User Welcome Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1B5E4B] text-white flex items-center justify-center text-xs font-extrabold">
            {userSession?.name?.[0] || 'A'}
          </div>
          <div>
            <span className="text-xs font-extrabold text-[#1B5E4B] block leading-tight">
              Welcome, {userSession?.name || 'Ananya'}!
            </span>
            <span className="text-[10px] text-gray-500 font-medium">Logged in • Verified Customer</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
          Authenticated
        </span>
      </div>

      {/* Blinkit-Style Search Bar */}
      <div className="relative mb-5">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-xs focus:outline-none focus:border-[#1B5E4B]"
        />
      </div>

      {/* Hero Cooperative Trust Banner */}
      <div className="bg-gradient-to-r from-[#1B5E4B] to-[#7BA68D] p-4 rounded-2xl text-white mb-4 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1 bg-[#C67B4C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>{t('fairPayBadge')}</span>
          </div>
          <h2 className="text-lg font-extrabold leading-snug">
            Book Verified Labour Cooperative Workers
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-[280px]">
            Direct worker payouts, transparent fee structure & government certified skills.
          </p>
        </div>
      </div>

      {/* Browse Categories Grid */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold text-[#1B5E4B]">{t('browseCategories')}</h2>
          <Link href="/workers" className="text-[11px] font-bold text-[#C67B4C] hover:underline flex items-center">
            <span>{t('viewAllWorkers')}</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/workers?category=${cat.id}`}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#1B5E4B] transition flex flex-col items-center text-center group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-2 group-hover:scale-105 transition`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#2B2B2B] group-hover:text-[#1B5E4B] leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">{cat.price}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Cooperative Workers Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-extrabold text-[#1B5E4B]">{t('topWorkers')}</h2>
          <span className="text-[10px] font-bold bg-[#1B5E4B]/10 text-[#1B5E4B] px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>

        <div className="space-y-3">
          {TOP_WORKERS.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onBook={() => window.location.assign(`/booking/demo-listing-1?workerId=${worker.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
