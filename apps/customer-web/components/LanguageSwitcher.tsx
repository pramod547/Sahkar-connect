'use client';

import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { LANGUAGES } from '../lib/i18n';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-gray-200 shadow-xs hover:border-[#1B5E4B] transition text-xs font-semibold cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#1B5E4B]" />
        <span>{currentLang.flag} {currentLang.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 max-h-60 overflow-y-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F5ECD7]/60 transition ${
                language === lang.code ? 'font-bold text-[#1B5E4B] bg-[#F5ECD7]' : 'text-gray-700'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
