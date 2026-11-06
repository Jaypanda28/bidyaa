import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Search,
  CheckCircle2,
  Calendar,
  Receipt,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Students Directory | Bidya Classes ERP',
};

export default async function StudentsDirectoryPage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      branch: true,
      parent: { include: { user: true } },
      enrollments: { include: { course: true, batch: true } },
      attendance: true,
      payments: true,
      examAttempts: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Student Records & Profiles</h1>
          <p className="text-xs text-slate-500">
            Active admissions, batch allocations, ID credentials, and attendance tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
            {students.length} Enrolled Students
          </span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Student ID & Name</th>
                <th className="p-4">Class & Stream</th>
                <th className="p-4">Allocated Batch</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Fee Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st) => {
                const totalAtt = st.attendance.length;
                const presentAtt = st.attendance.filter((a) => a.status === 'PRESENT').length;
                const attRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;
                const totalPaid = st.payments.reduce((acc, p) => acc + p.amount, 0);
                const activeBatch = st.enrollments[0]?.batch;

                return (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs">
                          {st.user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{st.user.name}</div>
                          <div className="text-slate-400 font-mono text-[11px]">{st.studentId}</div>
                          <div className="text-slate-400 text-[10px]">{st.user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-slate-800">{st.classLevel}</span>
                      <div className="text-slate-400 text-[11px]">{st.stream || 'Foundation'}</div>
                      <div className="text-slate-400 text-[10px]">{st.schoolName}</div>
                    </td>

                    <td className="p-4">
                      {activeBatch ? (
                        <div>
                          <span className="font-semibold text-slate-900">{activeBatch.name}</span>
                          <div className="text-slate-400 text-[10px]">{activeBatch.schedule}</div>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-medium">Pending Batch</span>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="text-slate-700">{st.branch?.name || 'Ghatikia'}</span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${
                              attRate >= 80 ? 'bg-emerald-500' : attRate >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${attRate}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-700">{attRate}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {presentAtt}/{totalAtt || 1} Sessions
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">
                        ₹{totalPaid.toLocaleString('en-IN')}
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        href={`/dashboard/super-admin/students/${st.id}`}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

