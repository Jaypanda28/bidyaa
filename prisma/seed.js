const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.auditLog.deleteMany({});
  await prisma.doubt.deleteMany({});
  await prisma.examAttempt.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.examination.deleteMany({});
  await prisma.assignmentSubmission.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.timetableEntry.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.feeStructure.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.studyMaterial.deleteMany({});
  await prisma.videoLecture.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.batch.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.faculty.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.parent.deleteMany({});
  await prisma.admissionApplication.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.branch.deleteMany({});

  console.log('Creating branches...');
  const ghatikiaBranch = await prisma.branch.create({
    data: {
      name: 'Ghatikia Branch (Head Office)',
      code: 'GHT',
      address: 'Near Apeejay School & Durga Mandap, Khandagiri-Chandaka Road, Ghatikia',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751029',
      phone: '+91 79787 81801',
      email: 'ghatikia@bidyaclasses.com',
      isMain: true,
      isActive: true,
    },
  });

  const fireStationBranch = await prisma.branch.create({
    data: {
      name: 'Fire Station Branch',
      code: 'FSB',
      address: 'M-22, Fire Station Area, Behind PGL Honda, Baramunda',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751003',
      phone: '+91 97766 54605',
      email: 'firestation@bidyaclasses.com',
      isMain: false,
      isActive: true,
    },
  });

  console.log('Creating users...');
  const defaultPassword = await bcrypt.hash('Bidya@2026', 10);

  // Super Admin - Managing Director
  const mdUser = await prisma.user.create({
    data: {
      name: 'Bidyasagar Parida',
      email: 'admin@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 79787 81801',
      role: 'SUPER_ADMIN',
      avatar: '/images/md-bidyasagar-parida.jpg',
      branchId: ghatikiaBranch.id,
    },
  });

  // Branch Admin
  const branchAdminUser = await prisma.user.create({
    data: {
      name: 'Rajesh Kumar Nayak',
      email: 'ghatikia.admin@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 97762 80828',
      role: 'BRANCH_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  // Principal / Academic Director
  const principalUser = await prisma.user.create({
    data: {
      name: 'Dr. Smita Pattnaik',
      email: 'principal@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 94370 12345',
      role: 'PRINCIPAL',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  // Faculty Members
  const facultyMathUser = await prisma.user.create({
    data: {
      name: 'Prof. Soumya Ranjan Dash',
      email: 'faculty.maths@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 98610 98765',
      role: 'FACULTY',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  const facultyPhysicsUser = await prisma.user.create({
    data: {
      name: 'Er. Debi Prasad Mohanty',
      email: 'faculty.physics@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 94380 54321',
      role: 'FACULTY',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      branchId: fireStationBranch.id,
    },
  });

  const facultyChemUser = await prisma.user.create({
    data: {
      name: 'Dr. Ananya Mishra',
      email: 'faculty.chem@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 98530 67890',
      role: 'FACULTY',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  // Accountant
  const accountantUser = await prisma.user.create({
    data: {
      name: 'Subrat Kumar Jena',
      email: 'accounts@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 79787 81802',
      role: 'ACCOUNTANT',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  // Parent User
  const parentUser = await prisma.user.create({
    data: {
      name: 'Pratap Kumar Samal',
      email: 'parent@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 94371 99887',
      role: 'PARENT',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  const parentRecord = await prisma.parent.create({
    data: {
      userId: parentUser.id,
      relation: 'Father',
      occupation: 'Civil Engineer (Govt. of Odisha)',
      alternatePhone: '+91 98612 33445',
    },
  });

  // Student 1 (Class X Topper Persona)
  const studentUser1 = await prisma.user.create({
    data: {
      name: 'Shivani Samal',
      email: 'student@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 94371 99887',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  const student1 = await prisma.student.create({
    data: {
      studentId: 'BC-2024-001',
      userId: studentUser1.id,
      rollNumber: '10A-01',
      classLevel: 'Class X',
      stream: 'Foundation Science',
      schoolName: 'Vikash Residential School, Khandagiri',
      dob: '2008-04-12',
      bloodGroup: 'O+',
      emergencyPhone: '+91 94371 99887',
      address: 'Plot 412, Khandagiri Enclave, Bhubaneswar',
      branchId: ghatikiaBranch.id,
      parentId: parentRecord.id,
    },
  });

  // Student 2 (+2 Science)
  const studentUser2 = await prisma.user.create({
    data: {
      name: 'Aditya Mishra',
      email: 'aditya@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 99372 11223',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      branchId: ghatikiaBranch.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      studentId: 'BC-2024-002',
      userId: studentUser2.id,
      rollNumber: '12S-08',
      classLevel: 'Class XII',
      stream: 'PCMB',
      schoolName: 'DAV Public School, Pokhariput',
      dob: '2006-08-21',
      bloodGroup: 'B+',
      emergencyPhone: '+91 99372 11223',
      address: 'Ananta Vihar, Pokhariput, Bhubaneswar',
      branchId: ghatikiaBranch.id,
    },
  });

  // Student 3 (IIT-JEE Aspirant)
  const studentUser3 = await prisma.user.create({
    data: {
      name: 'Rohan Das',
      email: 'rohan@bidyaclasses.com',
      password: defaultPassword,
      phone: '+91 98615 44332',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      branchId: fireStationBranch.id,
    },
  });

  const student3 = await prisma.student.create({
    data: {
      studentId: 'BC-2024-003',
      userId: studentUser3.id,
      rollNumber: 'JEE-15',
      classLevel: 'Class XII (Target)',
      stream: 'PCM + Advanced JEE',
      schoolName: 'Sai International School, Bhubaneswar',
      dob: '2006-02-14',
      bloodGroup: 'A+',
      emergencyPhone: '+91 98615 44332',
      address: 'Baramunda Housing Board Colony, Bhubaneswar',
      branchId: fireStationBranch.id,
    },
  });

  console.log('Creating faculty profiles...');
  const facultyMath = await prisma.faculty.create({
    data: {
      userId: facultyMathUser.id,
      designation: 'HOD - Mathematics',
      qualification: 'M.Sc (Mathematics), B.Ed, M.Tech (Applied Mathematics)',
      specialization: 'Advanced Calculus, Coordinate Geometry & Algebra',
      experience: 12,
      bio: 'Renowned mathematics mentor with over a decade of experience producing state toppers and 100 percentile scorers in CBSE, ICSE, and JEE.',
    },
  });

  const facultyPhysics = await prisma.faculty.create({
    data: {
      userId: facultyPhysicsUser.id,
      designation: 'Senior Faculty - Physics',
      qualification: 'M.Tech, Ex-FIITJEE Faculty',
      specialization: 'Electrodynamics, Mechanics & Modern Physics',
      experience: 10,
      bio: 'Passionate physics educator known for visual conceptualization, numerical shortcuts, and analytical problem-solving.',
    },
  });

  const facultyChem = await prisma.faculty.create({
    data: {
      userId: facultyChemUser.id,
      designation: 'Senior Faculty - Chemistry',
      qualification: 'Ph.D in Organic Chemistry (Utkal University)',
      specialization: 'Reaction Mechanisms & Physical Chemistry',
      experience: 8,
      bio: 'Dedicated mentor helping students demystify organic reaction roadmaps and score top percentiles in competitive entrance exams.',
    },
  });

  console.log('Creating courses...');
  const courseSchool = await prisma.course.create({
    data: {
      title: 'Classes VII - X (School Coaching CBSE & ICSE)',
      slug: 'school-coaching',
      category: 'School Coaching',
      targetClass: 'Class VII to X',
      description: 'Comprehensive curriculum coverage for CBSE & ICSE students with deep conceptual foundation in Science, Mathematics, English, and SST.',
      duration: '1 Year Academic Session',
      fee: 38000,
      branchId: ghatikiaBranch.id,
      image: '/images/toppers-class-10-2023.jpg',
      isActive: true,
    },
  });

  const coursePlusTwo = await prisma.course.create({
    data: {
      title: '+2 Science (Classes XI – XII Physics, Chem, Math, Bio)',
      slug: 'plus-two-science',
      category: '+2 Science',
      targetClass: 'Class XI & XII (CHSE / CBSE)',
      description: 'Rigorous preparation for Council of Higher Secondary Education (CHSE) and CBSE +2 boards with synchronous competitive foundation.',
      duration: '2 Years Integrated',
      fee: 55000,
      branchId: ghatikiaBranch.id,
      image: '/images/toppers-class-12-2023.jpg',
      isActive: true,
    },
  });

  const courseJEE = await prisma.course.create({
    data: {
      title: 'IIT-JEE (JEE Main & Advanced) Comprehensive',
      slug: 'iit-jee',
      category: 'IIT-JEE',
      targetClass: 'Class XI, XII & Droppers',
      description: 'Structured 2-Year and 1-Year target course designed to tackle JEE Main & Advanced with chapter-wise problem sets, mock CBTs, and individual mentoring.',
      duration: '2 Years / 1 Year Dropper',
      fee: 75000,
      branchId: fireStationBranch.id,
      image: '/images/hero-students-banner.jpg',
      isActive: true,
    },
  });

  const courseOUAT = await prisma.course.create({
    data: {
      title: 'OUAT Entrance Coaching (Agri & Allied)',
      slug: 'ouat',
      category: 'OUAT',
      targetClass: 'Class XII Appearing / Passed',
      description: 'Odisha’s most proven and trusted specialized coaching for Odisha University of Agriculture and Technology (OUAT) entrance exam.',
      duration: '6 Months Intensive / Crash Course',
      fee: 32000,
      branchId: ghatikiaBranch.id,
      image: '/images/hero-students-banner.jpg',
      isActive: true,
    },
  });

  const courseKVPY = await prisma.course.create({
    data: {
      title: 'KVPY / Olympiad / NTSE Training',
      slug: 'kvpy-foundation',
      category: 'KVPY / Olympiad',
      targetClass: 'Classes VIII - XII',
      description: 'Advanced aptitude and analytical training for National Science Olympiad (NSO), International Math Olympiad (IMO), NTSE, and Kishore Vaigyanik Protsahan Yojana.',
      duration: '1 Year Academic Session',
      fee: 28000,
      branchId: ghatikiaBranch.id,
      image: '/images/hero-students-banner.jpg',
      isActive: true,
    },
  });

  const courseFoundation = await prisma.course.create({
    data: {
      title: 'Foundation Course (Early IIT / Medical Prep)',
      slug: 'foundation',
      category: 'Foundation',
      targetClass: 'Classes VII - X',
      description: 'Early nurturing of analytical thinking, scientific temperament, and competitive aptitude right from school days.',
      duration: '1 Year',
      fee: 35000,
      branchId: fireStationBranch.id,
      image: '/images/hero-students-banner.jpg',
      isActive: true,
    },
  });

  console.log('Creating subjects...');
  await prisma.subject.createMany({
    data: [
      { name: 'Mathematics (Class X)', code: 'MATH-10', courseId: courseSchool.id },
      { name: 'Science - Physics (Class X)', code: 'PHY-10', courseId: courseSchool.id },
      { name: 'Science - Chemistry (Class X)', code: 'CHEM-10', courseId: courseSchool.id },
      { name: 'Science - Biology (Class X)', code: 'BIO-10', courseId: courseSchool.id },
      { name: 'Physics (+2 Science)', code: 'PHY-12', courseId: coursePlusTwo.id },
      { name: 'Chemistry (+2 Science)', code: 'CHEM-12', courseId: coursePlusTwo.id },
      { name: 'Mathematics (+2 Science)', code: 'MATH-12', courseId: coursePlusTwo.id },
      { name: 'Biology (+2 Science)', code: 'BIO-12', courseId: coursePlusTwo.id },
      { name: 'Advanced Mathematics (JEE)', code: 'JEE-MATH', courseId: courseJEE.id },
      { name: 'Advanced Physics (JEE)', code: 'JEE-PHY', courseId: courseJEE.id },
      { name: 'Physical & Organic Chemistry (JEE)', code: 'JEE-CHEM', courseId: courseJEE.id },
    ],
  });

  console.log('Creating batches...');
  const batchClass10 = await prisma.batch.create({
    data: {
      name: 'Class X Udaan Batch (CBSE/ICSE 2024-25)',
      code: 'UDAAN-X-2024',
      courseId: courseSchool.id,
      branchId: ghatikiaBranch.id,
      facultyId: facultyMath.id,
      academicYear: '2024-2025',
      roomNumber: 'Smart Classroom A-101',
      schedule: 'Mon, Wed, Fri (04:30 PM - 07:30 PM)',
      maxStudents: 35,
      isActive: true,
    },
  });

  const batchPlusTwo = await prisma.batch.create({
    data: {
      name: 'Class XII Shrestha Batch (+2 Science)',
      code: 'SHRESTHA-XII-2024',
      courseId: coursePlusTwo.id,
      branchId: ghatikiaBranch.id,
      facultyId: facultyPhysics.id,
      academicYear: '2024-2025',
      roomNumber: 'Lecture Hall B-202',
      schedule: 'Tue, Thu, Sat (03:30 PM - 07:00 PM)',
      maxStudents: 40,
      isActive: true,
    },
  });

  const batchJEE = await prisma.batch.create({
    data: {
      name: 'JEE Pinnacle Super-30 Batch',
      code: 'PINNACLE-JEE-2025',
      courseId: courseJEE.id,
      branchId: fireStationBranch.id,
      facultyId: facultyMath.id,
      academicYear: '2024-2025',
      roomNumber: 'Advanced Lab C-301',
      schedule: 'Mon to Sat (05:00 PM - 08:30 PM)',
      maxStudents: 30,
      isActive: true,
    },
  });

  console.log('Creating enrollments...');
  await prisma.enrollment.create({
    data: {
      studentId: student1.id,
      courseId: courseSchool.id,
      batchId: batchClass10.id,
      status: 'ACTIVE',
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      courseId: coursePlusTwo.id,
      batchId: batchPlusTwo.id,
      status: 'ACTIVE',
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student3.id,
      courseId: courseJEE.id,
      batchId: batchJEE.id,
      status: 'ACTIVE',
    },
  });

  console.log('Creating timetable entries...');
  const timetableEntries = [
    { batchId: batchClass10.id, dayOfWeek: 'Monday', startTime: '16:30', endTime: '18:00', subject: 'Mathematics', facultyName: 'Prof. Soumya Ranjan Dash', room: 'A-101' },
    { batchId: batchClass10.id, dayOfWeek: 'Monday', startTime: '18:15', endTime: '19:30', subject: 'Physics', facultyName: 'Er. Debi Prasad Mohanty', room: 'A-101' },
    { batchId: batchClass10.id, dayOfWeek: 'Wednesday', startTime: '16:30', endTime: '18:00', subject: 'Chemistry', facultyName: 'Dr. Ananya Mishra', room: 'A-101' },
    { batchId: batchClass10.id, dayOfWeek: 'Wednesday', startTime: '18:15', endTime: '19:30', subject: 'Mathematics', facultyName: 'Prof. Soumya Ranjan Dash', room: 'A-101' },
    { batchId: batchClass10.id, dayOfWeek: 'Friday', startTime: '16:30', endTime: '18:00', subject: 'Biology', facultyName: 'Dr. Smita Pattnaik', room: 'A-101' },
    { batchId: batchClass10.id, dayOfWeek: 'Friday', startTime: '18:15', endTime: '19:30', subject: 'Weekly Doubt & Practice', facultyName: 'Prof. Soumya Ranjan Dash', room: 'A-101' },
  ];

  for (const entry of timetableEntries) {
    await prisma.timetableEntry.create({ data: entry });
  }

  console.log('Creating attendance records...');
  const dates = ['2024-10-21', '2024-10-23', '2024-10-25', '2024-10-28', '2024-10-30', '2024-11-01'];
  for (const date of dates) {
    await prisma.attendance.create({
      data: {
        studentId: student1.id,
        batchId: batchClass10.id,
        date,
        status: date === '2024-10-25' ? 'ABSENT' : 'PRESENT',
        markedById: facultyMathUser.id,
        remarks: date === '2024-10-25' ? 'Sick leave informed by parent' : 'Attentive and participated in problem solving',
      },
    });
  }

  console.log('Creating study materials...');
  await prisma.studyMaterial.createMany({
    data: [
      {
        title: 'Class X Quadratic Equations - Comprehensive Formula Sheet & High Yield Questions',
        description: 'Complete NCERT + Exemplar summary with board exam tricks, discriminant cases and previous 10 year questions.',
        subject: 'Mathematics',
        courseId: courseSchool.id,
        fileUrl: '/materials/class10-quadratics.pdf',
        fileType: 'PDF',
        fileSize: '3.4 MB',
        uploadedBy: 'Prof. Soumya Ranjan Dash',
        downloads: 142,
      },
      {
        title: 'Electricity & Magnetic Effects of Electric Current - Circuit Solvers & Board Guide',
        description: 'Detailed ray diagrams, Kirchhoff rules introduction, Ohm’s law verification notes.',
        subject: 'Physics',
        courseId: courseSchool.id,
        fileUrl: '/materials/class10-physics-electricity.pdf',
        fileType: 'PDF',
        fileSize: '4.8 MB',
        uploadedBy: 'Er. Debi Prasad Mohanty',
        downloads: 189,
      },
      {
        title: 'Carbon and Its Compounds - Functional Groups & IUPAC Nomenclature Handout',
        description: 'All IUPAC rules, structural isomerism, saponification, and esterification reactions summarized.',
        subject: 'Chemistry',
        courseId: courseSchool.id,
        fileUrl: '/materials/class10-carbon-compounds.pdf',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        uploadedBy: 'Dr. Ananya Mishra',
        downloads: 165,
      },
      {
        title: '+2 Science Electrostatics & Gauss Law Master Notes',
        description: 'Detailed derivations of electric field, flux, dipoles, and capacitance with CHSE & CBSE question bank.',
        subject: 'Physics',
        courseId: coursePlusTwo.id,
        fileUrl: '/materials/plus2-electrostatics.pdf',
        fileType: 'PDF',
        fileSize: '5.2 MB',
        uploadedBy: 'Er. Debi Prasad Mohanty',
        downloads: 210,
      },
    ],
  });

  console.log('Creating video lectures...');
  await prisma.videoLecture.createMany({
    data: [
      {
        title: 'Mastering Trigonometric Identities & Heights and Distances',
        description: 'Step-by-step shortcuts to solve 4-mark and 6-mark board questions in under 3 minutes.',
        subject: 'Mathematics',
        courseId: courseSchool.id,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '52 mins',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
        instructor: 'Prof. Soumya Ranjan Dash',
        views: 450,
      },
      {
        title: 'Light: Reflection & Refraction - Ray Optics Simplified',
        description: 'Master lens maker formula, sign conventions, and focal length calculations.',
        subject: 'Physics',
        courseId: courseSchool.id,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '48 mins',
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
        instructor: 'Er. Debi Prasad Mohanty',
        views: 395,
      },
      {
        title: 'Chemical Reactions and Equations: Balancing & Redox Reactions',
        description: 'Quick oxidation number method and precipitation reaction tricks.',
        subject: 'Chemistry',
        courseId: courseSchool.id,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '44 mins',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        instructor: 'Dr. Ananya Mishra',
        views: 312,
      },
    ],
  });

  console.log('Creating assignments...');
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Class X Mathematics Board Practice Sheet - Real Numbers & Polynomials',
      description: 'Solve all 25 subjective questions and submit scanned copy before Sunday 8:00 PM.',
      subject: 'Mathematics',
      batchId: batchClass10.id,
      dueDate: '2024-11-10',
      totalMarks: 50,
      fileUrl: '/assignments/math-hw-01.pdf',
    },
  });

  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: student1.id,
      fileUrl: '/submissions/shivani-math-hw-01.pdf',
      content: 'All questions attempted with step-by-step proofs for irrationality and zeroes factorization.',
      marksObtained: 48,
      feedback: 'Excellent work Shivani! Clean handwriting and accurate justifications.',
      status: 'GRADED',
    },
  });

  console.log('Creating examinations and questions...');
  const exam1 = await prisma.examination.create({
    data: {
      title: 'Bidya Classes All Odisha Class X Science Mock Test 2024',
      description: 'Comprehensive 40-question objective assessment covering Physics, Chemistry, and Biology syllabus.',
      subject: 'Science',
      batchId: batchClass10.id,
      examType: 'MOCK',
      durationMinutes: 45,
      totalMarks: 40,
      passingMarks: 16,
      positiveMarks: 1,
      negativeMarks: 0.25,
      isPublished: true,
    },
  });

  const questionsData = [
    {
      examId: exam1.id,
      questionText: 'When silver chloride is exposed to sunlight for a long duration, it turns grey due to:',
      optionA: 'The formation of silver by decomposition of silver chloride',
      optionB: 'Sublimation of silver chloride',
      optionC: 'Decomposition of chlorine gas from silver chloride',
      optionD: 'Oxidation of silver chloride',
      correctOption: 'A',
      explanation: 'Silver chloride undergoes photochemical decomposition in sunlight: 2AgCl (s) -> 2Ag (s) [grey] + Cl2 (g).',
      marks: 1,
    },
    {
      examId: exam1.id,
      questionText: 'Which of the following mirror is used by a dentist to examine a small cavity in a patient’s teeth?',
      optionA: 'Convex mirror',
      optionB: 'Plane mirror',
      optionC: 'Concave mirror',
      optionD: 'Any spherical mirror',
      correctOption: 'C',
      explanation: 'A concave mirror produces an erect and enlarged virtual image of the tooth when placed between pole and focus.',
      marks: 1,
    },
    {
      examId: exam1.id,
      questionText: 'A cylindrical conductor of length "l" and uniform area of cross-section "A" has resistance "R". Another conductor of length 2l and resistance R of the same material has area of cross-section:',
      optionA: 'A/2',
      optionB: '3A/2',
      optionC: '2A',
      optionD: '3A',
      correctOption: 'C',
      explanation: 'Since R = rho * l / A, for constant R and doubled length (2l), the area must also double to 2A.',
      marks: 1,
    },
    {
      examId: exam1.id,
      questionText: 'Which of the following is an endothermic process?',
      optionA: 'Dilution of sulphuric acid',
      optionB: 'Sublimation of dry ice',
      optionC: 'Condensation of water vapours',
      optionD: 'Respiration in human cells',
      correctOption: 'B',
      explanation: 'Sublimation of dry ice (solid CO2 into gaseous CO2) absorbs heat from surroundings and is endothermic.',
      marks: 1,
    },
    {
      examId: exam1.id,
      questionText: 'The opening and closing of the stomatal pore depends upon:',
      optionA: 'Oxygen concentration',
      optionB: 'Temperature',
      optionC: 'Water in the guard cells',
      optionD: 'Position of chloroplasts',
      correctOption: 'C',
      explanation: 'Guard cells swell when water flows into them causing the stomatal pore to open, and shrink when water leaves.',
      marks: 1,
    },
  ];

  for (const q of questionsData) {
    await prisma.question.create({ data: q });
  }

  // Pre-seed an exam attempt for student1
  await prisma.examAttempt.create({
    data: {
      examId: exam1.id,
      studentId: student1.id,
      score: 38.75,
      totalQuestions: 40,
      correctCount: 39,
      incorrectCount: 1,
      unattemptedCount: 0,
      timeSpentSeconds: 2180,
      rank: 1,
      answersJson: JSON.stringify({ q1: 'A', q2: 'C', q3: 'C', q4: 'B', q5: 'C' }),
    },
  });

  console.log('Creating fee structures and payments...');
  const feeStructure1 = await prisma.feeStructure.create({
    data: {
      courseId: courseSchool.id,
      name: 'Class X Annual Fee Package 2024-25',
      tuitionFee: 30000,
      registrationFee: 5000,
      examinationFee: 3000,
      totalAmount: 38000,
      installmentsCount: 2,
    },
  });

  await prisma.payment.create({
    data: {
      receiptNumber: 'BC-RCPT-2024-0108',
      studentId: student1.id,
      feeStructureId: feeStructure1.id,
      amount: 19000,
      paymentMethod: 'ONLINE',
      razorpayPaymentId: 'pay_Nzk9239bidya',
      razorpayOrderId: 'order_Nzk9239ord',
      status: 'SUCCESS',
      notes: 'Installment 1 of 2 (Admission & Term 1 Tuition)',
      paidAt: new Date('2024-04-15T11:30:00Z'),
    },
  });

  console.log('Creating doubts...');
  await prisma.doubt.create({
    data: {
      studentId: student1.id,
      subject: 'Mathematics',
      question: 'Sir, in quadratic equations when b^2 - 4ac is less than zero, what happens to the roots on the Cartesian coordinate plane?',
      answer: 'When D < 0, the parabolic curve does not intersect the x-axis at all. The entire parabola lies either strictly above or strictly below the x-axis, meaning there are no real roots (only complex conjugate roots).',
      status: 'ANSWERED',
      answeredBy: 'Prof. Soumya Ranjan Dash',
      answeredAt: new Date(),
    },
  });

  console.log('Creating announcements...');
  await prisma.announcement.createMany({
    data: [
      {
        title: 'BBSAT 2025 – Bidya Brilliant Student Aptitude & Scholarship Test Announced',
        content: 'Bidya Classes announces the dates for BBSAT 2025. Get up to 100% scholarship on tuition fees for School, +2 Science, and JEE batches. Test dates: 24th November & 1st December at Ghatikia & Fire Station centres.',
        targetAudience: 'ALL',
        priority: 'HIGH',
        branchName: 'All Branches',
      },
      {
        title: 'Weekly Mock Examination Timetable for Class X and +2 Science',
        content: 'Special All-Odisha Board simulation test series starts this Sunday from 9:30 AM to 12:30 PM. Compulsory attendance for all enrolled students.',
        targetAudience: 'STUDENTS',
        priority: 'NORMAL',
        branchName: 'All Branches',
      },
      {
        title: 'Parent-Teacher Meeting (PTM) for Term-1 Academic Review',
        content: 'Dear Parents, please attend the PTM this Saturday between 3:00 PM and 6:00 PM at Ghatikia branch to discuss student progress and test answer sheets.',
        targetAudience: 'PARENTS',
        priority: 'HIGH',
        branchName: 'Ghatikia Branch',
      },
    ],
  });

  console.log('Creating sample enquiries and applications...');
  await prisma.enquiry.createMany({
    data: [
      {
        name: 'Soumyadeep Rout',
        email: 'soumya.rout@gmail.com',
        phone: '+91 94378 12345',
        courseOfInterest: '+2 Science',
        branch: 'Ghatikia',
        currentClass: 'Class X',
        schoolName: 'DAV Public School, Chandrasekharpur',
        message: 'Interested in integrated +2 Science with NEET/JEE coaching for the 2025 batch.',
        status: 'NEW',
      },
      {
        name: 'Tanmay Mohapatra',
        email: 'tanmay.moh@yahoo.com',
        phone: '+91 98611 65432',
        courseOfInterest: 'IIT-JEE Preparation',
        branch: 'Fire Station',
        currentClass: 'Class XI',
        schoolName: 'Mothers Public School, Bhubaneswar',
        message: 'Seeking weekend JEE Pinnacle batch and doubt clearing sessions.',
        status: 'CONTACTED',
      },
      {
        name: 'Swati Priyadarshini',
        email: 'swati.priya@gmail.com',
        phone: '+91 79782 45678',
        courseOfInterest: 'OUAT Preparation',
        branch: 'Ghatikia',
        currentClass: 'Class XII Science',
        schoolName: 'BJB Junior College, Bhubaneswar',
        message: 'Looking for OUAT crash course batch timings and mock test schedule.',
        status: 'COUNSELED',
      },
    ],
  });

  await prisma.admissionApplication.create({
    data: {
      applicationNumber: 'APP-2024-001',
      studentName: 'Ayush Kumar Panda',
      email: 'ayush.panda@gmail.com',
      phone: '+91 94375 66778',
      dob: '2008-05-18',
      gender: 'Male',
      fatherName: 'Dr. Sudhir Kumar Panda',
      fatherPhone: '+91 94370 55443',
      address: 'Plot 78, Kalinga Nagar, Bhubaneswar',
      targetCourse: '+2 Science',
      branch: 'Ghatikia Branch',
      currentClass: 'Class X',
      previousSchool: 'Loyola School, Bhubaneswar',
      board: 'ICSE',
      lastExamScore: '96.2%',
      scholarshipOptIn: true,
      status: 'APPROVED',
      remarks: 'Selected for 25% BBSAT Merit Scholarship.',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

