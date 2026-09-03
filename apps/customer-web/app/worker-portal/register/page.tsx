'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Building2, UserCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';

export default function WorkerRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('30');
  const [workerType, setWorkerType] = useState<'government' | 'non-government' | 'private'>('government');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('Electrical Services');
  const [hourlyRate, setHourlyRate] = useState('350');
  const [experience, setExperience] = useState('5');
  const [aan, setAan] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workerCode =
      workerType === 'government'
        ? `SKC-GOVT-${Math.floor(100 + Math.random() * 900)}`
        : workerType === 'private'
        ? `SKC-PRIV-${Math.floor(100 + Math.random() * 900)}`
        : `SKC-IND-${Math.floor(100 + Math.random() * 900)}`;

    const newWorkerSession = {
      workerCode,
      name,
      phone,
      age: parseInt(age),
      workerType,
      companyName: workerType === 'private' ? companyName : undefined,
      category,
      hourlyRate: parseInt(hourlyRate),
      experienceYears: parseInt(experience),
    };

    localStorage.setItem('sahakar_worker_session', JSON.stringify(newWorkerSession));
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/worker-portal/dashboard');
    }, 1500);
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-extrabold text-[#1B5E4B]">Service Provider Registration</h1>
          <span className="text-xs font-bold bg-[#1B5E4B]/10 text-[#1B5E4B] px-2.5 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h2 className="text-lg font-extrabold text-[#1B5E4B]">Registration Completed!</h2>
            <p className="text-xs text-gray-500 mt-1">Generating your Service Provider ID & Redirecting to Dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Provider Category & Type */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Select Service Provider Category</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'government', title: 'Government Certified Service Provider', desc: 'NCCT, Skill India or Govt recognized', icon: ShieldCheck, color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                      { id: 'non-government', title: 'Independent Service Provider (Non-Govt)', desc: 'Self-employed tradesperson or artisan', icon: UserCheck, color: 'border-amber-500 bg-amber-50 text-amber-900' },
                      { id: 'private', title: 'Private Company Service Provider / Partner', desc: 'Working under private agency / firm', icon: Building2, color: 'border-blue-500 bg-blue-50 text-blue-900' },
                    ].map((type) => {
                      const Icon = type.icon;
                      const isSelected = workerType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setWorkerType(type.id as any)}
                          className={`p-3 rounded-xl border-2 text-left transition flex items-start space-x-3 cursor-pointer ${
                            isSelected ? type.color : 'border-gray-200 bg-gray-50 text-gray-700'
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-extrabold block">{type.title}</span>
                            <span className="text-[10px] opacity-80">{type.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {workerType === 'private' && (
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Company / Agency Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Staffing Solutions Pvt Ltd"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                      required
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#1B5E4B] text-white font-extrabold py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs"
                >
                  <span>Next: Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Primary Skill Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                  >
                    <option>Electrical Services</option>
                    <option>Deep Cleaning</option>
                    <option>Plumbing Service</option>
                    <option>Elder Caregiving</option>
                    <option>Painting</option>
                    <option>Carpentry</option>
                  </select>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-[#1B5E4B] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Next: Verification
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Verification & Rate */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="350"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="5"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Aadhaar / UAN Number (Optional Mock)</label>
                  <input
                    type="text"
                    value={aan}
                    onChange={(e) => setAan(e.target.value)}
                    placeholder="12-digit Aadhaar / e-Shram UAN"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1B5E4B]"
                  />
                </div>

                <div className="bg-[#FEFAF3] p-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
                  <div className="font-bold text-[#1B5E4B]">Cooperative Fair Compensation Guarantee:</div>
                  <div>• 88% Direct Payout into your linked bank account</div>
                  <div>• 4% Society Welfare Fund contribution for your safety net</div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#1B5E4B] hover:bg-[#7BA68D] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
