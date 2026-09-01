'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Star, ShieldCheck, CheckCircle2, ArrowLeft, Heart } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';
import { useLanguage } from '../../../lib/LanguageContext';

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.bookingId as string;
  const { t } = useLanguage();

  const [rating, setRating] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [workQuality, setWorkQuality] = useState(5);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      router.push('/user/profile');
    }, 2000);
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
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h2 className="text-lg font-extrabold text-[#1B5E4B]">{t('feedbackSubmitted')}</h2>
            <p className="text-xs text-gray-500 mt-1">Your review directly improves the worker's cooperative Fair-Match score.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-extrabold text-[#C67B4C] bg-amber-50 px-2.5 py-0.5 rounded-full uppercase">
                Worker Review • Booking #{bookingId}
              </span>
              <h1 className="text-lg font-extrabold text-[#1B5E4B] mt-1.5">{t('giveFeedback')}</h1>
              <p className="text-xs text-gray-500">Rate your service provided by Ramesh Kumar Patil (SKC-GOVT-401)</p>
            </div>

            {/* Overall Rating Stars */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">Overall Satisfaction</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 transition transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Punctuality Rating */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Punctuality & Arrival Time</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPunctuality(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      s <= punctuality
                        ? 'bg-[#1B5E4B] text-white border-[#1B5E4B]'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {s} ★
                  </button>
                ))}
              </div>
            </div>

            {/* Work Quality Rating */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Quality of Service & Cleanliness</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setWorkQuality(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      s <= workQuality
                        ? 'bg-[#1B5E4B] text-white border-[#1B5E4B]'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {s} ★
                  </button>
                ))}
              </div>
            </div>

            {/* Written Feedback Textarea */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Written Review & Feedback</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your experience working with this cooperative member..."
                className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-300" />
              <span>{t('submitFeedback')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
