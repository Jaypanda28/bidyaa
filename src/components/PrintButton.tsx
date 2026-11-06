'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton({ label = 'Print Receipt' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-white font-bold flex items-center gap-1.5 shadow-xs transition-colors"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}

