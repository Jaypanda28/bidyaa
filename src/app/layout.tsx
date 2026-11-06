import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Bidya Classes – Premier Coaching for School, +2 Science, IIT-JEE & OUAT | Bhubaneswar',
  description: 'Bidya Classes, Bhubaneswar (Ghatikia & Fire Station) offers top-tier academic coaching for Classes VII–X, +2 Science (CHSE/CBSE), IIT-JEE Main & Advanced, and OUAT entrance preparation with verified toppers and expert faculty.',
  keywords: 'Bidya Classes Bhubaneswar, Coaching Institute Bhubaneswar, +2 Science Coaching Odisha, IIT JEE Bhubaneswar, OUAT entrance coaching, Class 10 CBSE coaching Ghatikia, Bidyasagar Parida',
  authors: [{ name: 'Bidya Classes' }],
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    title: 'Bidya Classes – Building Strong Academic Foundations for a Brighter Future',
    description: 'Expert guidance for School, +2 Science & Competitive Examinations with proven track record in Bhubaneswar, Odisha.',
    images: ['/images/hero-students-banner.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
