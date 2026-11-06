import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get('examId');

    if (examId) {
      const exam = await prisma.examination.findUnique({
        where: { id: examId },
        include: {
          questions: true,
          batch: true,
        },
      });
      return NextResponse.json({ exam });
    }

    const exams = await prisma.examination.findMany({
      include: {
        batch: { include: { course: true } },
        questions: true,
        attempts: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ exams });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { examId, studentId, answers, timeSpentSeconds } = body;
    // answers: Record<string, string> (e.g. { questionId: 'A' })

    if (!examId || !studentId) {
      return NextResponse.json(
        { error: 'Exam ID and Student ID are required' },
        { status: 400 }
      );
    }

    const exam = await prisma.examination.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) {
      return NextResponse.json({ error: 'Examination not found' }, { status: 404 });
    }

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    for (const q of exam.questions) {
      const selected = answers ? answers[q.id] : null;
      if (!selected) {
        unattemptedCount++;
      } else if (selected.toUpperCase() === q.correctOption.toUpperCase()) {
        correctCount++;
        totalScore += exam.positiveMarks;
      } else {
        incorrectCount++;
        totalScore -= exam.negativeMarks;
      }
    }

    // Save attempt
    const attempt = await prisma.examAttempt.create({
      data: {
        examId,
        studentId,
        submittedAt: new Date(),
        score: Math.max(0, Number(totalScore.toFixed(2))),
        totalQuestions: exam.questions.length,
        correctCount,
        incorrectCount,
        unattemptedCount,
        timeSpentSeconds: timeSpentSeconds || 0,
        answersJson: JSON.stringify(answers || {}),
        rank: 1, // Will adjust if multiple attempts exist
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Exam submitted and evaluated successfully!',
      result: {
        attemptId: attempt.id,
        score: attempt.score,
        totalMarks: exam.totalMarks,
        correctCount,
        incorrectCount,
        unattemptedCount,
        totalQuestions: exam.questions.length,
        percentage: Number(((attempt.score / exam.totalMarks) * 100).toFixed(1)),
        isPassed: attempt.score >= exam.passingMarks,
      },
    });
  } catch (error) {
    console.error('Exam evaluation error:', error);
    return NextResponse.json({ error: 'Failed to evaluate exam' }, { status: 500 });
  }
}

