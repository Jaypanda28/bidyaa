# Bidya Classes – Complete Website & Coaching Management ERP

> A production-grade educational website and coaching institute ERP built for **Bidya Classes, Bhubaneswar, Odisha**, referencing official identity, authentic faculty, verified toppers, and real campuses.

---

## 🏫 Institute Profile & Verified Information
- **Name**: Bidya Classes (Bidya Bandana Group of Institutions)
- **Managing Director**: Bidyasagar Parida (M.Sc. Mathematics, B.Ed., M.Tech. Applied Mathematics)
- **Head Campus**: Near Apeejay School & Durga Mandap, Khandagiri-Chandaka Road, Ghatikia, Bhubaneswar – 751029 (+91 79787 81801)
- **Specialized Wing**: M-22, Fire Station Area, Behind PGL Honda, Baramunda, Bhubaneswar, Odisha (+91 97766 54605)
- **Email**: info@bidyaclasses.com / admissions@bidyaclasses.com
- **Verified 2023 Toppers**:
  - **Class X**: Shivani Samal (98.6%), Udbhas Kundu (95.4%), Satwik Ku. Nayak (92%), Amitesh Mohanty (92%), Sneha Suman Mohapatra (90%)
  - **Class XII Science**: Priyanka Hota (96%), Shirshak Acharjya (96%), Devarpita Rout (96%), Nishan Kar (96%), Prabhupada Pradhan (95%)
  - **Competitive Entrances**: Rohan Das (AIR 452 IIT-JEE), Sneha Patnaik (OUAT Rank 35)

---

## 🚀 Key Modules & System Architecture

### 1. Public Education Website
- **Home (`/`)**: Education UI featuring authentic branding, hero banner, interactive course cards, real toppers, statistics, director message, branch locators, and CTAs.
- **About Us (`/about`)**: Detailed institutional background, Managing Director's perspective, 4 pillars of the Bidya pedagogy, and decade-long milestones.
- **Courses & Programs (`/courses`)**: Comprehensive overview and dynamic slug pages for:
  - School Coaching (Classes VII – X: CBSE & ICSE)
  - +2 Science (Classes XI – XII: CHSE & CBSE, Physics, Chemistry, Maths, Biology)
  - IIT-JEE Preparation (JEE Main & Advanced)
  - OUAT Entrance Coaching (Agri & Allied Sciences)
  - KVPY / Olympiad / Foundation
- **Faculty & Mentors (`/faculty`)**: Department-wise faculty profiles with qualifications and experience.
- **Student Results (`/results`)**: High-resolution official merit posters and verified topper breakdown.
- **Photo Gallery (`/gallery`)**: Smart classrooms, labs, topper felicitations, and doubt-clearing sessions.
- **Announcements (`/announcements`)**: Notice board with BBSAT scholarship alerts, test circulars, and PTM dates.
- **Branches & Campuses (`/branches`)**: Ghatikia and Fire Station locations with contact info and Google maps.
- **Admissions (`/admissions`)**: Interactive multi-step form with quick enquiry and formal application registration generating unique application numbers (`APP-YYYY-XXXX`).
- **Contact Us (`/contact`)**: Instant enquiry form, branch helplines, and WhatsApp chat widget.

### 2. Multi-Role ERP & LMS Portals (`/dashboard`)
- **Super Admin ERP (`/dashboard/super-admin`)**:
  - Central operational KPI metrics (Total Students, Active Batches, Collections, Applications)
  - Student directory with ID cards (`BC-YYYY-XXXX`) and batch allocations
  - Batch schedules and timetable management
  - Online admission application review and enquiry status management
  - Fee collection ledger with verified receipt generation
  - Attendance matrix across all sessions
  - Exam management & top scorer boards
- **Branch Admin Portal (`/dashboard/branch-admin`)**: Branch-specific students, faculty, and room allocation.
- **Principal Desk (`/dashboard/principal`)**: Academic quality audits, syllabus tracking, and faculty allocations.
- **Faculty Desk (`/dashboard/faculty`)**:
  - Live session attendance marking (Present / Late / Absent)
  - PDF study material upload to student LMS
  - Test creation & answer key management
  - 1-on-1 student doubt resolution
- **Student Learning Portal (`/dashboard/student`)**:
  - Class timetable & attendance records
  - Downloadable study notes and PDF materials
  - Video lectures with embedded masterclasses
  - Online Timed CBT Examination Engine with automatic instant evaluation
  - Doubt submission form with faculty responses
  - Fee dues and payment receipts
- **Parent Portal (`/dashboard/parent`)**:
  - Child daily attendance tracker and absence notifications
  - Examination scorecards and rank updates
  - Fee dues summary and integrated online fee payment (Razorpay gateway simulation)
  - Printable official tax receipts with GST and institute registration number
- **Accountant Desk (`/dashboard/accountant`)**: Fee collections, structure configurations, and transaction audits.

### 3. Online CBT Examination Engine (`/dashboard/exam/[id]`)
- Real-time countdown timer with automated submission
- Question navigator palette with color-coded status (Answered, Unanswered, Marked for Review)
- Positive (+4) and negative (-1 / -0.25) marking calculations
- Instant scorecards with accuracy %, ranks, and question-by-question solution explanations

---

## 🔑 Demo Access Credentials (Password for all: `Bidya@2026`)

The `/login` page features a **1-Click Quick Demo Switcher** so you can log in as any role without typing passwords:

| Role | Name | Email | Password |
|---|---|---|---|
| **Super Admin (MD)** | Bidyasagar Parida | `admin@bidyaclasses.com` | `Bidya@2026` |
| **Branch Admin** | Rajesh Nayak | `ghatikia.admin@bidyaclasses.com` | `Bidya@2026` |
| **Principal** | Dr. Smita Pattnaik | `principal@bidyaclasses.com` | `Bidya@2026` |
| **Faculty (Maths HOD)** | Prof. Soumya R. Dash | `faculty.maths@bidyaclasses.com` | `Bidya@2026` |
| **Student (Class X Topper)** | Shivani Samal (`BC-2024-001`) | `student@bidyaclasses.com` | `Bidya@2026` |
| **Parent Portal** | Pratap Kumar Samal | `parent@bidyaclasses.com` | `Bidya@2026` |
| **Accountant** | Subrat Kumar Jena | `accounts@bidyaclasses.com` | `Bidya@2026` |

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Database & ORM**: Prisma ORM with SQLite (zero-config local storage) / PostgreSQL compatible
- **Authentication**: JWT Cookie Sessions (`jose`) + Bcrypt Password Hashing
- **Payments**: Razorpay Gateway Integration & Printable PDF-styled Receipts

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed
```bash
npx prisma db push
node prisma/seed.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

