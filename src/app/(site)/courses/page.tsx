import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Courses & Programs | Bidya Classes – Bhubaneswar',
  description: 'Explore comprehensive academic programs for Classes VII–X, +2 Science (CHSE/CBSE), IIT-JEE Main & Advanced, OUAT entrance, and Olympiad foundations.',
};

export default async function CoursesIndexPage() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      batches: true,
      subjects: true,
    },
    orderBy: { fee: 'asc' },
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            ACADEMIC OFFERINGS 2024–2025
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Courses & Specialized Programs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Choose from our specialized programs designed for school distinctions, +2 science excellence, and premier competitive engineering and agricultural entrances.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 mb-3">
                  Target: {course.targetClass}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Subjects list */}
                {course.subjects.length > 0 && (
                  <div className="mb-6 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Subjects Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.subjects.map((s) => (
                        <span
                          key={s.id}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Academic Fee</span>
                  <div className="text-lg font-black text-slate-900">
                    ₹{course.fee.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-500"> / session</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-center py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/admissions?course=${encodeURIComponent(course.title)}`}
                    className="text-center py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BBSAT Scholarship callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-14">
        <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              BBSAT SCHOLARSHIP 2025
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Avail Up to 100% Scholarship on Course Tuition Fees!
            </h3>
            <p className="text-red-100 text-sm max-w-xl">
              Appear for the Bidya Brilliant Student Aptitude Test (BBSAT) at Ghatikia or Fire Station centres and earn merit scholarships.
            </p>
          </div>
          <Link
            href="/admissions"
            className="flex-shrink-0 bg-white text-red-700 hover:bg-red-50 font-bold px-7 py-3.5 rounded-xl shadow-md transition-all"
          >
            Register for BBSAT &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

