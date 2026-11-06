import React from 'react';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'My Attendance Records | Bidya Classes ERP',
};

export default async function StudentAttendancePage() {
  const session = await getCurrentUser();

  const student = await prisma.student.findFirst({
    where: { userId: session?.id },
    include: {
      attendance: {
        include: { batch: true },
        orderBy: { date: 'desc' },
      },
    },
  });

  const total = student?.attendance.length || 0;
  const presentCount = student?.attendance.filter((a) => a.status === 'PRESENT').length || 0;
  const absentCount = student?.attendance.filter((a) => a.status === 'ABSENT').length || 0;
  const attRate = total > 0 ? Math.round((presentCount / total) * 100) : 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">My Attendance History</h1>
        <p className="text-xs text-slate-500">
          Session logs marked by your faculty mentors in smart classrooms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Attendance Rate</div>
            <div className="text-3xl font-black text-slate-900 mt-1">{attRate}%</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Present Days</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">{presentCount}</div>
          </div>
          <div className="text-xs text-slate-500 font-medium">Out of {total} classes</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Absent Days</div>
            <div className="text-3xl font-black text-red-600 mt-1">{absentCount}</div>
          </div>
          <div className="text-xs text-slate-500 font-medium">Leave with intimation</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Session Breakdown</h3>

        <div className="space-y-2">
          {student?.attendance.map((att) => (
            <div
              key={att.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-slate-800">{att.date}</span>
                <div className="text-slate-500 text-[11px]">{att.batch.name}</div>
                <div className="text-slate-400 text-[10px] mt-0.5">{att.remarks || 'Classroom session attended'}</div>
              </div>

              <span
                className={`px-3 py-1 rounded-full font-bold text-xs ${
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
    </div>
  );
}

