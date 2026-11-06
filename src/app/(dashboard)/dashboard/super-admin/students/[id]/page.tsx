import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Calendar,
  Receipt,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import prisma from '@/lib/prisma';

interface Props {
  params: { id: string };
}

export default async function StudentProfilePage({ params }: Props) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      branch: true,
      parent: { include: { user: true } },
      enrollments: { include: { course: true, batch: true } },
      attendance: { orderBy: { date: 'desc' } },
      payments: { include: { feeStructure: true }, orderBy: { paidAt: 'desc' } },
      examAttempts: { include: { exam: true }, orderBy: { submittedAt: 'desc' } },
    },
  });

  if (!student) notFound();

  const totalAtt = student.attendance.length;
  const presentCount = student.attendance.filter((a) => a.status === 'PRESENT').length;
  const attRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 100;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/super-admin/students"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Students Directory
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-red-100 text-red-700 font-black text-2xl flex items-center justify-center border-2 border-red-200">
              {student.user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{student.user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Enrolled
                </span>
              </div>
              <div className="text-sm font-mono font-bold text-red-600 mt-0.5">
                Student ID: {student.studentId}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {student.classLevel} • {student.stream} • {student.schoolName}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center w-full md:w-auto">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-black text-slate-900">{attRate}%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Attendance</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xl font-black text-slate-900">
                {student.examAttempts.length}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Tests Taken</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact & Parent Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Student & Guardian Details</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block">Email Address</span>
                <span className="font-semibold text-slate-800">{student.user.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone</span>
                <span className="font-semibold text-slate-800">{student.user.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Campus Allotted</span>
                <span className="font-semibold text-slate-800">{student.branch?.name || 'Ghatikia'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Residential Address</span>
                <span className="font-semibold text-slate-800">{student.address || 'Bhubaneswar, Odisha'}</span>
              </div>
              {student.parent && (
                <div className="pt-2 border-t">
                  <span className="text-slate-400 block">Parent / Guardian</span>
                  <span className="font-bold text-slate-900">{student.parent.user.name} ({student.parent.relation})</span>
                  <div className="text-slate-500">{student.parent.occupation}</div>
                  <div className="text-slate-500 font-mono">{student.parent.user.phone}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attendance & Exams */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Batch */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Allocated Course & Batch</h3>
            {student.enrollments.map((enr) => (
              <div key={enr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900">{enr.batch.name}</div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {enr.status}
                  </span>
                </div>
                <div className="text-slate-600">{enr.course.title}</div>
                <div className="text-slate-400">Schedule: {enr.batch.schedule} • {enr.batch.roomNumber}</div>
              </div>
            ))}
          </div>

          {/* Fee Payments */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Fee Receipts & Transaction Ledger</h3>
            <div className="space-y-2">
              {student.payments.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</span>
                    <div className="text-slate-400 font-mono text-[10px]">{p.receiptNumber}</div>
                    <div className="text-slate-500 text-[11px]">{p.notes}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {p.status}
                    </span>
                    <div className="text-slate-400 text-[10px] mt-0.5">
                      {new Date(p.paidAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

