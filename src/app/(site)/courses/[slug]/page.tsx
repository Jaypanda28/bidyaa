import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Users,
  MapPin,
  ArrowRight,
  ShieldCheck,
  FileText,
  HelpCircle,
} from 'lucide-react';
import prisma from '@/lib/prisma';

interface Props {
  params: { slug: string };
}

function resolveSlug(slug: string): string {
  if (slug === 'olympiad') return 'kvpy-foundation';
  if (slug === 'kvpy') return 'kvpy-foundation';
  return slug;
}

export async function generateMetadata({ params }: Props) {
  const targetSlug = resolveSlug(params.slug);
  const course = await prisma.course.findFirst({
    where: {
      OR: [
        { slug: targetSlug },
        { slug: { contains: params.slug } },
        { category: { contains: params.slug } },
      ],
    },
  });

  if (!course) return { title: 'Course Not Found | Bidya Classes' };

  return {
    title: `${course.title} | Bidya Classes Bhubaneswar`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const targetSlug = resolveSlug(params.slug);
  let course = await prisma.course.findUnique({
    where: { slug: targetSlug },
    include: {
      batches: {
        include: {
          faculty: { include: { user: true } },
          branch: true,
        },
      },
      subjects: true,
      studyMaterials: true,
      videoLectures: true,
      feeStructures: true,
    },
  });

  if (!course) {
    course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: { contains: params.slug } },
          { category: { contains: params.slug } },
        ],
      },
      include: {
        batches: {
          include: {
            faculty: { include: { user: true } },
            branch: true,
          },
        },
        subjects: true,
        studyMaterials: true,
        videoLectures: true,
        feeStructures: true,
      },
    });
  }

  if (!course) {
    notFound();
  }

  // Course specific highlights
  const features = [
    'Daily 2 to 3.5 hours structured concept sessions & problem-solving drill',
    'Curated Bidya Classes study material with NCERT/Exemplar mapping & past 10-year archives',
    'Bi-weekly OMR / Computer-Based mock tests with automated ranking',
    'Individual mentor allocations with dedicated 1-on-1 doubt solving windows',
    'Detailed parent progress reports dispatched bi-weekly via ERP & SMS',
    'AC Smart Classrooms with digital interactive displays & high-speed Wi-Fi',
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Course Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                  Duration: {course.duration}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                  Eligibility: {course.targetClass}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                {course.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Max 35 Students / Batch
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Bhubaneswar (Ghatikia & Fire Station)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  BBSAT Scholarship Eligible
                </span>
              </div>
            </div>

            {/* Quick Enrollment Card */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Tuition Fee
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                ₹{course.fee.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500"> / academic session</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Includes all study modules, mock test series, and LMS access. Easy installment plans available.
              </p>

              <div className="mt-5 space-y-2.5">
                <Link
                  href={`/admissions?course=${encodeURIComponent(course.title)}`}
                  className="w-full text-center block bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm"
                >
                  Apply for Admission
                </Link>
                <a
                  href={`https://wa.me/917978781801?text=${encodeURIComponent(
                    `Hello Bidya Classes, I want to enquire about ${course.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-xs"
                >
                  Chat with Academic Counselor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Course Features, Subjects & Batches */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Features */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" /> Key Features & Pedagogical Methodology
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Subjects Covered */}
            {course.subjects.length > 0 && (
              <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" /> Subjects & Modular Coverage
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {course.subjects.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{s.code}</div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-md text-red-600 border border-slate-200">
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Active Batches */}
            {course.batches.length > 0 && (
              <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" /> Active Batches & Schedules
                </h2>
                <div className="space-y-4 pt-2">
                  {course.batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 hover:border-red-200 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-base text-slate-900">{batch.name}</h4>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {batch.academicYear}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <div>
                          <strong>Branch:</strong> {batch.branch.name}
                        </div>
                        <div>
                          <strong>Schedule:</strong> {batch.schedule}
                        </div>
                        <div>
                          <strong>Classroom:</strong> {batch.roomNumber}
                        </div>
                        {batch.faculty && (
                          <div>
                            <strong>Lead Faculty:</strong> {batch.faculty.user.name}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Admission Enquiry Mini Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
              <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                Enquire for {course.category}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Speak directly with our senior counseling team or schedule a free demo classroom experience.
              </p>

              <form action="/admissions" method="GET" className="space-y-3">
                <input type="hidden" name="course" value={course.title} />

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Student Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit Mobile Number"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Campus</label>
                  <select className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
                    <option value="Ghatikia">Ghatikia Branch (Near Apeejay School)</option>
                    <option value="Fire Station">Fire Station Branch (Baramunda)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm mt-2"
                >
                  Proceed to Full Application &rarr;
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Available at Ghatikia & Fire Station</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Verified Faculty & Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

