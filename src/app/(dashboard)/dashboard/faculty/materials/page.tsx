import React from 'react';
import { BookOpen, Download, FileText } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import UploadMaterialModal from '../UploadMaterialModal';

export const metadata = {
  title: 'Upload Study Materials | Faculty Desk',
};

export default async function FacultyMaterialsPage() {
  const session = await getCurrentUser();

  const courses = await prisma.course.findMany();
  const materials = await prisma.studyMaterial.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Study Materials & Notes Repository</h1>
          <p className="text-xs text-slate-500">
            Publish PDF handouts, formula cheat sheets, and board test practice modules.
          </p>
        </div>

        {courses[0] && <UploadMaterialModal courseId={courses[0].id} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                  {m.subject}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{m.fileSize}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base">{m.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Course: {m.course.title}</span>
              <span className="text-emerald-700 font-bold">{m.downloads} Downloads</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

