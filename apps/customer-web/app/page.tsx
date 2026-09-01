import React from 'react';
import Link from 'next/link';
import { Shield, Zap, Sparkles, Droplets, HeartHandshake, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const categories = [
    { id: 'electrical', name: 'Electrical Repair', icon: Zap, price: '₹499', listingId: 'demo-listing-1' },
    { id: 'cleaning', name: 'Deep Cleaning', icon: Sparkles, price: '₹799', listingId: 'demo-listing-2' },
    { id: 'plumbing', name: 'Plumbing Service', icon: Droplets, price: '₹599', listingId: 'demo-listing-3' },
    { id: 'caregiving', name: 'Elder Caregiving', icon: HeartHandshake, price: '₹899', listingId: 'demo-listing-4' },
  ];

  return (
    <div className="p-5 pb-20 bg-[#FEFAF3]">
      {/* Hero Header */}
      <header className="mb-6 rounded-2xl bg-gradient-to-br from-[#1B5E4B] to-[#7BA68D] p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#C67B4C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              SIH 2026 • PS 26089
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">SahakarConnect</h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-[240px]">
            Cooperative-Owned On-Demand Household & Community Services
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </header>

      {/* Trust Banner */}
      <div className="bg-[#F5ECD7]/80 p-4 rounded-xl border border-[#C67B4C]/30 mb-6 shadow-sm flex items-start space-x-3">
        <Shield className="w-5 h-5 text-[#1B5E4B] shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#1B5E4B] mb-0.5">
            <span>Worker-Owned • Fair Pay Guaranteed</span>
          </div>
          <p className="text-xs text-gray-700 leading-snug">
            Services provided by verified Labour Cooperative Societies. Transparent 12% total platform fee.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1B5E4B]">Browse Services</h2>
          <span className="text-xs text-[#C67B4C] font-semibold">4 Categories</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/booking/${cat.listingId}`}
                className="p-4 rounded-xl border border-[#1B5E4B]/15 hover:border-[#1B5E4B] transition bg-white shadow-sm hover:shadow-md flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F5ECD7] flex items-center justify-center text-[#1B5E4B] mb-3 group-hover:bg-[#1B5E4B] group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#2B2B2B] group-hover:text-[#1B5E4B] transition">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">From {cat.price}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C67B4C] group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Central Hub Quick Link */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#1B5E4B] block">Explore All Portals</span>
          <span className="text-[11px] text-gray-500">Customer, Worker, Admin & APIs</span>
        </div>
        <Link
          href="/portal"
          className="bg-[#1B5E4B] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#7BA68D] transition"
        >
          Master Hub →
        </Link>
      </div>
    </div>
  );
}
