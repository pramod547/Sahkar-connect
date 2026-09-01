'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorkerCard, Worker } from '../../components/WorkerCard';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useLanguage } from '../../lib/LanguageContext';
import { Search, Filter, ShieldCheck, Building2, UserCheck } from 'lucide-react';

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
  },
  {
    id: 'w-103',
    workerCode: 'SKC-[#1B5E4B]-209',
    name: 'Ganesh Deshmukh',
    age: 45,
    rating: 4.7,
    hourlyRate: 300,
    category: 'Plumbing Service',
    experienceYears: 15,
    workerType: 'non-government',
    isVerified: true,
    completedJobs: 210,
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
  },
];

export default function WorkersPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'government' | 'non-government' | 'private'>('all');

  const filteredWorkers = MOCK_WORKERS.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase()) ||
      w.workerCode.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === 'all' || w.workerType === selectedType;

    return matchesSearch && matchesType;
  });

  const handleBook = (worker: Worker) => {
    router.push(`/booking/demo-listing-1?workerId=${worker.id}`);
  };

  return (
    <div className="p-4 min-h-screen bg-[#FEFAF3]">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#1B5E4B]">{t('topWorkers')}</h1>
          <p className="text-xs text-gray-500">Government, Independent & Private Partners</p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by worker name, ID, or skill..."
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-xs focus:outline-none focus:border-[#1B5E4B]"
        />
      </div>

      {/* Filter Chips for Worker Types */}
      <div className="flex items-center space-x-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Workers', icon: Filter },
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
            <p className="text-sm font-bold text-gray-600">No workers found matching your filter</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting search query or selecting 'All Workers'</p>
          </div>
        )}
      </div>
    </div>
  );
}
