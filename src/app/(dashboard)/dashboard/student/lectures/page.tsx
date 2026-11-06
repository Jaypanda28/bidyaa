import React from 'react';
import { Video, Clock, Eye, PlayCircle, Users } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Recorded Video Classes | Bidya Classes ERP',
};

export default async function StudentLecturesPage() {
  const lectures = await prisma.videoLecture.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Recorded Video Lectures & Masterclasses</h1>
        <p className="text-xs text-slate-500">
          Replay classroom lectures, topic derivations, and numerical trick sessions on-demand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lec) => (
          <div
            key={lec.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
              <iframe
                src={lec.videoUrl}
                title={lec.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                    {lec.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{lec.duration}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{lec.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lec.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{lec.instructor}</span>
                <span className="text-emerald-700 font-bold">{lec.views} Views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

