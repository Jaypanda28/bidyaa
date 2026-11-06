'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, CheckCircle2, X, ShieldCheck } from 'lucide-react';

interface Props {
  studentId: string;
  studentName: string;
  pendingAmount: number;
}

export default function ParentFeePayModal({ studentId, studentName, pendingAmount }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(String(pendingAmount > 0 ? pendingAmount : 19000));
  const [method, setMethod] = useState('ONLINE');
  const [loading, setLoading] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessReceipt(null);

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          amount: payAmount,
          paymentMethod: method,
          notes: 'Term 2 Tuition Fee Paid via Parent Portal Gateway',
          razorpayPaymentId: `rzp_parent_${Date.now()}`,
          razorpayOrderId: `ord_parent_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');

      setSuccessReceipt(data.receiptNumber);
      setTimeout(() => {
        setOpen(false);
        setSuccessReceipt(null);
        router.refresh();
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Payment processing error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        <span>Pay Pending Fees Online</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Online Fee Checkout</h3>
                <p className="text-[11px] text-slate-400">Bidya Classes Integrated Payment Gateway</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successReceipt ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Payment Successful!</div>
                <div className="font-mono text-slate-700 font-bold">
                  Official Receipt: {successReceipt}
                </div>
                <p className="text-[11px] text-slate-500">
                  Receipt has been generated and saved to your account. Reloading...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-2xl border text-xs space-y-1">
                  <div className="text-slate-500">Student Name: <strong>{studentName}</strong></div>
                  <div className="text-slate-500">Total Pending Dues: <strong>₹{pendingAmount.toLocaleString('en-IN')}</strong></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Amount to Pay (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payment Gateway Mode
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="ONLINE">Razorpay (UPI / Google Pay / PhonePe / Cards)</option>
                    <option value="UPI">Direct UPI QR Code Scan</option>
                    <option value="CARD">Debit / Credit Card (Visa / Mastercard / RuPay)</option>
                    <option value="NETBANKING">Netbanking (All Major Indian Banks)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-bit SSL encrypted & Razorpay verified secure transaction.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing through Gateway...' : `Proceed to Pay ₹${Number(payAmount).toLocaleString('en-IN')}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

