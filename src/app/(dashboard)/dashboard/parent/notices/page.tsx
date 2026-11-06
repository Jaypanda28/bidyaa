import React from 'react';
import { Bell, Calendar, Megaphone } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Parent Notices & Circulars | Parent Portal',
};

export default async function ParentNoticesPage() {
  const notices = await prisma.announcement.findMany({
    where: {
      OR: [
        { targetAudience: 'ALL' },
        { targetAudience: 'PARENTS' },
      ],
    },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Institute Circulars & PTM Notices</h1>
        <p className="text-xs text-slate-500">
          Official communication regarding academic calendars, test dates, and parent-teacher meetings.
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  n.priority === 'HIGH' || n.priority === 'URGENT'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {n.priority} PRIORITY
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(n.publishedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <h3 className="font-extrabold text-base text-slate-900">{n.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {n.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

