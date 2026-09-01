'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PriceBreakdownChip } from '../../../components/PriceBreakdownChip';
import { ArrowLeft, MapPin, Calendar, Check } from 'lucide-react';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const listingId = params.listingId as string;

  const [address, setAddress] = useState('Bandra West, Mumbai');
  const [slot, setSlot] = useState('Today, 4:00 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock service details for immediate demo testing
  const listing = {
    id: listingId,
    name: 'Fan Installation & Repair',
    base_price: 350.0,
    estimated_duration_minutes: 45,
    category_name: 'Electrical Services',
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      // In demo mode, trigger booking creation API or mock response
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiBase}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listing_id: listing.id,
          scheduled_slot_start: new Date().toISOString(),
          service_location: { latitude: 19.0760, longitude: 72.8777 },
          service_address_text: address,
        }),
      });

      let bookingId = 'demo-booking-101';
      if (res.ok) {
        const data = await res.json();
        bookingId = data.id;
      }

      router.push(`/track/${bookingId}`);
    } catch (err) {
      console.warn('Backend unavailable, navigating to track view with demo booking:', err);
      router.push(`/track/demo-booking-101`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col justify-between">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-semibold text-[#1B5E4B] mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
        </button>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <span className="text-xs font-bold text-[#C67B4C] uppercase tracking-wider">
            {listing.category_name}
          </span>
          <h1 className="text-xl font-bold text-[#1B5E4B] mt-1">{listing.name}</h1>
          <p className="text-xs text-gray-500 mt-1">Est. Duration: {listing.estimated_duration_minutes} mins</p>
        </div>

        {/* Expandable Price Breakdown Chip (design.md §4) */}
        <PriceBreakdownChip basePrice={listing.base_price} />

        {/* Address Input */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#1B5E4B] mr-1" /> Service Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E4B]"
          />
        </div>

        {/* Time Slot Input */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#1B5E4B] mr-1" /> Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Today, 4:00 PM', 'Today, 6:00 PM', 'Tomorrow, 10:00 AM'].map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`text-xs p-2.5 rounded-lg border font-medium transition ${
                  slot === s
                    ? 'border-[#1B5E4B] bg-[#1B5E4B] text-white shadow-xs'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleConfirmBooking}
          disabled={isSubmitting}
          className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>{isSubmitting ? 'Dispatching Fair-Match...' : 'Confirm Booking — Fair Pay Guaranteed'}</span>
        </button>
      </div>
    </div>
  );
}
