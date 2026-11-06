import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Calendar,
  AlertCircle,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'News & Announcements | Bidya Classes – Bhubaneswar',
  description: 'Latest official notices, exam schedules, PTM circulars, and BBSAT scholarship updates from Bidya Classes.',
};

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Megaphone className="w-3.5 h-3.5" />
            INSTITUTE NOTICE BOARD
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            News, Circulars & Announcements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Stay updated with test timetables, BBSAT scholarship test notifications, holiday lists, and Parent-Teacher Meetings.
          </p>
        </div>
      </section>

      {/* Main List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      item.priority === 'HIGH' || item.priority === 'URGENT'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.priority} PRIORITY
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Audience: {item.targetAudience}
                  </span>
                  <span className="text-xs text-slate-400">
                    {item.branchName}
                  </span>
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

              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>

              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Bidya Classes Academic Administration</span>
                <Link
                  href="/admissions"
                  className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  Enquire regarding this notice &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

