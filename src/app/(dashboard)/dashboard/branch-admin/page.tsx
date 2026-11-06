import React from 'react';
import Link from 'next/link';
import {
  Building,
  GraduationCap,
  Users,
  Layers,
  Calendar,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Branch Admin Operations | Bidya Classes ERP',
};

export default async function BranchAdminDashboardPage() {
  const session = await getCurrentUser();

  // Find branch for user or default to Ghatikia
  let branch = null;
  if (session?.branchId) {
    branch = await prisma.branch.findUnique({
      where: { id: session.branchId },
      include: {
        students: { include: { user: true, attendance: true, enrollments: { include: { batch: true } } } },
        batches: { include: { faculty: { include: { user: true } }, course: true } },
      },
    });
  }

  if (!branch) {
    branch = await prisma.branch.findFirst({
      include: {
        students: { include: { user: true, attendance: true, enrollments: { include: { batch: true } } } },
        batches: { include: { faculty: { include: { user: true } }, course: true } },
      },
    });
  }

  const branchStudents = branch?.students || [];
  const branchBatches = branch?.batches || [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              Campus Administrative Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{branch?.name}</h1>
            <p className="text-xs text-slate-400">{branch?.address}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div className="text-xl font-black text-white">{branchStudents.length}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Students</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div className="text-xl font-black text-white">{branchBatches.length}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Batches</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branch Batches */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Active Campus Batches</h3>
          <div className="space-y-3">
            {branchBatches.map((b) => (
              <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{b.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{b.code}</span>
                </div>
                <div className="text-slate-600">{b.schedule} • {b.roomNumber}</div>
                {b.faculty && (
                  <div className="text-slate-500 font-medium">Faculty Mentor: {b.faculty.user.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Branch Students */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Enrolled Students at Campus</h3>
          <div className="space-y-2">
            {branchStudents.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{st.user.name}</div>
                  <div className="text-slate-400 font-mono text-[10px]">{st.studentId}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-700 font-semibold">{st.classLevel}</div>
                  <div className="text-slate-400 text-[10px]">{st.stream}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
