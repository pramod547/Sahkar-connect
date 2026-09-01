'use client';

import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { PriceBreakdown } from '@sahakar/shared-types';

interface PriceBreakdownChipProps {
  basePrice: number;
}

export function PriceBreakdownChip({ basePrice }: PriceBreakdownChipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const workerPayout = (basePrice * 0.88).toFixed(2);
  const techOpsFee = (basePrice * 0.05).toFixed(2);
  const welfareContrib = (basePrice * 0.04).toFixed(2);
  const federationFee = (basePrice * 0.03).toFixed(2);

  return (
    <div className="bg-[#F5ECD7]/50 border border-[#1B5E4B]/20 rounded-xl p-3.5 text-sm my-3 transition-all shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#1B5E4B]" />
          <span className="font-semibold text-[#1B5E4B]">Transparent Cooperative Pricing</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#1B5E4B]">₹{basePrice.toFixed(2)}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Multi-segment visual split bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex mt-2.5">
        <div style={{ width: '88%' }} className="bg-[#1B5E4B]" title="Worker Payout 88%" />
        <div style={{ width: '5%' }} className="bg-[#7BA68D]" title="Tech Ops 5%" />
        <div style={{ width: '4%' }} className="bg-[#C67B4C]" title="Welfare Pool 4%" />
        <div style={{ width: '3%' }} className="bg-[#D4A843]" title="Federation Fee 3%" />
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-[#1B5E4B]/10 text-xs space-y-2">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
            <span className="font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#1B5E4B] mr-2"></span>
              Worker Payout (88%)
            </span>
            <span className="font-bold text-[#1B5E4B]">₹{workerPayout}</span>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#7BA68D] mr-2"></span>
              Tech & Infra Fee (5%)
            </span>
            <span className="font-semibold text-gray-800">₹{techOpsFee}</span>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#C67B4C] mr-2"></span>
              Society Welfare Fund (4%)
            </span>
            <span className="font-semibold text-[#C67B4C]">₹{welfareContrib}</span>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#D4A843] mr-2"></span>
              Federation Training Fee (3%)
            </span>
            <span className="font-semibold text-gray-800">₹{federationFee}</span>
          </div>

          <p className="text-[11px] text-gray-500 italic mt-2 pt-1 border-t border-dashed border-gray-200">
            🌱 12% total platform take vs typical 25–35% private gig platform fees.
          </p>
        </div>
      )}
    </div>
  );
}
