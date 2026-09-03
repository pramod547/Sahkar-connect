'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ShieldCheck,
  Building2,
  Heart,
  AlertTriangle,
  Search,
  Server,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Info,
  ExternalLink,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

export default function MasterPortalPage() {
  // Security State
  const [userRole, setUserRole] = useState<'public' | 'worker' | 'society_admin' | 'federation_admin'>('public');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (passcode === '8888') {
      setUserRole('society_admin');
      setIsAuthenticated(true);
    } else if (passcode === '9999') {
      setUserRole('federation_admin');
      setIsAuthenticated(true);
    } else if (passcode === '1234') {
      setUserRole('worker');
      setIsAuthenticated(true);
    } else {
      setAuthError('Invalid Security Passcode. Try 8888 (Society Admin), 9999 (Federation Admin), or 1234 (Worker).');
    }
  };

  const customerRoutes = [
    { title: 'Browse Services', href: '/', desc: 'Service categories & cooperative trust badge', icon: ShoppingBag, public: true },
    { title: 'Booking Flow & Price Split', href: '/booking/demo-listing-1', desc: 'Slot selection & 88/5/4/3 price breakdown chip', icon: Info, public: true },
    { title: 'Live Job Tracking', href: '/track/demo-booking-101', desc: 'Realtime StatusTimeline stepper (booked → done)', icon: CheckCircle2, public: true },
  ];

  const adminRoutes = [
    { title: 'Governance Overview', href: 'http://localhost:3001/', desc: 'Society metrics & active job stats', icon: Building2, requiredRole: 'society_admin' },
    { title: 'Worker Onboarding Queue', href: 'http://localhost:3001/workers', desc: 'Society admin KYC & certification verification', icon: ShieldCheck, requiredRole: 'society_admin' },
    { title: 'Live Jobs & Fair-Match Explainability', href: 'http://localhost:3001/jobs', desc: 'Audit proximity, fairness, rating & skill breakdown', icon: Sparkles, requiredRole: 'society_admin' },
    { title: 'Society Welfare Fund', href: 'http://localhost:3001/welfare-fund', desc: '4% pool balance & member claim approvals', icon: Heart, requiredRole: 'society_admin' },
    { title: 'Dispute Queue (48h SLA)', href: 'http://localhost:3001/disputes', desc: 'Auto-escalation to state federation on breach', icon: AlertTriangle, requiredRole: 'society_admin' },
    { title: 'Federation State Overview', href: 'http://localhost:3001/federation', desc: 'Aggregate oversight across member societies', icon: Building2, requiredRole: 'federation_admin' },
    { title: 'e-Shram & DigiLocker Lookup', href: 'http://localhost:3001/kyc', desc: 'Honest mock UAN & Aadhaar credential check', icon: Search, requiredRole: 'society_admin' },
  ];

  const backendRoutes = [
    { title: 'API Health Endpoint', href: 'http://localhost:4000/health', desc: 'Fastify server status & timestamp' },
    { title: 'Service Categories API', href: 'http://localhost:4000/api/v1/services/categories', desc: 'JSON endpoint for service catalog' },
  ];

  return (
    <div className="min-h-screen bg-[#FEFAF3] text-[#2B2B2B] p-6 max-w-5xl mx-auto font-sans">
      {/* Top Header */}
      <header className="mb-8 pb-4 border-b border-[#1B5E4B]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#C67B4C] text-white text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              SIH 2026 • PS 26089
            </span>
            <h1 className="text-2xl font-extrabold text-[#1B5E4B]">SahakarConnect Secure Portal</h1>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Role-Guarded Access Portal connecting Customer, Worker, Admin, and Federation Portals
          </p>
        </div>

        {/* Security Badge & Lock Controller */}
        <div className="flex items-center space-x-3 bg-white p-2.5 px-4 rounded-xl border border-gray-200 shadow-sm">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2 text-xs">
              <Unlock className="w-4 h-4 text-[#1B5E4B]" />
              <span className="font-bold text-[#1B5E4B] uppercase">
                {userRole.replace('_', ' ')} UNLOCKED
              </span>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setUserRole('public');
                  setPasscode('');
                }}
                className="ml-2 text-[10px] text-red-600 underline font-bold"
              >
                Lock Portal
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-amber-700 font-semibold">
              <Lock className="w-4 h-4 text-[#C67B4C]" />
              <span>Admin Portals Protected</span>
            </div>
          )}
        </div>
      </header>

      {/* Role Passcode Authentication Lock Banner */}
      {!isAuthenticated && (
        <section className="mb-8 bg-white p-6 rounded-2xl border-2 border-[#1B5E4B]/30 shadow-md">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5ECD7] flex items-center justify-center text-[#1B5E4B] shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-[#1B5E4B]">Private Governance Access Control</h2>
              <p className="text-xs text-gray-600 mt-0.5 mb-4">
                Enter your administrative passcode to unlock private cooperative governance, worker onboarding, and federation controls.
              </p>

              <form onSubmit={handleAuthenticate} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Security Passcode (e.g. 8888)"
                  className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#1B5E4B] hover:bg-[#7BA68D] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition cursor-pointer"
                >
                  Unlock Access
                </button>
              </form>

              {authError && (
                <div className="mt-3 flex items-center space-x-1.5 text-xs text-red-600 font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-4 text-[11px] text-gray-500">
                <span>🔑 <strong>Society Admin:</strong> 8888</span>
                <span>🔑 <strong>Federation Admin:</strong> 9999</span>
                <span>🔑 <strong>Service Provider App:</strong> 1234</span>
                <span>🌐 <strong>Customer Web:</strong> Public</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Public Customer Apps Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#1B5E4B] flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-[#C67B4C]" /> Customer Web Portal (Port 3000)
          </h2>
          <span className="text-xs font-bold text-[#1B5E4B] bg-[#1B5E4B]/10 px-2.5 py-1 rounded-full uppercase">
            Public Access
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customerRoutes.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.title}
                href={r.href}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1B5E4B] shadow-sm hover:shadow-md transition block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5ECD7] flex items-center justify-center text-[#1B5E4B]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1B5E4B]" />
                </div>
                <h3 className="font-bold text-sm text-[#1B5E4B] group-hover:underline">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{r.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Protected Cooperative Admin & Governance Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#1B5E4B] flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-[#C67B4C]" /> Cooperative Governance Admin Portal (Port 3001)
          </h2>
          <span className="text-xs font-bold text-[#C67B4C] bg-[#C67B4C]/10 px-2.5 py-1 rounded-full uppercase flex items-center">
            {isAuthenticated ? <Unlock className="w-3 h-3 mr-1 text-[#1B5E4B]" /> : <Lock className="w-3 h-3 mr-1 text-[#C67B4C]" />}
            {isAuthenticated ? 'Unlocked' : 'Passcode Protected'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminRoutes.map((r) => {
            const Icon = r.icon;
            const isAccessible = isAuthenticated;

            return isAccessible ? (
              <a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-4.5 rounded-xl border border-gray-200 hover:border-[#1B5E4B] shadow-sm hover:shadow-md transition block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5ECD7] flex items-center justify-center text-[#1B5E4B]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1B5E4B]" />
                </div>
                <h3 className="font-bold text-sm text-[#1B5E4B] group-hover:underline">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{r.desc}</p>
              </a>
            ) : (
              <div
                key={r.title}
                className="bg-white/60 p-4.5 rounded-xl border border-gray-200 opacity-75 shadow-xs relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Lock className="w-4 h-4 text-[#C67B4C]" />
                </div>
                <h3 className="font-bold text-sm text-gray-700">{r.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-snug">{r.desc}</p>
                <span className="text-[10px] text-[#C67B4C] font-semibold block mt-2">
                  🔒 Requires Passcode to Unlock
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mobile Worker App & Backend APIs Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-base font-bold text-[#1B5E4B] mb-2 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-[#C67B4C]" /> Service Provider Mobile App (Expo)
          </h2>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Offline-tolerant React Native app featuring Fair-Match Job Offers, 45s timer, Status Stepper, and Hindi/Marathi Voice Assistant.
          </p>
          <div className="bg-[#F5ECD7] border border-[#1B5E4B]/20 text-[#1B5E4B] text-xs font-mono font-bold p-2.5 rounded-xl text-center">
            pnpm --filter worker-app start
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-base font-bold text-[#1B5E4B] mb-2 flex items-center">
            <Server className="w-5 h-5 mr-2 text-[#C67B4C]" /> Backend & Realtime Gateway (Port 4000)
          </h2>
          <div className="space-y-2.5">
            {backendRoutes.map((b) => (
              <a
                key={b.title}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-xs p-2.5 bg-[#FEFAF3] rounded-xl border border-gray-100 hover:border-[#1B5E4B] transition"
              >
                <div>
                  <span className="font-bold text-[#1B5E4B]">{b.title}</span>
                  <span className="text-gray-500 block">{b.desc}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
