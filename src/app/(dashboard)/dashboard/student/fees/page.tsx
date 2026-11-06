import React from 'react';
import { Receipt, DollarSign } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import PrintButton from '@/components/PrintButton';

export const metadata = {
  title: 'Fee Status & Receipts | Bidya Classes ERP',
};

export default async function StudentFeesPage() {
  const session = await getCurrentUser();

  const student = await prisma.student.findFirst({
    where: { userId: session?.id },
    include: {
      user: true,
      branch: true,
      enrollments: { include: { course: true } },
      payments: { include: { feeStructure: true }, orderBy: { paidAt: 'desc' } },
    },
  });

  const totalCourseFee = student?.enrollments[0]?.course?.fee || 38000;
  const totalPaid = student?.payments.reduce((acc, p) => acc + p.amount, 0) || 0;
  const pendingDues = Math.max(0, totalCourseFee - totalPaid);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Fee Status & Official Payment Receipts</h1>
        <p className="text-xs text-slate-500">
          Installment summaries, scholarship discounts, and printable verified receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase">Total Course Fee</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{totalCourseFee.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase">Total Paid</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase">Outstanding Dues</div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            ₹{pendingDues.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Receipts List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Issued Payment Receipts</h3>

        <div className="space-y-3">
          {student?.payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-red-600 text-sm">
                    {p.receiptNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    PAID
                  </span>
                </div>
                <div className="text-slate-600 mt-1">{p.notes}</div>
                <div className="text-slate-400 text-[10px]">
                  Paid on {new Date(p.paidAt).toLocaleDateString('en-IN')} via {p.paymentMethod}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-base font-black text-slate-900">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                <PrintButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
