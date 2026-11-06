import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  MonitorPlay,
  ClipboardCheck,
  UserCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Target,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Expert Faculty',
      desc: 'Experienced & Dedicated Mentors from top state and national universities.',
    },
    {
      icon: MonitorPlay,
      title: 'Smart Classrooms',
      desc: 'Modern, air-conditioned learning spaces equipped with digital displays.',
    },
    {
      icon: ClipboardCheck,
      title: 'Regular Assessment',
      desc: 'Weekly topic tests, full-syllabus CBT mock exams & in-depth analytics.',
    },
    {
      icon: UserCheck,
      title: 'Personal Guidance',
      desc: 'One-on-one doubt clearing sessions & personalized performance tracking.',
    },
  ];

  const courses = [
    {
      title: 'Classes VII – X',
      subtitle: 'School Coaching (CBSE | ICSE)',
      desc: 'Deep conceptual foundation in Mathematics, Science, English, and SST for board top ranks.',
      link: '/courses/school-coaching',
      badge: 'Board Excellence',
      accentColor: 'border-red-500/30 hover:border-red-500 bg-red-50/30',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      title: '+2 Science',
      subtitle: 'Classes XI – XII (Physics | Chemistry | Maths | Bio)',
      desc: 'Synchronized CHSE & CBSE board syllabus with early entrance orientation and lab work.',
      link: '/courses/plus-two-science',
      badge: 'CHSE & CBSE',
      accentColor: 'border-blue-500/30 hover:border-blue-500 bg-blue-50/30',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'IIT-JEE Preparation',
      subtitle: 'JEE Main & JEE Advanced',
      desc: '2-Year integrated and 1-Year repeater target programs with extensive problem banks.',
      link: '/courses/iit-jee',
      badge: 'Top Engineering',
      accentColor: 'border-amber-500/30 hover:border-amber-500 bg-amber-50/30',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'OUAT Entrance',
      subtitle: 'Agricultural & Allied Courses',
      desc: 'Odisha’s most proven and trusted specialized coaching for OUAT entrance examinations.',
      link: '/courses/ouat',
      badge: 'Specialized Track',
      accentColor: 'border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/30',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'KVPY / Olympiad',
      subtitle: 'National Level Talent Contests',
      desc: 'In-depth analytical grooming for NSO, IMO, NTSE, and Kishore Vaigyanik Protsahan Yojana.',
      link: '/courses/kvpy-foundation',
      badge: 'Talent & Olympiad',
      accentColor: 'border-purple-500/30 hover:border-purple-500 bg-purple-50/30',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Foundation Program',
      subtitle: 'Early Competitive Edge (VII–X)',
      desc: 'Early nurturing of problem-solving stamina, mental aptitude, and logical reasoning.',
      link: '/courses/foundation',
      badge: 'Early Prep',
      accentColor: 'border-indigo-500/30 hover:border-indigo-500 bg-indigo-50/30',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
  ];

  const toppers = [
    {
      name: 'Shivani Samal',
      score: '98.6%',
      class: 'Class X (CBSE)',
      school: 'Vikash Residential School, Khandagiri',
      year: '2023',
    },
    {
      name: 'Priyanka Hota',
      score: '96.0%',
      class: 'Class XII (Science)',
      school: 'St. Xavier, Khandagiri',
      year: '2023',
    },
    {
      name: 'Udbhas Kundu',
      score: '95.4%',
      class: 'Class X (CBSE)',
      school: 'Vikash Residential School, Khandagiri',
      year: '2023',
    },
    {
      name: 'Shirshak Acharjya',
      score: '96.0%',
      class: 'Class XII (Science)',
      school: 'DAV Public School, Kalinga Nagar',
      year: '2023',
    },
    {
      name: 'Rohan Das',
      score: 'AIR 452',
      class: 'IIT-JEE Advanced',
      school: 'Bidya Classes Fire Station Campus',
      year: '2024',
    },
    {
      name: 'Sneha Patnaik',
      score: 'Rank 35',
      class: 'OUAT Entrance',
      school: 'Bidya Classes Ghatikia Campus',
      year: '2024',
    },
  ];

  const whyChooseUs = [
    { title: 'Result-Oriented Learning', desc: 'Curriculum structured specifically to maximize scoring in both board and competitive entrance formats.' },
    { title: 'Experienced Faculty', desc: 'Subject matter specialists hailing from premier universities with decades of proven teaching mastery.' },
    { title: 'Concept-Based Teaching', desc: 'Emphasis on core principles, intuitive derivations, and practical understanding rather than rote memorization.' },
    { title: 'Regular Tests & Analysis', desc: 'Weekly OMR and computer-based mock tests with micro-level error analysis and time management drills.' },
    { title: 'Individual Attention', desc: 'Small batch sizes of 30-35 students ensuring personalized mentor check-ins and dedicated doubt sessions.' },
    { title: 'Proven Track Record', desc: 'Over a decade of producing 98%+ board scorers, JEE Advanced qualifiers, and state OUAT toppers.' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-700 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                WELCOME TO BIDYA CLASSES
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Build a Strong Academic Foundation for a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 underline decoration-red-300 decoration-wavy decoration-2">
                  Brighter Future
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Expert guidance for School (Classes VII–X), +2 Science & Competitive Examinations (IIT-JEE, OUAT, Olympiads) with a disciplined, result-driven methodology in Bhubaneswar, Odisha.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/admissions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-3.5 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
                >
                  <span>Book Free Demo Class</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Small Batches (Max 35)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ghatikia & Fire Station Campuses
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  98.6% Highest Board Score
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-xl opacity-20 transform -rotate-1"></div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white">
                  <div className="aspect-[4/3] sm:aspect-[16/11] relative bg-slate-900">
                    <Image
                      src="/images/hero-students-banner.jpg"
                      alt="Bidya Classes Students and Faculty"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-red-600 text-[11px] font-bold uppercase tracking-wider mb-1">
                        Bhubaneswar, Odisha
                      </span>
                      <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm">
                        Inspiring Minds, Shaping Careers & Building Confidence
                      </h3>
                      <p className="text-xs text-slate-300">
                        Join our 2024–25 sessions at Ghatikia & Fire Station Centres
                      </p>
                    </div>
                  </div>

                  {/* Banner Sub-Bar */}
                  <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-t border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
                        BC
                      </div>
                      <div>
                        <div className="text-xs font-bold">Admissions Ongoing</div>
                        <div className="text-[11px] text-slate-400">Classes VII–XII, JEE, OUAT</div>
                      </div>
                    </div>
                    <Link
                      href="/admissions"
                      className="text-xs font-bold text-red-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Enquire <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS ROW */}
      <section className="bg-white py-10 border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-red-200 hover:bg-red-50/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-red-600 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section className="py-16 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              OUR PROGRAMS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Programs for Every Academic Goal
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From school excellence to top competitive entrance tests, our structured and result-oriented curriculum ensures mastery over every core concept.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group ${course.accentColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Bidya Classes</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-3">
                    {course.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {course.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={course.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors"
                  >
                    <span>View Curriculum & Batches</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`/admissions?course=${encodeURIComponent(course.title)}`}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 rounded-lg transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors shadow-sm"
            >
              <span>Explore All Courses & Fee Schedules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. RESULTS & ACHIEVEMENTS */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                OUR RESULTS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Consistent Performance, Year After Year
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Our students continue to achieve remarkable milestones in CBSE, ICSE, CHSE board examinations and state/national competitive rankings.
              </p>
            </div>

            <Link
              href="/results"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md self-start md:self-auto flex-shrink-0"
            >
              <span>View Full Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Real Toppers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toppers.map((topper, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-red-300 hover:shadow-lg transition-all relative overflow-hidden group"
              >
                {/* Score Pill */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  {topper.score}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-800 font-extrabold text-base flex items-center justify-center border-2 border-white shadow-xs">
                    {topper.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-red-700 transition-colors">
                      {topper.name}
                    </h3>
                    <div className="text-xs font-bold text-red-600">{topper.class}</div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{topper.school}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Session: {topper.year}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Top Ranker
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Genuine photo preview strip */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-900">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/toppers-class-10-2023.jpg"
                  alt="Bidya Classes Class X Toppers 2023"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-slate-900 text-white text-xs font-bold text-center">
                Class X Board Toppers 2023 (Shivani Samal 98.6%, Udbhas Kundu 95.4%, Satwik Nayak 92%)
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-900">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/toppers-class-12-2023.jpg"
                  alt="Bidya Classes Class XII Toppers 2023"
                  fill
                  className="object-contain group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="p-3 bg-slate-900 text-white text-xs font-bold text-center">
                Class XII Board Toppers 2023 (Priyanka Hota 96%, Shirshak Acharjya 96%, Devarpita Rout 96%)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANAGING DIRECTOR'S MESSAGE */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* MD Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
                <Image
                  src="/images/md-bidyasagar-parida.jpg"
                  alt="Bidyasagar Parida - Managing Director, Bidya Classes"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center mt-4 space-y-1">
                <h4 className="text-lg font-extrabold text-white">Bidyasagar Parida</h4>
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Managing Director & Founder
                </p>
                <p className="text-[11px] text-slate-400">
                  M.Sc. (Mathematics), B.Ed., M.Tech. (Applied Mathematics)
                </p>
              </div>
            </div>

            {/* MD Message Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                DIRECTOR’S PERSPECTIVE
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empowering Aspirations Through Academic Rigor & Personalized Mentorship
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white">Greetings and a warm welcome to Bidya Classes!</strong> At the outset, I extend my heartfelt gratitude to the thousands of parents and students who have placed their unyielding trust in our academic vision over the past decade.
                </p>

                <p>
                  At Bidya Classes, our goal goes far beyond mere textbook syllabus coverage. We aspire to nurture young minds to excel in critical thought, academic discipline, and resilient problem-solving. While we deeply recognize that the final outcome rests in the hands of the student&apos;s diligent efforts, it is the <span className="text-red-400 font-semibold">passionate teacher</span> who illuminates the path, dismantles conceptual roadblocks, and unlocks a student&apos;s true potential.
                </p>

                <p>
                  As an educator in applied mathematics, I take personal interest in every classroom curriculum and test series to ensure that our methodology remains intellectually stimulating and outcome-driven. Our faculty members, drawn from premier universities and institutions, possess the real-world experience and pedagogical mastery needed to guide students through the most demanding board and entrance benchmarks.
                </p>

                <p>
                  On behalf of the entire Bidya Classes family, I welcome you to experience an inspiring blend of conceptual clarity, regular evaluation, and dedicated mentorship.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-400 border-t border-slate-800">
                <div>
                  <span className="block text-xl font-black text-white">10+ Years</span>
                  <span>Guiding State Toppers</span>
                </div>
                <div>
                  <span className="block text-xl font-black text-white">5,000+</span>
                  <span>Learners Mentored</span>
                </div>
                <div>
                  <span className="block text-xl font-black text-white">2 Campuses</span>
                  <span>Ghatikia & Fire Station</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY BIDYA CLASSES */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              WHY BIDYA CLASSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Students & Parents Trust Us
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A holistic ecosystem engineered to turn academic potential into demonstrable rank-holding achievement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-red-300 hover:shadow-md transition-all space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 font-black text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-14 bg-gradient-to-r from-red-700 via-red-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-red-600/40">
              <div className="p-3">
                <div className="text-3xl sm:text-4xl font-black">2000+</div>
                <div className="text-xs sm:text-sm text-red-100 mt-1 font-medium">Students Trained</div>
              </div>
              <div className="p-3">
                <div className="text-3xl sm:text-4xl font-black">500+</div>
                <div className="text-xs sm:text-sm text-red-100 mt-1 font-medium">Top Performers</div>
              </div>
              <div className="p-3">
                <div className="text-3xl sm:text-4xl font-black">10+</div>
                <div className="text-xs sm:text-sm text-red-100 mt-1 font-medium">Years of Excellence</div>
              </div>
              <div className="p-3">
                <div className="text-3xl sm:text-4xl font-black">2</div>
                <div className="text-xs sm:text-sm text-red-100 mt-1 font-medium">Campuses in Bhubaneswar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISIT OUR LEARNING CENTRES */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              OUR LEARNING CENTRES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visit Our Campuses in Bhubaneswar
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Centrally located smart learning facilities equipped for focused academics, library study, and regular doubt clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ghatikia Branch */}
            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white to-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                  Main Campus & Head Office
                </span>
                <span className="text-xs text-slate-500 font-semibold">Bhubaneswar West</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Ghatikia Branch</h3>
                <p className="text-sm text-slate-600 mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  Near Apeejay School & Durga Mandap, Khandagiri-Chandaka Road, Ghatikia, Bhubaneswar – 751029
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-sm font-semibold">
                <a
                  href="tel:+917978781801"
                  className="flex items-center gap-1.5 text-red-600 hover:text-red-700"
                >
                  <Phone className="w-4 h-4" /> +91 79787 81801
                </a>
                <a
                  href="mailto:info@bidyaclasses.com"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  <Mail className="w-4 h-4" /> info@bidyaclasses.com
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Classes VII–XII, OUAT & Foundation</span>
                <Link
                  href="/admissions?branch=Ghatikia"
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Register at Ghatikia &rarr;
                </Link>
              </div>
            </div>

            {/* Fire Station Branch */}
            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-gradient-to-b from-white to-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                  IIT-JEE & High School Campus
                </span>
                <span className="text-xs text-slate-500 font-semibold">Bhubaneswar Central</span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Fire Station Branch</h3>
                <p className="text-sm text-slate-600 mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  M-22, Fire Station Area, Behind PGL Honda, Baramunda, Bhubaneswar, Odisha
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-sm font-semibold">
                <a
                  href="tel:+919776654605"
                  className="flex items-center gap-1.5 text-red-600 hover:text-red-700"
                >
                  <Phone className="w-4 h-4" /> +91 97766 54605
                </a>
                <a
                  href="tel:+919776280828"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                >
                  <Phone className="w-4 h-4" /> +91 97762 80828
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">IIT-JEE Pinnacle, Science & Bridge</span>
                <Link
                  href="/admissions?branch=Fire+Station"
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Register at Fire Station &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSION CTA BANNER */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                Enrollment Open for 2024–2025 Sessions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Secure Your Seat in Bhubaneswar&apos;s Most Trusted Coaching Academy
              </h2>
              <p className="text-sm text-red-100 max-w-2xl">
                Limited seats per batch to preserve individual mentor attention. Scholarship benefits available through BBSAT.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-red-700 hover:bg-red-50 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+917978781801"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-900/60 hover:bg-red-900 text-white font-bold text-sm px-6 py-4 rounded-xl border border-red-400/40 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 79787 81801</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

