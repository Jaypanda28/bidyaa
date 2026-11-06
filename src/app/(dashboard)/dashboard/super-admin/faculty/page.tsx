import React from 'react';
import Image from 'next/image';
import { Users, GraduationCap, Award, BookOpen, Layers } from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Faculty & Mentors Management | Bidya Classes ERP',
};

export default async function SuperAdminFacultyPage() {
  const faculty = await prisma.faculty.findMany({
    include: {
      user: { include: { branch: true } },
      batches: { include: { course: true } },
    },
    orderBy: { experience: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Faculty & Mentors Directory</h1>
          <p className="text-xs text-slate-500">
            Subject matter educators, assigned batches, and teaching experience.
          </p>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
          {faculty.length} Mentors Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 flex-shrink-0 bg-slate-100">
                  {f.user.avatar ? (
                    <Image src={f.user.avatar} alt={f.user.name} width={48} height={48} className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-700">
                      {f.user.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{f.user.name}</h3>
                  <div className="text-xs font-bold text-red-600">{f.designation}</div>
                  <div className="text-[10px] text-slate-400">{f.user.branch?.name}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div><strong>Qualification:</strong> {f.qualification}</div>
                <div><strong>Specialization:</strong> {f.specialization}</div>
                <div><strong>Experience:</strong> {f.experience}+ Years</div>
              </div>

              {f.bio && (
                <p className="text-xs text-slate-500 mt-3 italic line-clamp-2">
                  &ldquo;{f.bio}&rdquo;
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{f.batches.length} Batches Assigned</span>
              <span className="text-slate-400 font-mono text-[11px]">{f.user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

