import React from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Attendance Matrix | Bidya Classes ERP',
};

export default async function AttendanceMatrixPage() {
  const attendanceRecords = await prisma.attendance.findMany({
    take: 40,
    include: {
      student: { include: { user: true } },
      batch: true,
    },
    orderBy: { date: 'desc' },
  });

  const total = attendanceRecords.length;
  const presentCount = attendanceRecords.filter((a) => a.status === 'PRESENT').length;
  const absentCount = attendanceRecords.filter((a) => a.status === 'ABSENT').length;
  const attRate = total > 0 ? Math.round((presentCount / total) * 100) : 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Attendance Central Matrix</h1>
          <p className="text-xs text-slate-500">
            Real-time session attendance logs across all batches and branches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            {attRate}% Overall Attendance
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Present Records</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{presentCount}</div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/30" />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Absentee Alerts</div>
            <div className="text-2xl font-black text-red-600 mt-1">{absentCount}</div>
          </div>
          <XCircle className="w-8 h-8 text-red-500/30" />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Parent Notification</div>
            <div className="text-sm font-bold text-slate-800 mt-1">Automatic SMS Dispatched</div>
          </div>
          <Clock className="w-8 h-8 text-slate-300" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">Recent Attendance Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Status</th>
                <th className="p-4">Remarks / Leave Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceRecords.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{a.date}</td>
                  <td className="p-4 font-bold text-slate-900">{a.student.user.name}</td>
                  <td className="p-4 font-mono text-slate-500">{a.student.studentId}</td>
                  <td className="p-4 text-slate-700">{a.batch.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        a.status === 'PRESENT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : a.status === 'LATE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{a.remarks || 'Standard classroom presence'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

