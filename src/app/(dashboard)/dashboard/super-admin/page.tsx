import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Receipt,
  Layers,
  ClipboardList,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  PlusCircle,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import SuperAdminActions from './SuperAdminActions';

export const metadata = {
  title: 'Super Admin ERP Dashboard | Bidya Classes',
};

export default async function SuperAdminDashboard() {
  // Aggregate real database metrics
  const totalStudents = await prisma.student.count();
  const totalFaculty = await prisma.faculty.count();
  const activeBatches = await prisma.batch.count({ where: { isActive: true } });
  const totalEnquiries = await prisma.enquiry.count();
  const pendingApplications = await prisma.admissionApplication.count({ where: { status: 'PENDING' } });

  const paymentsAggregate = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'SUCCESS' },
  });
  const totalRevenue = paymentsAggregate._sum.amount || 0;

  // Branch statistics
  const branches = await prisma.branch.findMany({
    include: {
      students: true,
      batches: true,
    },
  });

  // Recent applications
  const recentApplications = await prisma.admissionApplication.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  // Recent fee payments
  const recentPayments = await prisma.payment.findMany({
    take: 5,
    orderBy: { paidAt: 'desc' },
    include: {
      student: { include: { user: true } },
    },
  });

  // Recent enquiries
  const recentEnquiries = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const kpis = [
    {
      title: 'Total Enrolled Students',
      value: totalStudents,
      subtext: 'Across Class VII to XII & Droppers',
      icon: GraduationCap,
      color: 'bg-red-50 text-red-600 border-red-200',
    },
    {
      title: 'Active Batches',
      value: activeBatches,
      subtext: 'Ghatikia & Fire Station Centers',
      icon: Layers,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Total Faculty Mentors',
      value: totalFaculty,
      subtext: 'Subject matter specialists',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Total Fee Collection',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      subtext: 'Verified receipts issued',
      icon: Receipt,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      title: 'Pending Applications',
      value: pendingApplications,
      subtext: 'Awaiting seat confirmation',
      icon: ClipboardList,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      title: 'Total Web Enquiries',
      value: totalEnquiries,
      subtext: 'New admissions leads',
      icon: TrendingUp,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              Super Admin Central ERP
            </span>
            <span className="text-xs text-slate-400">Academic Year 2024–2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Institute Operational Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
            Real-time monitoring across Ghatikia Head Campus and Fire Station Specialized Wing. All figures are live database records.
          </p>
        </div>

        {/* Client Interactive Action buttons */}
        <SuperAdminActions />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpis.map((k, idx) => {
          const Icon = k.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {k.title}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {k.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{k.subtext}</div>
              </div>
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${k.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Branch Performance Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                {b.isMain ? 'Headquarters' : 'Secondary Campus'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Branch: {b.code}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{b.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{b.address}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-slate-900">{b.students.length}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Enrolled Students</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-slate-900">{b.batches.length}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Active Batches</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-lg font-black text-emerald-600">Active</div>
                <div className="text-[10px] text-slate-500 font-semibold">Campus Status</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Row: Recent Applications & Recent Fee Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Recent Admission Applications</h3>
              <p className="text-xs text-slate-400">Incoming student enrollments</p>
            </div>
            <Link
              href="/dashboard/super-admin/enquiries"
              className="text-xs font-bold text-red-600 hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{app.studentName}</div>
                  <div className="text-slate-500 text-[11px]">
                    {app.targetCourse} • {app.branch}
                  </div>
                  <div className="text-slate-400 font-mono text-[10px] mt-0.5">
                    {app.applicationNumber}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Score: {app.lastExamScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Fee Payments */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Recent Fee Collections</h3>
              <p className="text-xs text-slate-400">Live transaction records</p>
            </div>
            <Link
              href="/dashboard/super-admin/fees"
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Full Ledger &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentPayments.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{p.student.user.name}</div>
                  <div className="text-slate-500 text-[11px] font-mono">
                    Receipt: {p.receiptNumber}
                  </div>
                  <div className="text-slate-400 text-[10px]">Method: {p.paymentMethod}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    PAID
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

