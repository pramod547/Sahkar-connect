'use client';

import React from 'react';
import { CheckCircle2, Clock, MapPin, Wrench, CheckCheck } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: 'pending_match' | 'offered' | 'assigned' | 'in_progress' | 'completed' | string;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const steps = [
    { key: 'booked', label: 'Booked', icon: Clock },
    { key: 'matched', label: 'Matched', icon: CheckCircle2 },
    { key: 'en_route', label: 'En Route', icon: MapPin },
    { key: 'in_progress', label: 'In Progress', icon: Wrench },
    { key: 'completed', label: 'Completed', icon: CheckCheck },
  ];

  const getActiveIndex = () => {
    switch (currentStatus) {
      case 'pending_match':
        return 0;
      case 'offered':
      case 'assigned':
        return 1;
      case 'en_route':
        return 2;
      case 'in_progress':
        return 3;
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="w-full py-4 px-2">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#147D74] -translate-y-1/2 transition-all duration-500 z-0"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.key} className="flex flex-col items-center z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                  isDone
                    ? 'bg-[#0B4F4A] border-[#0B4F4A] text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-[#E8A33D]/40 scale-110' : ''}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-medium mt-1 text-center ${
                  isCurrent ? 'text-[#0B4F4A] font-bold' : isDone ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
