import { useLocation } from '@tanstack/react-router'
import type { ComponentType } from 'react'

import ClassRoutinePage from '@pages/academic/class-routine'
import AcademicClassesPage from '@pages/academic/classes/all-classes'
import ClassSchedulePage from '@pages/academic/classes/schedule'
import ClassroomPage from '@pages/academic/classroom'
import ExamPage from '@pages/academic/examinations/exam'
import ExamAttendancePage from '@pages/academic/examinations/exam-attendance'
import ExamResultsPage from '@pages/academic/examinations/exam-results'
import ExamSchedulePage from '@pages/academic/examinations/exam-schedule'
import GradesPage from '@pages/academic/examinations/grades'
import HomeworkPage from '@pages/academic/homework'
import ReasonsPage from '@pages/academic/reasons'
import SectionPage from '@pages/academic/section'
import SubjectPage from '@pages/academic/subject'
import SyllabusPage from '@pages/academic/syllabus'
import TimetablePage from '@pages/academic/timetable'

const pagesByPath: Record<string, ComponentType> = {
  '/academic/classes/allclasses': AcademicClassesPage,
  '/academic/classes/schedule': ClassSchedulePage,
  '/academic/classroom': ClassroomPage,
  '/academic/class-routine': ClassRoutinePage,
  '/academic/section': SectionPage,
  '/academic/subject': SubjectPage,
  '/academic/syllabus': SyllabusPage,
  '/academic/homework': HomeworkPage,
  '/academic/reasons': ReasonsPage,
  '/academic/examinations/exam': ExamPage,
  '/academic/examinations/exam-schedule': ExamSchedulePage,
  '/academic/examinations/grades': GradesPage,
  '/academic/examinations/exam-attendance': ExamAttendancePage,
  '/academic/examinations/exam-results': ExamResultsPage
}

export const PageContent = () => {
  const { href, pathname } = useLocation()
  const Page =
    pathname === '/academic/timetable' ||
    pathname.startsWith('/academic/timetable/')
      ? TimetablePage
      : pagesByPath[pathname]

  return Page ? (
    <Page />
  ) : (
    <p className="text-muted font-mono text-sm break-all">{href}</p>
  )
}
