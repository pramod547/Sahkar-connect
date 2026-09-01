'use client';

import React from 'react';
import { Star, ShieldCheck, Award, Building2, UserCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export interface Worker {
  id: string;
  workerCode: string;
  name: string;
  age: number;
  rating: number;
  hourlyRate: number;
  category: string;
  experienceYears: number;
  workerType: 'government' | 'non-government' | 'private';
  companyName?: string;
  photoUrl?: string;
  isVerified: boolean;
  completedJobs: number;
  area: string;
  city: string;
}

export const WorkerCard: React.FC<{ worker: Worker; onBook?: (worker: Worker) => void }> = ({
  worker,
  onBook,
}) => {
  const { t } = useLanguage();

  const getWorkerBadge = () => {
    switch (worker.workerType) {
      case 'government':
        return {
          label: t('govtVerified'),
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: ShieldCheck,
        };
      case 'private':
        return {
          label: worker.companyName || t('privateComp'),
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: Building2,
        };
      case 'non-government':
      default:
        return {
          label: t('nonGovt'),
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: UserCheck,
        };
    }
  };

  const badge = getWorkerBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B5E4B] via-[#7BA68D] to-[#C67B4C]" />

      <div>
        {/* Header with Avatar + Badges */}
        <div className="flex items-start justify-between mb-3 pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] text-white font-extrabold text-base flex items-center justify-center shadow-md shrink-0 border-2 border-white">
              {worker.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-sm text-[#2B2B2B] leading-tight">{worker.name}</h3>
                {worker.isVerified && <ShieldCheck className="w-4 h-4 text-[#1B5E4B] shrink-0" />}
              </div>
              <span className="text-[11px] text-gray-500 font-mono">
                ID: {worker.workerCode} • Age: {worker.age}
              </span>
            </div>
          </div>
        </div>

        {/* Worker Type & Location Badge */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
          >
            <BadgeIcon className="w-3 h-3" />
            <span>{badge.label}</span>
          </span>

          <span className="text-[10px] text-gray-500 font-medium flex items-center bg-gray-100 px-2 py-0.5 rounded-md">
            📍 {worker.area}, {worker.city}
          </span>
        </div>

        {/* Rating & Experience */}
        <div className="grid grid-cols-2 gap-2 bg-[#FEFAF3] p-2.5 rounded-xl border border-gray-100 mb-3 text-xs">
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[#2B2B2B]">{worker.rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400">({worker.completedJobs})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 font-medium text-[11px]">
            <Award className="w-3.5 h-3.5 text-[#C67B4C]" />
            <span>{worker.experienceYears} yrs exp</span>
          </div>
        </div>
      </div>

      {/* Pricing & Booking Button */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-1">
        <div>
          <span className="text-xs text-gray-400 block text-[10px]">Rate</span>
          <span className="text-base font-extrabold text-[#1B5E4B]">
            ₹{worker.hourlyRate}
            <span className="text-xs font-normal text-gray-500">{t('perHour')}</span>
          </span>
        </div>

        {onBook && (
          <button
            onClick={() => onBook(worker)}
            className="bg-[#1B5E4B] hover:bg-[#7BA68D] text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {t('bookNow')}
          </button>
        )}
      </div>
    </div>
  );
};
