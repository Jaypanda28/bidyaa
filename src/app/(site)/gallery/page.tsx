import React from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Sparkles,
  Award,
  BookOpen,
  Users,
  Camera,
} from 'lucide-react';

export const metadata = {
  title: 'Campus & Event Gallery | Bidya Classes – Bhubaneswar',
  description: 'View photos of smart classrooms, science practicals, award ceremonies, and student life at Bidya Classes Bhubaneswar.',
};

export default function GalleryPage() {
  const galleryItems = [
    {
      title: 'Our 2023 Class X Board Toppers Merit Ceremony',
      category: 'Achievements',
      src: '/images/toppers-class-10-2023.jpg',
      caption: 'Celebrating our top scorers who achieved distinctions above 90% and 98.6%.',
    },
    {
      title: 'Senior Secondary (+2 Science) Achievers Showcase',
      category: 'Achievements',
      src: '/images/toppers-class-12-2023.jpg',
      caption: 'Class XII Science batch celebrating stellar marks in CHSE and CBSE examinations.',
    },
    {
      title: 'Interactive Smart Classroom Session',
      category: 'Campus Life',
      src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      caption: 'Faculty explaining 3D physical coordinate geometries using digital whiteboards.',
    },
    {
      title: 'Managing Director & Academic Team Strategy Meet',
      category: 'Leadership',
      src: '/images/md-bidyasagar-parida.jpg',
      caption: 'Prof. Bidyasagar Parida conducting syllabus audit and review meeting.',
    },
    {
      title: 'Intensive Weekend Doubt Clearing Desks',
      category: 'Mentorship',
      src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      caption: 'Students receiving 1-on-1 problem solving support from dedicated subject mentors.',
    },
    {
      title: 'Science Practical Demo & Lab Experience',
      category: 'Labs',
      src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      caption: 'Chemistry demonstration explaining reaction rates and organic qualitative analysis.',
    },
    {
      title: 'Focused Library & Self-Study Reading Hall',
      category: 'Infrastructure',
      src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      caption: 'Quiet, air-conditioned reading halls open 7 days a week for enrolled students.',
    },
    {
      title: 'All-Odisha BBSAT Scholarship Test Day',
      category: 'Events',
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      caption: 'Hundreds of young aspirants appearing for the annual aptitude test.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Camera className="w-3.5 h-3.5" />
            LIFE AT BIDYA CLASSES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Campus, Classrooms & Event Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            A glimpse into the vibrant learning culture, state-of-the-art facilities, and celebratory milestones across our Bhubaneswar learning centres.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Bidya Classes Archive</span>
                  <span className="text-red-600 font-bold">Bhubaneswar</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

