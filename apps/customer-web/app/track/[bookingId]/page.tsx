'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StatusTimeline } from '../../../components/StatusTimeline';
import { Phone, ShieldCheck, ArrowLeft, Star, MapPin } from 'lucide-react';

export default function TrackBookingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [status, setStatus] = useState<'pending_match' | 'offered' | 'assigned' | 'in_progress' | 'completed'>('assigned');
  const [worker, setWorker] = useState({
    name: 'Rajesh Shinde',
    phone: '+91 92000 00001',
    societyName: 'Mumbai District Electricians Coop Society',
    memberSince: '2022',
    rating: 4.85,
    completedJobs: 24,
  });

  return (
    <div className="p-4 min-h-screen flex flex-col justify-between">
      <div>
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-sm font-semibold text-[#1B5E4B] mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Booking #{bookingId.slice(0, 8)}</span>
            <span className="bg-[#1B5E4B]/10 text-[#1B5E4B] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
              {status.replace('_', ' ')}
            </span>
          </div>

          <h1 className="text-lg font-bold text-[#1B5E4B]">Fan Installation & Repair</h1>
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#1B5E4B]" /> Bandra West, Mumbai
          </p>
        </div>

        {/* StatusTimeline Stepper (design.md §4) */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <h2 className="text-xs font-bold text-gray-500 uppercase mb-3">Live Service Status</h2>
          <StatusTimeline currentStatus={status} />
        </div>

        {/* Worker Trust Badge & Assigned Worker Card (design.md §4) */}
        {worker && (
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#1B5E4B]" />
                  <span className="text-xs font-bold text-[#1B5E4B]">Society Verified Worker</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{worker.name}</h3>
                <p className="text-xs text-gray-600">{worker.societyName}</p>
                <div className="flex items-center space-x-3 mt-2 text-xs text-gray-600">
                  <span className="flex items-center text-[#D4A843] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#D4A843] mr-1" /> {worker.rating}
                  </span>
                  <span>•</span>
                  <span>{worker.completedJobs} Jobs Completed</span>
                  <span>•</span>
                  <span className="text-[#1B5E4B] font-medium">Member since {worker.memberSince}</span>
                </div>
              </div>

              <a
                href={`tel:${worker.phone}`}
                className="bg-[#1B5E4B] text-white p-3 rounded-full shadow hover:bg-[#7BA68D] transition"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setStatus(status === 'completed' ? 'assigned' : 'completed')}
          className="w-full text-xs font-bold text-[#1B5E4B] underline text-center block"
        >
          {status === 'completed' ? 'Simulate In Progress' : 'Simulate Complete Job'}
        </button>

        {status === 'completed' && (
          <a
            href={`/feedback/${bookingId}`}
            className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-xs"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Rate & Review Worker</span>
          </a>
        )}

        <div className="bg-[#F5ECD7]/80 p-3 rounded-xl border border-[#C67B4C]/30 text-center">
          <p className="text-xs text-gray-700">
            Fairly dispatched by <strong className="text-[#1B5E4B]">SahakarConnect Fair-Match Engine</strong> based on rotation fairness & proximity.
          </p>
        </div>
      </div>
    </div>
  );
}
