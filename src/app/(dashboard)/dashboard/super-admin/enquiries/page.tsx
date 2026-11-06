import React from 'react';
import {
  ClipboardList,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Admissions & Enquiries Desk | Bidya Classes ERP',
};

export default async function EnquiriesManagementPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const applications = await prisma.admissionApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Admissions & Enquiries Desk</h1>
        <p className="text-xs text-slate-500">
          Incoming admission leads, demo class requests, and formal student registrations.
        </p>
      </div>

      {/* Formal Applications Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">
              Formal Admission Applications ({applications.length})
            </h2>
            <p className="text-xs text-slate-400">Applications submitted through the online portal</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">App Number & Student</th>
                <th className="p-3">Target Course</th>
                <th className="p-3">Branch</th>
                <th className="p-3">Guardian Contact</th>
                <th className="p-3">Prior Score & Board</th>
                <th className="p-3">Scholarship</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{app.studentName}</div>
                    <div className="font-mono text-slate-400 text-[10px]">{app.applicationNumber}</div>
                    <div className="text-slate-400 text-[10px]">{app.phone}</div>
                  </td>

                  <td className="p-3">
                    <span className="font-semibold text-slate-800">{app.targetCourse}</span>
                    <div className="text-slate-400 text-[10px]">{app.currentClass}</div>
                  </td>

                  <td className="p-3 text-slate-700">{app.branch}</td>

                  <td className="p-3">
                    <div className="text-slate-800 font-medium">{app.fatherName}</div>
                    <div className="text-slate-400 font-mono text-[10px]">{app.fatherPhone}</div>
                  </td>

                  <td className="p-3">
                    <div className="font-bold text-slate-900">{app.lastExamScore}</div>
                    <div className="text-slate-400 text-[10px]">{app.board} • {app.previousSchool}</div>
                  </td>

                  <td className="p-3">
                    {app.scholarshipOptIn ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        BBSAT Opted
                      </span>
                    ) : (
                      <span className="text-slate-400">Regular</span>
                    )}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        app.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Web Enquiries Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900">
              Web Admission Leads & Demo Enquiries ({enquiries.length})
            </h2>
            <p className="text-xs text-slate-400">Direct inquiries from website visitors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{enq.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                  {enq.status}
                </span>
              </div>

              <div className="space-y-1 text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${enq.phone}`} className="hover:text-red-600 font-bold">
                    {enq.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{enq.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <div className="font-semibold text-slate-800">{enq.courseOfInterest}</div>
                <div className="text-slate-500 text-[11px]">Branch: {enq.branch}</div>
                {enq.message && (
                  <p className="mt-1 text-slate-500 text-[11px] italic line-clamp-2">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

