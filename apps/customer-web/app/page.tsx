'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

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
      {/* Sticky Header */}
      <header className="flex items-center justify-between mb-4 pt-1">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] text-white flex items-center justify-center font-extrabold text-base shadow-md">
            S
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#1B5E4B] leading-tight flex items-center">
              {t('appTitle')}
            </h1>
            <div className="flex items-center text-[10px] text-gray-500 font-medium">
              <MapPin className="w-3 h-3 text-[#C67B4C] mr-0.5" />
              <span>Bandra West, Mumbai</span>
            </div>
          </div>
        </div>

        <LanguageSwitcher />
      </header>

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
