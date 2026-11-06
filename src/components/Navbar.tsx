'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  User,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isCurrent = (path: string) => pathname === path;

  const courses = [
    { name: 'School Coaching (Classes VII – X)', href: '/courses/school-coaching', desc: 'CBSE & ICSE Board Excellence' },
    { name: '+2 Science (Classes XI – XII)', href: '/courses/plus-two-science', desc: 'CHSE & CBSE Physics, Chem, Math, Bio' },
    { name: 'IIT-JEE (Main & Advanced)', href: '/courses/iit-jee', desc: 'Comprehensive Engineering Prep' },
    { name: 'OUAT Entrance Coaching', href: '/courses/ouat', desc: 'Agricultural & Allied Sciences' },
    { name: 'KVPY / Foundation', href: '/courses/kvpy-foundation', desc: 'Early IIT & Competitive Foundations' },
    { name: 'Olympiad Preparation', href: '/courses/olympiad', desc: 'NSO, IMO, NTSE & Talent Contests' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 md:space-x-6 flex-wrap">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              Bhubaneswar, Odisha
            </span>
            <a
              href="tel:+917978781801"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              +91 79787 81801
            </a>
            <a
              href="mailto:info@bidyaclasses.com"
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-500" />
              info@bidyaclasses.com
            </a>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-5 ml-auto">
            <Link
              href="/login?role=STUDENT"
              className="flex items-center gap-1 text-slate-300 hover:text-red-400 font-medium transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              <span>Student Login</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href="/login?role=PARENT"
              className="flex items-center gap-1 text-slate-300 hover:text-red-400 font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5 text-red-400" />
              <span>Parent Login</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ERP Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex-shrink-0 bg-white p-1 rounded-lg border border-slate-200/80 shadow-xs group-hover:shadow-sm transition-all">
            <Image
              src="/images/logo.png"
              alt="Bidya Classes Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
              Bidya <span className="text-red-600">Classes</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              SCHOOL | +2 SCIENCE | IIT-JEE | FOUNDATION
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/about') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            About Us
          </Link>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesDropdownOpen(true)}
            onMouseLeave={() => setCoursesDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/courses') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <span>Courses</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {coursesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Our Academic Programs
                  </span>
                </div>
                {courses.map((course) => (
                  <Link
                    key={course.href}
                    href={course.href}
                    className="block px-4 py-2.5 hover:bg-red-50/80 transition-colors group"
                    onClick={() => setCoursesDropdownOpen(false)}
                  >
                    <div className="font-semibold text-slate-800 text-sm group-hover:text-red-700">
                      {course.name}
                    </div>
                    <div className="text-xs text-slate-500">{course.desc}</div>
                  </Link>
                ))}
                <div className="p-2 border-t border-slate-100">
                  <Link
                    href="/courses"
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => setCoursesDropdownOpen(false)}
                  >
                    <span>View All Programs & Fees</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/faculty"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/faculty') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Faculty
          </Link>

          <Link
            href="/results"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/results') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Results
          </Link>

          <Link
            href="/branches"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/branches') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Branches
          </Link>

          <Link
            href="/gallery"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/gallery') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Gallery
          </Link>

          <Link
            href="/announcements"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/announcements') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Notices
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isCurrent('/contact') ? 'text-red-600 font-semibold bg-red-50' : 'hover:text-red-600 hover:bg-slate-50'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admissions"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/admissions"
            className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            Enquiry
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              About Us
            </Link>

            <div className="border-y border-slate-100 py-2 my-1">
              <span className="text-xs uppercase font-bold text-slate-400 px-3 tracking-wider">
                Courses & Programs
              </span>
              {courses.map((course) => (
                <Link
                  key={course.href}
                  href={course.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  {course.name}
                </Link>
              ))}
            </div>

            <Link
              href="/faculty"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Faculty & Mentors
            </Link>
            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Results & Achievements
            </Link>
            <Link
              href="/branches"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Branches & Locations
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Photo Gallery
            </Link>
            <Link
              href="/announcements"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Announcements & BBSAT
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-semibold hover:bg-red-50"
            >
              Contact Us
            </Link>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-red-600 text-white font-semibold py-2.5 rounded-lg shadow-sm"
              >
                Admission Enquiry Form
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-slate-900 text-white font-semibold py-2.5 rounded-lg"
              >
                ERP Login (Student / Parent / Staff)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

