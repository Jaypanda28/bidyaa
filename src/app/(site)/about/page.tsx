import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Target,
  Compass,
  CheckCircle,
  Award,
  Users,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Bidya Classes – Bhubaneswar, Odisha',
  description: 'Learn about Bidya Classes, our founder Bidyasagar Parida, academic philosophy, experienced faculty, and learning infrastructure across Bhubaneswar.',
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Concept-First Pedagogy',
      desc: 'We reject mindless rote learning. Every scientific formula and mathematical theorem is derived from fundamental axioms with real-world intuition.',
    },
    {
      title: 'Strict Batch Limits (Max 35)',
      desc: 'Unlike crowded coaching factories, we restrict classrooms to 35 students so our faculty know each student’s strengths, gaps, and daily homework status.',
    },
    {
      title: 'Integrated Board & Entrance Matrix',
      desc: 'Seamlessly bridging the state CHSE / CBSE syllabus with high-stakes competitive benchmarks like JEE Main/Advanced, OUAT, and National Olympiads.',
    },
    {
      title: 'Parental Transparency & Feedback',
      desc: 'Bi-weekly test scorecards, automated attendance alerts, and structured Parent-Teacher Meets (PTMs) keep guardians intimately involved.',
    },
  ];

  const milestones = [
    { year: '2014', title: 'Foundation of Bidya Classes', desc: 'Started with an initial batch of 25 dedicated students aiming for board distinctions.' },
    { year: '2017', title: 'Ghatikia Campus Expansion', desc: 'Inaugurated our flagship smart learning centre near Apeejay School with modern digital classrooms.' },
    { year: '2020', title: 'Integrated Hybrid LMS & CBT System', desc: 'Introduced in-house online testing and recorded lecture repositories for continuous learning.' },
    { year: '2022', title: 'Fire Station Branch Launch', desc: 'Expanded to Baramunda Fire Station area to cater to the growing demand for IIT-JEE Pinnacle batches.' },
    { year: '2023–24', title: 'Historic 98.6% Board Peak & Top OUAT Ranks', desc: 'Celebrated multiple state board top percentiles and 500+ successful admissions into engineering & agriculture.' },
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              OUR HERITAGE & MISSION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              A Decade of Inspiring Academic Excellence in Bhubaneswar
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Established with an unyielding commitment to disciplined learning, Bidya Classes has grown to become Odisha’s premier destination for School Foundations, +2 Science, and Competitive Entrance Preparation.
            </p>
          </div>
        </div>
      </section>

      {/* Managing Director Message Section */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <Image
                  src="/images/md-bidyasagar-parida.jpg"
                  alt="Bidyasagar Parida - Managing Director"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center mt-4 space-y-0.5">
                <h3 className="text-xl font-bold text-slate-900">Bidyasagar Parida</h3>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Managing Director & Founder
                </p>
                <p className="text-xs text-slate-500">
                  M.Sc. (Mathematics), B.Ed., M.Tech. (Applied Mathematics)
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Leadership Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                “Quality Education is Not Merely Syllabus Coverage; It is Awakening the Will to Excel.”
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Welcome to Bidya Classes. Over the past decade, my colleagues and I have dedicated our lives to creating an academic environment where every student, regardless of their starting point, discovers the confidence to conquer tough examinations.
                </p>
                <p>
                  As an educator in applied mathematics, I have always believed that mathematics and science should never be feared. When concepts are taught with passion, visual analogies, and methodical derivations, complex subjects become genuinely joyful. We take deep personal interest in the academic trajectory of every enrolled child.
                </p>
                <p>
                  Our faculty team comprises seasoned educators hailing from reputed universities who understand what it takes to crack these demanding exams. We welcome parents and students to join the Bidya Classes community and experience our blend of innovation, warmth, and academic discipline.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  • Direct Mentor Interaction
                </span>
                <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  • 100% Syllabus Mastery
                </span>
                <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  • Zero Compromise on Ethics
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To be eastern India’s most trusted center of foundational learning, recognized for empowering every student with the intellectual prowess, moral integrity, and analytical resilience required to lead in scientific, technological, and medical disciplines.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver concept-driven, affordable, and accessible education through dedicated subject masters, small-batch mentoring, rigorous regular assessments, and state-of-the-art digital infrastructure that leaves no student behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Pillars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              OUR TEACHING FOUNDATION
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Four Pillars of the Bidya Methodology
            </h2>
            <p className="text-sm text-slate-600">
              How our students consistently surpass state and national performance medians.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-red-300 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="text-red-600 font-extrabold text-lg">0{idx + 1}.</div>
                <h4 className="font-bold text-slate-900 text-base">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              A DECADE OF GROWTH
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Milestones in Our Academic Journey
            </h2>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex items-start gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-red-600 flex items-center justify-center font-black text-red-600 text-sm shadow-sm flex-shrink-0 z-10 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {m.year}
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex-1">
                  <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Join Bidya Classes Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

