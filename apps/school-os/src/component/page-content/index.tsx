import { useLocation } from '@tanstack/react-router'

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

export const PageContent = () => {
  const { href, pathname } = useLocation()

  if (pathname === '/academic/classes/allclasses')
    return <AcademicClassesPage />
  if (pathname === '/academic/classes/schedule') return <ClassSchedulePage />
  if (pathname === '/academic/classroom') return <ClassroomPage />
  if (pathname === '/academic/class-routine') return <ClassRoutinePage />
  if (pathname === '/academic/section') return <SectionPage />
  if (pathname === '/academic/subject') return <SubjectPage />
  if (pathname === '/academic/syllabus') return <SyllabusPage />
  if (pathname === '/academic/timetable') return <TimetablePage />
  if (pathname === '/academic/homework') return <HomeworkPage />
  if (pathname === '/academic/reasons') return <ReasonsPage />
  if (pathname === '/academic/examinations/exam') return <ExamPage />
  if (pathname === '/academic/examinations/exam-schedule')
    return <ExamSchedulePage />
  if (pathname === '/academic/examinations/grades') return <GradesPage />
  if (pathname === '/academic/examinations/exam-attendance')
    return <ExamAttendancePage />
  if (pathname === '/academic/examinations/exam-results')
    return <ExamResultsPage />

  return <p className="text-muted font-mono text-sm break-all">{href}</p>
}
