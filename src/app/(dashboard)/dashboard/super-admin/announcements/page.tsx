import React from 'react';
import { Bell, Megaphone, Calendar, Users, AlertCircle } from 'lucide-react';
import prisma from '@/lib/prisma';
import SuperAdminActions from '../SuperAdminActions';

export const metadata = {
  title: 'Announcements & Circulars | Bidya Classes ERP',
};

export default async function SuperAdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Institute Notice Board & Broadcasts</h1>
          <p className="text-xs text-slate-500">
            Official announcements dispatched to students, parents, and faculty dashboards.
          </p>
        </div>

        <SuperAdminActions />
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.priority === 'HIGH' || item.priority === 'URGENT'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  Target: {item.targetAudience}
                </span>
                <span className="text-xs text-slate-400">{item.branchName}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

