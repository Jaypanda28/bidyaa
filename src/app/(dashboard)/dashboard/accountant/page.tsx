import React from 'react';
import Link from 'next/link';
import {
  Receipt,
  DollarSign,
  Calendar,
  Users,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import CollectFeeModal from '../super-admin/fees/CollectFeeModal';

export const metadata = {
  title: 'Accounts & Finance Desk | Bidya Classes ERP',
};

export default async function AccountantDashboardPage() {
  const payments = await prisma.payment.findMany({
    include: {
      student: { include: { user: true, branch: true } },
    },
    orderBy: { paidAt: 'desc' },
  });

  const students = await prisma.student.findMany({
    include: { user: true },
  });

  const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Accounts & Bursar Desk</h1>
          <p className="text-xs text-slate-500">
            Fee reconciliation, installment collections, and official printable tax receipts.
          </p>
        </div>

        <CollectFeeModal students={students} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Collections
          </div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-600 font-bold mt-1">Verified Receipts Logged</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Receipts Issued
          </div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {payments.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Online & Counter receipts</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Receipts Audit Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Receipt Number</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-mono font-bold text-red-600">{p.receiptNumber}</td>
                  <td className="p-3 font-bold text-slate-900">{p.student.user.name}</td>
                  <td className="p-3 font-black text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3">{p.paymentMethod}</td>
                  <td className="p-3 text-slate-500">{new Date(p.paidAt).toLocaleDateString('en-IN')}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
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

