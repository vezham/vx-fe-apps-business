import {
  type AsyncRouteComponent,
  lazyRouteComponent,
  useLocation
} from '@tanstack/react-router'

const ClassRoutinePage = lazyRouteComponent(
  () => import('@pages/academic/class-routine')
)
const AcademicClassesPage = lazyRouteComponent(
  () => import('@pages/academic/classes/all-classes')
)
const ClassSchedulePage = lazyRouteComponent(
  () => import('@pages/academic/classes/schedule')
)
const ClassroomPage = lazyRouteComponent(
  () => import('@pages/academic/classroom')
)
const ExamPage = lazyRouteComponent(
  () => import('@pages/academic/examinations/exam')
)
const ExamAttendancePage = lazyRouteComponent(
  () => import('@pages/academic/examinations/exam-attendance')
)
const ExamResultsPage = lazyRouteComponent(
  () => import('@pages/academic/examinations/exam-results')
)
const ExamSchedulePage = lazyRouteComponent(
  () => import('@pages/academic/examinations/exam-schedule')
)
const GradesPage = lazyRouteComponent(
  () => import('@pages/academic/examinations/grades')
)
const HomeworkPage = lazyRouteComponent(
  () => import('@pages/academic/homework')
)
const ReasonsPage = lazyRouteComponent(() => import('@pages/academic/reasons'))
const SectionPage = lazyRouteComponent(() => import('@pages/academic/section'))
const SubjectPage = lazyRouteComponent(() => import('@pages/academic/subject'))
const SyllabusPage = lazyRouteComponent(
  () => import('@pages/academic/syllabus')
)
const TimetablePage = lazyRouteComponent(
  () => import('@pages/academic/timetable')
)

const pagesByPath: Record<
  string,
  AsyncRouteComponent<Record<string, never>>
> = {
  '/academic/timetable': TimetablePage,
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

const getPagePath = (pathname: string) =>
  pathname === '/academic/timetable' ||
  pathname.startsWith('/academic/timetable/')
    ? '/academic/timetable'
    : pathname

export const preloadPage = (pathname: string) =>
  pagesByPath[getPagePath(pathname)]?.preload?.()

export const PageContent = () => {
  const { href, pathname } = useLocation()
  const Page = pagesByPath[getPagePath(pathname)]

  return Page ? (
    <Page />
  ) : (
    <p className="text-muted font-mono text-sm break-all">{href}</p>
  )
}
