import React from 'react';
import { DollarSign, Layers, BookOpen } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Course Fee Structures | Accounts Desk',
};

export default async function AccountantStructuresPage() {
  const feeStructures = await prisma.feeStructure.findMany({
    include: {
      course: true,
      payments: true,
    },
  });

  const courses = await prisma.course.findMany({
    include: { feeStructures: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Course Fee Packages & Installment Plans</h1>
        <p className="text-xs text-slate-500">
          Tuition fee components, registration charges, and examination fund allocation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {c.category}
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-2">{c.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{c.targetClass} • {c.duration}</p>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tuition Base:</span>
                  <span className="font-bold">₹{(c.fee - 8000).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Registration & Kit:</span>
                  <span className="font-bold">₹5,000</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Examination & CBT:</span>
                  <span className="font-bold">₹3,000</span>
                </div>
                <div className="pt-2 border-t flex justify-between text-slate-900 font-extrabold text-sm">
                  <span>Annual Package:</span>
                  <span className="text-red-600">₹{c.fee.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              Installment options: 2 Terms or One-time Full Payment (with 5% early discount).
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

