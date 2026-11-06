import React from 'react';
import { BookOpen, Download, FileText, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Study Materials & LMS Notes | Bidya Classes ERP',
};

export default async function StudentMaterialsPage() {
  const session = await getCurrentUser();
  const materials = await prisma.studyMaterial.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Study Materials & Revision Notes</h1>
        <p className="text-xs text-slate-500">
          Faculty-curated NCERT solutions, formula sheets, and past 10-year question banks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
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

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Uploaded by {m.uploadedBy}</span>
              <a
                href={m.fileUrl}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

