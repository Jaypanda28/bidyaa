import React from 'react';
import { Receipt, DollarSign, Printer, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import PrintButton from '@/components/PrintButton';

export const metadata = {
  title: 'Issued Payment Receipts | Accounts Desk',
};

export default async function AccountantReceiptsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      student: { include: { user: true, branch: true } },
    },
    orderBy: { paidAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Official Payment Receipts Ledger</h1>
          <p className="text-xs text-slate-500">
            Printable tax receipts with GST and institute registration credentials.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-red-600 text-sm">
                  {p.receiptNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>
              <div className="font-bold text-slate-900 text-sm mt-1">{p.student.user.name} ({p.student.studentId})</div>
              <div className="text-slate-500">{p.notes}</div>
              <div className="text-slate-400 text-[10px]">
                Paid on {new Date(p.paidAt).toLocaleDateString('en-IN')} via {p.paymentMethod}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-base font-black text-slate-900">
                  ₹{p.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-400">Campus: {p.student.branch?.name}</div>
              </div>

              <PrintButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

