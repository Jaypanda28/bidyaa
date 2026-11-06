import React from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Award,
  Receipt,
  Bell,
  CheckCircle2,
  AlertCircle,
  Phone,
  Printer,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import ParentFeePayModal from './ParentFeePayModal';
import PrintButton from '@/components/PrintButton';

export const metadata = {
  title: 'Parent Portal | Bidya Classes ERP',
};

export default async function ParentPortalPage() {
  const session = await getCurrentUser();

  // Fetch parent and linked students
  const parent = await prisma.parent.findFirst({
    where: { userId: session?.id },
    include: {
      students: {
        include: {
          user: true,
          branch: true,
          enrollments: { include: { course: true, batch: true } },
          attendance: { orderBy: { date: 'desc' } },
          payments: { include: { feeStructure: true }, orderBy: { paidAt: 'desc' } },
          examAttempts: { include: { exam: true }, orderBy: { submittedAt: 'desc' } },
        },
      },
    },
  });

  let child = parent?.students[0] || null;
  if (!child) {
    child = await prisma.student.findFirst({
      include: {
        user: true,
        branch: true,
        enrollments: { include: { course: true, batch: true } },
        attendance: { orderBy: { date: 'desc' } },
        payments: { include: { feeStructure: true }, orderBy: { paidAt: 'desc' } },
        examAttempts: { include: { exam: true }, orderBy: { submittedAt: 'desc' } },
      },
    });
  }

  const totalAtt = child?.attendance.length || 0;
  const presentCount = child?.attendance.filter((a) => a.status === 'PRESENT').length || 0;
  const attRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100;

  const totalPaid = child?.payments.reduce((acc, p) => acc + p.amount, 0) || 0;
  const totalCourseFee = child?.enrollments[0]?.course?.fee || 38000;
  const pendingDues = Math.max(0, totalCourseFee - totalPaid);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              Parent & Guardian Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Academic Dashboard for {child?.user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Student ID: <strong>{child?.studentId}</strong> • {child?.classLevel} • {child?.branch?.name || 'Ghatikia Campus'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
              <div className="text-xl font-black text-emerald-400">{attRate}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Attendance</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
              <div className="text-xl font-black text-amber-400">
                ₹{pendingDues.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Pending Dues</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Attendance & Exam Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Attendance Log */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Attendance Records</h3>
              <p className="text-xs text-slate-400">Classroom presence logged by faculty</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              {presentCount} / {totalAtt} Days
            </span>
          </div>

          <div className="space-y-2">
            {child?.attendance.slice(0, 6).map((att) => (
              <div
                key={att.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800">{att.date}</span>
                  <div className="text-slate-400 text-[11px]">{att.remarks || 'Regular presence'}</div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    att.status === 'PRESENT'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Examination Scores */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Test Scorecards & Ranks</h3>
              <p className="text-xs text-slate-400">Evaluated mock and weekly assessments</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
              {child?.examAttempts.length} Tests
            </span>
          </div>

          <div className="space-y-3">
            {child?.examAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{attempt.exam.title}</span>
                  <span className="font-mono text-emerald-700 font-black text-sm">
                    {attempt.score} / {attempt.exam.totalMarks}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Correct: {attempt.correctCount} • Incorrect: {attempt.incorrectCount}</span>
                  <span className="text-emerald-700 font-bold">Passed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Section & Online Payment Modal */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Fee Summary & Official Receipts</h3>
            <p className="text-xs text-slate-500">
              Total Course Package: ₹{totalCourseFee.toLocaleString('en-IN')} • Paid: ₹{totalPaid.toLocaleString('en-IN')}
            </p>
          </div>

          {child && (
            <ParentFeePayModal
              studentId={child.id}
              studentName={child.user.name}
              pendingAmount={pendingDues}
            />
          )}
        </div>

        {/* Existing Receipts */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Payment Receipts Issued:
          </span>

          {child?.payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-red-600 text-sm">
                    {p.receiptNumber}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                    PAID
                  </span>
                </div>
                <div className="text-slate-600 mt-1">{p.notes}</div>
                <div className="text-slate-400 text-[11px]">
                  Paid on {new Date(p.paidAt).toLocaleDateString('en-IN')} via {p.paymentMethod}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-base font-black text-slate-900">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400">Includes GST & Exam Fees</div>
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
