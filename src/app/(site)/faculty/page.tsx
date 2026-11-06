import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Faculty & Mentors | Bidya Classes – Bhubaneswar',
  description: 'Meet our distinguished faculty and subject masters in Mathematics, Physics, Chemistry, and Biology at Bidya Classes Bhubaneswar.',
};

export default async function FacultyPage() {
  const facultyList = await prisma.faculty.findMany({
    include: {
      user: {
        include: {
          branch: true,
        },
      },
      batches: {
        include: {
          course: true,
        },
      },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            ACADEMIC COUNCIL & MENTORS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Distinguished Faculty & Subject Masters
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Passionate educators hailing from reputed universities and premier national institutions dedicated to conceptual clarity, student engagement, and rank-producing outcomes.
          </p>
        </div>
      </section>

      {/* Managing Director Profile Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100">
                <Image
                  src="/images/md-bidyasagar-parida.jpg"
                  alt="Bidyasagar Parida"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Founder & Academic Lead
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Bidyasagar Parida
              </h2>
              <div className="text-sm font-semibold text-slate-700">
                Managing Director | M.Sc. (Mathematics), B.Ed., M.Tech. (Applied Mathematics)
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With more than a decade of specialized teaching experience, Prof. Bidyasagar Parida oversees the academic syllabus, faculty evaluations, and test designs across both the Ghatikia and Fire Station centres. His hallmark teaching philosophy translates complex abstract calculus and coordinate geometry into intuitive, problem-solving mastery.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Award className="w-4 h-4 text-red-600" /> 10+ Years Mentoring State Toppers
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Over 5,000 Students Guided
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            DEPARTMENT HEADS & SENIOR EDUCATORS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Our Department Specialists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyList.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500 shadow-sm flex-shrink-0 bg-slate-100">
                    {fac.user.avatar ? (
                      <Image
                        src={fac.user.avatar}
                        alt={fac.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                        {fac.user.name.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-red-600 transition-colors">
                      {fac.user.name}
                    </h3>
                    <div className="text-xs font-bold text-red-600">{fac.designation}</div>
                    <div className="text-[11px] text-slate-500">{fac.user.branch?.name}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
                  <div>
                    <strong>Qualification:</strong> {fac.qualification}
                  </div>
                  <div>
                    <strong>Specialization:</strong> {fac.specialization}
                  </div>
                  <div>
                    <strong>Experience:</strong> {fac.experience}+ Years in Board & Entrance Coaching
                  </div>
                </div>

                {fac.bio && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                    &ldquo;{fac.bio}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">
                  {fac.batches.length} Active {fac.batches.length === 1 ? 'Batch' : 'Batches'}
                </span>
                <Link
                  href="/admissions"
                  className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  Join Batch &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

