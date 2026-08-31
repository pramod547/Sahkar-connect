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
    <div className="bg-[#FBF7EF] border border-[#147D74]/20 rounded-xl p-3 text-sm my-3 transition-all shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#0B4F4A]" />
          <span className="font-semibold text-[#0B4F4A]">Transparent Cooperative Pricing</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#0B4F4A]">₹{basePrice.toFixed(2)}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs space-y-2">
          <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
            <span className="font-medium text-gray-700">Worker Payout (88%)</span>
            <span className="font-bold text-[#2E8B57]">₹{workerPayout}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tech & Infra Fee (5%)</span>
            <span className="font-semibold text-gray-800">₹{techOpsFee}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Society Welfare Fund (4%)</span>
            <span className="font-semibold text-[#E8A33D]">₹{welfareContrib}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Federation Training Fee (3%)</span>
            <span className="font-semibold text-gray-800">₹{federationFee}</span>
          </div>

          <p className="text-[11px] text-gray-500 italic mt-2">
            * 12% total platform take vs typical 25–35% private gig platform fees.
          </p>
        </div>
      )}
    </div>
  );
}
