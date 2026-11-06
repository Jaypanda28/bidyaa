import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Institute Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg border border-slate-700 w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Bidya Classes"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Bidya <span className="text-red-500">Classes</span>
                </span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  School | +2 Science | IIT-JEE | Foundation
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Bhubaneswar’s premier educational academy fostering academic excellence in School Coaching (Classes VII–X), +2 Science, IIT-JEE (Main & Advanced), and OUAT preparation through conceptual clarity and individual mentorship.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/60 text-red-400 border border-red-800/40 rounded-full text-xs font-semibold">
                <Award className="w-3.5 h-3.5" /> 10+ Years of Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2,000+ Achievers
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-red-600 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> About Bidya Classes
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Faculty & Mentors
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Toppers & Results 2023–25
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Campus & Activity Gallery
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> BBSAT Scholarship Test
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-red-500" /> Admission Enquiry
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-red-400 transition-colors flex items-center gap-1.5 font-medium text-red-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> ERP Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-red-600 pl-3">
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses/school-coaching" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> Classes VII – X (CBSE / ICSE)
                </Link>
              </li>
              <li>
                <Link href="/courses/plus-two-science" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> +2 Science (Physics, Chem, Math, Bio)
                </Link>
              </li>
              <li>
                <Link href="/courses/iit-jee" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> IIT-JEE (Main & Advanced)
                </Link>
              </li>
              <li>
                <Link href="/courses/ouat" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> OUAT Entrance Preparation
                </Link>
              </li>
              <li>
                <Link href="/courses/kvpy-foundation" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> KVPY & Olympiad Training
                </Link>
              </li>
              <li>
                <Link href="/courses/foundation" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-slate-500" /> Early IIT / Foundation (VII–X)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Bhubaneswar Branches */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-red-600 pl-3">
              Our Bhubaneswar Branches
            </h4>

            {/* Ghatikia Branch */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> Ghatikia Branch (Main Campus)
              </span>
              <p className="text-xs text-slate-400">
                Near Apeejay School & Durga Mandap, Khandagiri-Chandaka Road, Ghatikia, Bhubaneswar – 751029
              </p>
              <a
                href="tel:+917978781801"
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 pt-1"
              >
                <Phone className="w-3 h-3" /> +91 79787 81801
              </a>
            </div>

            {/* Fire Station Branch */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> Fire Station Branch
              </span>
              <p className="text-xs text-slate-400">
                M-22, Fire Station Area, Behind PGL Honda, Baramunda, Bhubaneswar, Odisha
              </p>
              <a
                href="tel:+919776654605"
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 pt-1"
              >
                <Phone className="w-3 h-3" /> +91 97766 54605
              </a>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Office Hours: Mon–Sun 8:00 AM – 8:30 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bidya Classes, Bhubaneswar. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-400">Terms of Admission</Link>
            <Link href="/contact" className="hover:text-slate-400">Helpdesk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

