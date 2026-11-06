'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseOfInterest: 'General Enquiry',
    branch: 'Ghatikia',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSuccess('Your message has been sent to our administration team! We will get back to you promptly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseOfInterest: 'General Enquiry',
        branch: 'Ghatikia',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Phone className="w-3.5 h-3.5" />
            CONNECT WITH US
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact Bidya Classes, Bhubaneswar
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Have questions about course admissions, fee structures, batch schedules, or demo classes? Reach out to our campus desks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Branch Details Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Ghatikia Branch */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                  Main Campus & Head Office
                </span>
                <span className="text-xs text-slate-400 font-semibold">Ghatikia</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Ghatikia Branch</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Near Apeejay School & Durga Mandap, Khandagiri-Chandaka Road, Ghatikia, Bhubaneswar – 751029
                  </span>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-red-600" />
                  <a href="tel:+917978781801" className="font-bold hover:text-red-600">
                    +91 79787 81801
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-red-600" />
                  <a href="mailto:info@bidyaclasses.com" className="font-medium hover:text-red-600">
                    info@bidyaclasses.com / ghatikia@bidyaclasses.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500 pt-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Mon – Sun: 8:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>

            {/* Fire Station Branch */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                  Specialized Entrance Wing
                </span>
                <span className="text-xs text-slate-400 font-semibold">Baramunda</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Fire Station Branch</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    M-22, Fire Station Area, Behind PGL Honda, Baramunda, Bhubaneswar, Odisha
                  </span>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-red-600" />
                  <a href="tel:+919776654605" className="font-bold hover:text-red-600">
                    +91 97766 54605
                  </a>
                  <span className="text-slate-300">/</span>
                  <a href="tel:+919776280828" className="font-bold hover:text-red-600">
                    +91 97762 80828
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-red-600" />
                  <a href="mailto:firestation@bidyaclasses.com" className="font-medium hover:text-red-600">
                    firestation@bidyaclasses.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500 pt-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Mon – Sun: 8:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Quick Connect */}
            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">Direct WhatsApp Helpline</h4>
                <p className="text-xs text-emerald-100 mt-0.5">Instant response for seat status and fee queries.</p>
              </div>
              <a
                href="https://wa.me/917978781801?text=Hello%20Bidya%20Classes,%20I%20would%20like%20to%20connect%20regarding%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat Now
              </a>
            </div>
          </div>

          {/* Interactive Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Send an Instant Message</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Our campus administration replies to all web enquiries within 2 hours during working hours.
            </p>

            {success ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
                <p className="text-xs sm:text-sm text-slate-600">{success}</p>
                <button
                  onClick={() => setSuccess(null)}
                  className="bg-emerald-600 text-white text-xs font-bold px-5 py-2 rounded-xl mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra Das"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit phone number"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="youremail@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                    >
                      <option value="Ghatikia">Ghatikia Branch (Near Apeejay School)</option>
                      <option value="Fire Station">Fire Station Branch (Baramunda)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course of Interest
                  </label>
                  <select
                    value={formData.courseOfInterest}
                    onChange={(e) => setFormData({ ...formData, courseOfInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                  >
                    <option value="General Enquiry">General Academic Query</option>
                    <option value="School Coaching (Classes VII – X)">School Coaching (Classes VII – X CBSE/ICSE)</option>
                    <option value="+2 Science (Classes XI – XII)">+2 Science (Classes XI – XII CHSE/CBSE)</option>
                    <option value="IIT-JEE Preparation">IIT-JEE (Main & Advanced)</option>
                    <option value="OUAT Entrance Preparation">OUAT Entrance Preparation</option>
                    <option value="KVPY / Olympiad / Foundation">KVPY / Olympiad / Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the student's current class, school, and what assistance you require..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Sending message to Desk...</span>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

