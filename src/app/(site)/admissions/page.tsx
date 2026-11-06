'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

function AdmissionsContent() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  const initialBranch = searchParams.get('branch') || '';

  const [activeTab, setActiveTab] = useState<'enquiry' | 'formal'>('enquiry');

  // Quick Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    courseOfInterest: initialCourse || 'Classes VII - X (School Coaching CBSE & ICSE)',
    branch: initialBranch.includes('Fire') ? 'Fire Station' : 'Ghatikia',
    currentClass: 'Class X',
    schoolName: '',
    message: '',
  });

  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState<string | null>(null);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  // Formal Admission Form State
  const [formalForm, setFormalForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    address: '',
    targetCourse: initialCourse || 'Classes VII - X (School Coaching CBSE & ICSE)',
    branch: initialBranch.includes('Fire') ? 'Fire Station Branch' : 'Ghatikia Branch',
    currentClass: 'Class X',
    previousSchool: '',
    board: 'CBSE',
    lastExamScore: '',
    scholarshipOptIn: true,
  });

  const [formalSubmitting, setFormalSubmitting] = useState(false);
  const [formalSuccess, setFormalSuccess] = useState<{
    appNum: string;
    studentName: string;
    course: string;
  } | null>(null);
  const [formalError, setFormalError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCourse) {
      setEnquiryForm((prev) => ({ ...prev, courseOfInterest: initialCourse }));
      setFormalForm((prev) => ({ ...prev, targetCourse: initialCourse }));
    }
  }, [initialCourse]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitting(true);
    setEnquiryError(null);
    setEnquirySuccess(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
      setEnquirySuccess(data.message);
      setEnquiryForm({
        name: '',
        email: '',
        phone: '',
        courseOfInterest: 'Classes VII - X (School Coaching CBSE & ICSE)',
        branch: 'Ghatikia',
        currentClass: 'Class X',
        schoolName: '',
        message: '',
      });
    } catch (err: any) {
      setEnquiryError(err.message || 'An unexpected error occurred.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const handleFormalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormalSubmitting(true);
    setFormalError(null);
    setFormalSuccess(null);

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formalForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register application');
      setFormalSuccess({
        appNum: data.applicationNumber,
        studentName: formalForm.studentName,
        course: formalForm.targetCourse,
      });
    } catch (err: any) {
      setFormalError(err.message || 'An unexpected error occurred.');
    } finally {
      setFormalSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            ONLINE ADMISSION & ENQUIRY PORTAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Begin Your Academic Journey at Bidya Classes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Book a free diagnostic trial class or submit your formal admission application online for the 2024–2025 academic session.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveTab('enquiry')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'enquiry'
                    ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Quick Enquiry & Free Demo Class</span>
              </button>

              <button
                onClick={() => setActiveTab('formal')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'formal'
                    ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Formal Admission Application</span>
              </button>
            </div>

            {/* TAB 1: QUICK ENQUIRY */}
            {activeTab === 'enquiry' && (
              <div>
                {enquirySuccess ? (
                  <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in">
                    <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Enquiry Submitted Successfully!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you for your interest in Bidya Classes. Our academic counselor will call you within 2 business hours to confirm your free demo class slot and syllabus materials.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setEnquirySuccess(null)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    {enquiryError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{enquiryError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Student Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          placeholder="e.g. Ayush Kumar Panda"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Parent / Student Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          placeholder="e.g. 94370 12345"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          placeholder="name@gmail.com"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Current Class / Standard
                        </label>
                        <select
                          value={enquiryForm.currentClass}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, currentClass: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Class VII">Class VII</option>
                          <option value="Class VIII">Class VIII</option>
                          <option value="Class IX">Class IX</option>
                          <option value="Class X">Class X</option>
                          <option value="Class XI (+2 Science 1st Year)">Class XI (+2 Science 1st Year)</option>
                          <option value="Class XII (+2 Science 2nd Year)">Class XII (+2 Science 2nd Year)</option>
                          <option value="12th Passed / Repeater Target">12th Passed / Repeater Target</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Program / Course of Interest <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={enquiryForm.courseOfInterest}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, courseOfInterest: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Classes VII - X (School Coaching CBSE & ICSE)">Classes VII – X (School Coaching CBSE & ICSE)</option>
                          <option value="+2 Science (Classes XI – XII Physics, Chem, Math, Bio)">+2 Science (Classes XI – XII Physics, Chem, Math, Bio)</option>
                          <option value="IIT-JEE (JEE Main & Advanced) Comprehensive">IIT-JEE (JEE Main & Advanced) Comprehensive</option>
                          <option value="OUAT Entrance Coaching (Agri & Allied)">OUAT Entrance Coaching (Agri & Allied)</option>
                          <option value="KVPY / Olympiad / NTSE Training">KVPY / Olympiad / NTSE Training</option>
                          <option value="Foundation Course (Early IIT / Medical Prep)">Foundation Course (Early IIT / Medical Prep)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Learning Centre
                        </label>
                        <select
                          value={enquiryForm.branch}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, branch: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Ghatikia">Ghatikia Branch (Near Apeejay School & Durga Mandap)</option>
                          <option value="Fire Station">Fire Station Branch (M-22, Baramunda Area)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current School Name & Location
                      </label>
                      <input
                        type="text"
                        value={enquiryForm.schoolName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, schoolName: e.target.value })}
                        placeholder="e.g. DAV Public School, Kalinga Nagar / Vikash Khandagiri"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specific Questions or Academic Goals
                      </label>
                      <textarea
                        rows={3}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        placeholder="e.g. Interested in morning batch timings, test schedule, or BBSAT scholarship eligibility..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                    >
                      {enquirySubmitting ? (
                        <span>Submitting to Admissions Desk...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry & Book Free Demo Class</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: FORMAL ADMISSION APPLICATION */}
            {activeTab === 'formal' && (
              <div>
                {formalSuccess ? (
                  <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in">
                    <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Application Registered!</h3>
                    <div className="inline-block px-4 py-2 bg-white rounded-xl border border-emerald-300 text-slate-900 font-mono font-bold text-base shadow-xs">
                      Application No: <span className="text-red-600">{formalSuccess.appNum}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Dear <strong>{formalSuccess.studentName}</strong>, your application for <strong>{formalSuccess.course}</strong> has been logged in the Bidya Classes Student ERP. Please visit the branch with your mark sheet and 2 passport photos for batch allotment.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                      >
                        Print Confirmation
                      </button>
                      <button
                        onClick={() => setFormalSuccess(null)}
                        className="bg-white border border-slate-300 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50"
                      >
                        New Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormalSubmit} className="space-y-4">
                    {formalError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{formalError}</span>
                      </div>
                    )}

                    <div className="text-xs font-bold text-red-600 uppercase tracking-wider pb-1 border-b border-slate-100">
                      1. Student Identity & Contact
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Student Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formalForm.studentName}
                          onChange={(e) => setFormalForm({ ...formalForm, studentName: e.target.value })}
                          placeholder="As per school certificate"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={formalForm.gender}
                          onChange={(e) => setFormalForm({ ...formalForm, gender: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Student Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formalForm.phone}
                          onChange={(e) => setFormalForm({ ...formalForm, phone: e.target.value })}
                          placeholder="10-digit number"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formalForm.dob}
                          onChange={(e) => setFormalForm({ ...formalForm, dob: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="text-xs font-bold text-red-600 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">
                      2. Parent / Guardian Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Father / Guardian Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formalForm.fatherName}
                          onChange={(e) => setFormalForm({ ...formalForm, fatherName: e.target.value })}
                          placeholder="Parent full name"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Father / Guardian Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formalForm.fatherPhone}
                          onChange={(e) => setFormalForm({ ...formalForm, fatherPhone: e.target.value })}
                          placeholder="For SMS & attendance updates"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Residential Address in Bhubaneswar / Odisha
                      </label>
                      <input
                        type="text"
                        value={formalForm.address}
                        onChange={(e) => setFormalForm({ ...formalForm, address: e.target.value })}
                        placeholder="Plot / House number, Colony, Area, Pin code"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                      />
                    </div>

                    <div className="text-xs font-bold text-red-600 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">
                      3. Academic Course & Background
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Target Academic Course <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formalForm.targetCourse}
                          onChange={(e) => setFormalForm({ ...formalForm, targetCourse: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Classes VII - X (School Coaching CBSE & ICSE)">Classes VII – X (School Coaching)</option>
                          <option value="+2 Science (Classes XI – XII Physics, Chem, Math, Bio)">+2 Science (XI – XII)</option>
                          <option value="IIT-JEE (JEE Main & Advanced) Comprehensive">IIT-JEE Pinnacle Program</option>
                          <option value="OUAT Entrance Coaching (Agri & Allied)">OUAT Entrance Coaching</option>
                          <option value="KVPY / Olympiad / NTSE Training">KVPY / Olympiad</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Branch Allocation
                        </label>
                        <select
                          value={formalForm.branch}
                          onChange={(e) => setFormalForm({ ...formalForm, branch: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="Ghatikia Branch">Ghatikia Branch (Near Apeejay School)</option>
                          <option value="Fire Station Branch">Fire Station Branch (Baramunda)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Previous School
                        </label>
                        <input
                          type="text"
                          value={formalForm.previousSchool}
                          onChange={(e) => setFormalForm({ ...formalForm, previousSchool: e.target.value })}
                          placeholder="e.g. DAV / Vikash / Sai"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          School Board
                        </label>
                        <select
                          value={formalForm.board}
                          onChange={(e) => setFormalForm({ ...formalForm, board: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        >
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="CHSE Odisha">CHSE Odisha</option>
                          <option value="BSE Odisha">BSE Odisha</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Last Exam Percentage
                        </label>
                        <input
                          type="text"
                          value={formalForm.lastExamScore}
                          onChange={(e) => setFormalForm({ ...formalForm, lastExamScore: e.target.value })}
                          placeholder="e.g. 94.2%"
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="scholarshipOptIn"
                        checked={formalForm.scholarshipOptIn}
                        onChange={(e) => setFormalForm({ ...formalForm, scholarshipOptIn: e.target.checked })}
                        className="w-4 h-4 text-red-600 rounded"
                      />
                      <label htmlFor="scholarshipOptIn" className="text-xs text-slate-700 font-medium">
                        Consider me for BBSAT 2025 Merit-based Tuition Scholarship (Up to 100% waiver).
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formalSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                    >
                      {formalSubmitting ? (
                        <span>Registering Application & Generating Student ID...</span>
                      ) : (
                        <>
                          <span>Register Application & Generate Token</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Help Desk Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Dial Helpdesk */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md space-y-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                ADMISSION COUNSELING HELPLINE
              </span>
              <h3 className="text-xl font-black">Speak to Our Admission Dean</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need guidance choosing between ICSE/CBSE integrated streams or IIT-JEE batches? Call our counseling desk directly.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="tel:+917978781801"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-red-500 transition-colors"
                >
                  <Phone className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-xs text-slate-400">Ghatikia Campus Desk</div>
                    <div className="text-sm font-bold text-white">+91 79787 81801</div>
                  </div>
                </a>

                <a
                  href="tel:+919776654605"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-red-500 transition-colors"
                >
                  <Phone className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-xs text-slate-400">Fire Station Campus Desk</div>
                    <div className="text-sm font-bold text-white">+91 97766 54605</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Admission Checklist */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Document Checklist for In-Person Visit:</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Copy of previous school mark sheet / report card</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>2 Passport-size student photographs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Aadhaar Card copy of student & guardian</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8 text-slate-500 text-sm">Loading admissions portal...</div>}>
      <AdmissionsContent />
    </Suspense>
  );
}
