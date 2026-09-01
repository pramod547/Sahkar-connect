'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Smartphone,
  Key,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  ShieldAlert,
  Server,
  Activity,
  Globe,
} from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function PrivacySettingsPage() {
  const router = useRouter();
  const [userSession, setUserSession] = useState<any>(null);

  // Privacy Settings Toggles
  const [strictLocation, setStrictLocation] = useState(true);
  const [anonymousProfile, setAnonymousProfile] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [dataMinimization, setDataMinimization] = useState(true);
  const [sessionRevoked, setSessionRevoked] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('sahakar_user_session');
    if (session) {
      setUserSession(JSON.parse(session));
    }
  }, []);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleRevokeOtherSessions = () => {
    setSessionRevoked(true);
    setTimeout(() => setSessionRevoked(false), 2500);
  };

  return (
    <div className="p-4 bg-[#FEFAF3] min-h-screen">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.back()} className="text-xs font-bold text-[#1B5E4B] flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <LanguageSwitcher />
      </div>

      <div className="space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1B5E4B] to-[#7BA68D] p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center space-x-1 bg-[#C67B4C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="text-lg font-extrabold">High Privacy & Security Controls</h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-[290px]">
            Your personal data is encrypted. Control location sharing, identity masking, and active sessions.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Privacy & Security Preferences Updated Successfully!</span>
          </div>
        )}

        {/* Section 1: Data Privacy & Identity Masking */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-[#1B5E4B] flex items-center">
            <EyeOff className="w-4 h-4 text-[#C67B4C] mr-2" /> Data Privacy & Identity Protection
          </h2>

          <div className="space-y-3 pt-1">
            {/* Strict Location Privacy */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#2B2B2B] block">Coarse Location Privacy</span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Share general pincode zone only (hide precise GPS coordinate)
                </span>
              </div>
              <button
                onClick={() => setStrictLocation(!strictLocation)}
                className={`w-11 h-6 rounded-full transition relative p-0.5 cursor-pointer ${
                  strictLocation ? 'bg-[#1B5E4B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    strictLocation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Anonymous Profile */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#2B2B2B] block">Contact Number Masking</span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Mask phone number (+91 91234****89) until booking confirmation
                </span>
              </div>
              <button
                onClick={() => setAnonymousProfile(!anonymousProfile)}
                className={`w-11 h-6 rounded-full transition relative p-0.5 cursor-pointer ${
                  anonymousProfile ? 'bg-[#1B5E4B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    anonymousProfile ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Data Minimization */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#2B2B2B] block">Automatic Data Purge (30 Days)</span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Auto-delete completed job tracking history after 30 days
                </span>
              </div>
              <button
                onClick={() => setDataMinimization(!dataMinimization)}
                className={`w-11 h-6 rounded-full transition relative p-0.5 cursor-pointer ${
                  dataMinimization ? 'bg-[#1B5E4B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    dataMinimization ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: High Security & Session Inspector */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-extrabold text-[#1B5E4B] flex items-center">
            <Lock className="w-4 h-4 text-[#C67B4C] mr-2" /> Security Authentication Settings
          </h2>

          <div className="space-y-3 pt-1">
            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#2B2B2B] block">Two-Factor Security OTP</span>
                <span className="text-[10px] text-gray-500 block leading-tight">
                  Require 2FA OTP verification on every login session
                </span>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-11 h-6 rounded-full transition relative p-0.5 cursor-pointer ${
                  twoFactorAuth ? 'bg-[#1B5E4B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Active Session Card */}
            <div className="pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-700 block mb-2">Active Login Session</span>
              <div className="bg-[#FEFAF3] p-3 rounded-xl border border-gray-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-[#1B5E4B] font-bold">
                  <span className="flex items-center">
                    <Activity className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Current Web Browser
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="text-[11px] text-gray-600 font-mono">
                  IP: 127.0.0.1 • Session Token: RS256-JWT-Encrypted
                </div>
              </div>

              {sessionRevoked ? (
                <div className="mt-2 text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg text-center">
                  ✓ All other sessions terminated!
                </div>
              ) : (
                <button
                  onClick={handleRevokeOtherSessions}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                >
                  Log out all other devices & sessions
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition text-xs cursor-pointer"
        >
          Save Privacy & Security Settings
        </button>
      </div>
    </div>
  );
}
