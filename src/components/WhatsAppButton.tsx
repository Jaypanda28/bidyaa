'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappUrl =
    'https://wa.me/917978781801?text=' +
    encodeURIComponent('Hello Bidya Classes! I am interested in courses and admission details. Please guide me.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bidya Classes on WhatsApp"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-3 rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all transform hover:-translate-y-1"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline text-sm font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

