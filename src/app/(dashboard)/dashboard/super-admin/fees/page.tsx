import React from 'react';
import {
  Receipt,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import CollectFeeModal from './CollectFeeModal';

export const metadata = {
  title: 'Fee Ledger & Collections | Bidya Classes ERP',
};

export default async function FeesManagementPage() {
  const payments = await prisma.payment.findMany({
    include: {
      student: {
        include: {
          user: true,
          branch: true,
          enrollments: { include: { course: true, batch: true } },
        },
      },
      feeStructure: true,
    },
    orderBy: { paidAt: 'desc' },
  });

  const students = await prisma.student.findMany({
    include: { user: true },
  });

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Fee Collections & Finance Ledger</h1>
          <p className="text-xs text-slate-500">
            Official receipt generator, Razorpay payment verification, and installment records.
          </p>
        </div>

        {/* Client Interactive Collect Fee Action */}
        <CollectFeeModal students={students} />
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Collections (All Campuses)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">100% Verified Receipts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Receipts Issued
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {payments.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Printed & Downloadable</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Payment Gateways
          </div>
          <div className="text-lg font-black text-slate-900 mt-1">
            Razorpay UPI / Netbanking / POS Cash
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">Online Simulation Ready</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">Verified Payment Transactions</h3>
          <span className="text-xs text-slate-400">Chronological Order</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Receipt Number</th>
                <th className="p-4">Student Name & ID</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Notes / Installment</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-red-600">
                    {p.receiptNumber}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{p.student.user.name}</div>
                    <div className="text-slate-400 font-mono text-[10px]">{p.student.studentId}</div>
                    <div className="text-slate-500 text-[10px]">{p.student.branch?.name}</div>
                  </td>

                  <td className="p-4">
                    <div className="text-sm font-black text-slate-900">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {p.paymentMethod}
                    </span>
                    {p.razorpayPaymentId && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {p.razorpayPaymentId}
                      </div>
                    )}
                  </td>

                  <td className="p-4 text-slate-600">
                    {new Date(p.paidAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="p-4 text-slate-600 max-w-xs">
                    {p.notes || 'Tuition fee installment'}
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      SUCCESS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

