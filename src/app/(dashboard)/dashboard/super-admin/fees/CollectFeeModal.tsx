'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Receipt, X, CheckCircle2, DollarSign } from 'lucide-react';

interface StudentOption {
  id: string;
  studentId: string;
  user: {
    name: string;
  };
}

export default function CollectFeeModal({ students }: { students: StudentOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ONLINE');
  const [notes, setNotes] = useState('Term 2 Tuition Fee Installment');
  const [loading, setLoading] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReceiptGenerated(null);

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          amount,
          paymentMethod,
          notes,
          razorpayPaymentId: `pay_live_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record payment');

      setReceiptGenerated(data.receiptNumber);
      setTimeout(() => {
        setOpen(false);
        setReceiptGenerated(null);
        setAmount('');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      alert(err.message || 'Error recording payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
      >
        <Receipt className="w-4 h-4" />
        <span>Collect Fee & Issue Receipt</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Collect Fee & Issue Receipt</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {receiptGenerated && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Receipt <strong>{receiptGenerated}</strong> generated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.user.name} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount to Collect (₹)</label>
                <input
                  type="number"
                  required
                  min="500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 19000"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="ONLINE">Razorpay Online Gateway (UPI/Card)</option>
                  <option value="UPI">Direct UPI / QR Code</option>
                  <option value="CASH">Cash Counter (Branch Office)</option>
                  <option value="CARD">Debit / Credit Card POS</option>
                  <option value="CHEQUE">Bank Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Remarks / Installment Description</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Term 2 Tuition Fee Installment"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
              >
                {loading ? 'Recording & Issuing Receipt...' : 'Confirm Payment & Generate Receipt'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

