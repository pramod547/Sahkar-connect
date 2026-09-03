'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WorkerCard, Worker } from '../../components/WorkerCard';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useLanguage } from '../../lib/LanguageContext';
import { Search, Filter, ShieldCheck, Building2, UserCheck, MapPin, UserPlus, Lock } from 'lucide-react';

const MOCK_WORKERS: Worker[] = [
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
  {
    id: 'w-103',
    workerCode: 'SKC-IND-209',
    name: 'Ganesh Deshmukh',
    age: 45,
    rating: 4.7,
    hourlyRate: 300,
    category: 'Plumbing Service',
    experienceYears: 15,
    workerType: 'non-government',
    isVerified: true,
    completedJobs: 210,
    area: 'Dadar',
    city: 'Mumbai',
  },
  {
    id: 'w-104',
    workerCode: 'SKC-GOVT-512',
    name: 'Priya Ananth',
    age: 29,
    rating: 4.9,
    hourlyRate: 450,
    category: 'Elder Caregiving',
    experienceYears: 6,
    workerType: 'government',
    isVerified: true,
    completedJobs: 76,
    area: 'Bandra West',
    city: 'Mumbai',
  },
  {
    id: 'w-105',
    workerCode: 'SKC-PRIV-901',
    name: 'Vikram Singh',
    age: 36,
    rating: 4.6,
    hourlyRate: 380,
    category: 'Electrical Services',
    experienceYears: 9,
    workerType: 'private',
    companyName: 'TechServe Co-op',
    isVerified: true,
    completedJobs: 115,
    area: 'Kothrud',
    city: 'Pune',
  },
];

export default function WorkersPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'government' | 'non-government' | 'private'>('all');
  const [userLocation, setUserLocation] = useState<{ area: string; city: string; isAuthenticated: boolean } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('sahakar_user_session');
    if (session) {
      const parsed = JSON.parse(session);
      setUserLocation({
        area: parsed.area || 'Bandra West',
        city: parsed.city || 'Mumbai',
        isAuthenticated: !!parsed.isAuthenticated,
      });
    }
  }, []);

  const filteredWorkers = MOCK_WORKERS.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase()) ||
      w.workerCode.toLowerCase().includes(search.toLowerCase()) ||
      w.area.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'all' || w.workerType === selectedType;

    return matchesSearch && matchesType;
  });

  const handleBook = (worker: Worker) => {
    // Authentication Check: User must be registered/logged in to complete booking
    if (!userLocation?.isAuthenticated) {
      alert('🔒 Authentication Required: Please register or log in with your Region/Area to complete this booking!');
      router.push('/user/register');
      return;
    }
    router.push(`/booking/demo-listing-1?workerId=${worker.id}`);
  };

  return (
    <div className="p-4 min-h-screen bg-[#FEFAF3]">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-extrabold text-[#1B5E4B]">{t('topWorkers')}</h1>
          <p className="text-xs text-gray-500">Government, Independent & Private Partners</p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Registered Location Matching Bar */}
      {userLocation ? (
        <div className="bg-[#F5ECD7] border border-[#C67B4C]/30 p-2.5 px-3 rounded-xl mb-4 flex items-center justify-between text-xs text-[#1B5E4B] font-bold shadow-xs">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-[#C67B4C] shrink-0" />
            <span>Region Matched: {userLocation.area}, {userLocation.city}</span>
          </div>
          <button
            onClick={() => router.push('/user/register')}
            className="text-[10px] text-[#C67B4C] underline font-extrabold"
          >
            Change Location
          </button>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mb-4 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Register your Region & Area to see verified local service providers!</span>
          </div>
          <button
            onClick={() => router.push('/user/register')}
            className="bg-[#1B5E4B] text-white px-2.5 py-1 rounded-lg font-bold text-[10px] shrink-0 cursor-pointer"
          >
            Register Region
          </button>
        </div>
      )}

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by service provider name, ID, area or skill..."
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-xs focus:outline-none focus:border-[#1B5E4B]"
        />
      </div>

      {/* Filter Chips for Worker Types */}
      <div className="flex items-center space-x-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Service Providers', icon: Filter },
          { id: 'government', label: 'Govt Certified', icon: ShieldCheck },
          { id: 'non-government', label: 'Independent', icon: UserCheck },
          { id: 'private', label: 'Private Partner', icon: Building2 },
        ].map((chip) => {
          const Icon = chip.icon;
          const isActive = selectedType === chip.id;

          return (
            <button
              key={chip.id}
              onClick={() => setSelectedType(chip.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#1B5E4B] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1B5E4B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workers Grid */}
      <div className="space-y-4">
        {filteredWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} onBook={handleBook} />
        ))}

        {filteredWorkers.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm font-bold text-gray-600">No service providers found matching your filter</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting search query or selecting 'All Service Providers'</p>
          </div>
        )}
      </div>
    </div>
  );
}
