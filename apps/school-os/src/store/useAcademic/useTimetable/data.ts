import { CalendarDateTime } from '@internationalized/date'

import type {
  SortOption,
  Teacher,
  TimetableAgendaEvent,
  TimetableColor,
  TimetableEvent,
  TimetableFilter,
  TimetableFormState
} from './types'

const agendaColorMap: Record<TimetableColor, string> = {
  amber: '#f59e0b',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  green: '#10b981',
  pink: '#d946ef',
  purple: '#8b5cf6',
  red: '#ef4444',
  slate: '#6b7280'
}

const timetableWeek = {
  friday: { day: 22, month: 5, year: 2026 },
  monday: { day: 18, month: 5, year: 2026 },
  saturday: { day: 23, month: 5, year: 2026 },
  sunday: { day: 17, month: 5, year: 2026 },
  thursday: { day: 21, month: 5, year: 2026 },
  tuesday: { day: 19, month: 5, year: 2026 },
  wednesday: { day: 20, month: 5, year: 2026 }
} as const

const dateTime = (
  dayKey: keyof typeof timetableWeek,
  hour: number,
  minute = 0
) => {
  const day = timetableWeek[dayKey]

  return new CalendarDateTime(day.year, day.month, day.day, hour, minute)
}

const lesson = (
  id: string,
  title: string,
  teacher: string,
  subject: string,
  dayKey: keyof typeof timetableWeek,
  startHour: number,
  endHour: number,
  room: string,
  color: TimetableColor,
  options: Partial<TimetableEvent> = {}
): TimetableEvent => {
  return {
    id,
    title,
    className: options.className ?? 'Grade 10',
    color,
    day: dayKey[0].toUpperCase() + dayKey.slice(1),
    end: dateTime(dayKey, endHour),
    isReadOnly: options.isReadOnly ?? false,
    room,
    section: options.section ?? 'A',
    start: dateTime(dayKey, startHour),
    subject,
    teacher,
    ...options
  }
}

export const teachers: Teacher[] = [
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    id: 't-anjali',
    name: 'Anjali Rao',
    subject: 'Maths'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    id: 't-raghav',
    name: 'Raghav Menon',
    subject: 'Physics'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    id: 't-meera',
    name: 'Meera Iyer',
    subject: 'English'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    id: 't-kavya',
    name: 'Kavya Shah',
    subject: 'Computer Science'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    id: 't-nikhil',
    name: 'Nikhil Varma',
    subject: 'Chemistry'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    id: 't-priya',
    name: 'Priya Nair',
    subject: 'Biology'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg',
    id: 't-arun',
    name: 'Arun Das',
    subject: 'Sports'
  }
]

export const subjectOptions = [
  'Assembly',
  'Maths',
  'Physics',
  'English',
  'Computer Science',
  'Chemistry',
  'Biology',
  'Sports',
  'Lunch Break'
]

export const classOptions = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11']
export const sectionOptions = ['A', 'B', 'C']
export const subjectGroupOptions = [
  'Scholastic',
  'Science',
  'Commerce',
  'Arts',
  'Co-Scholastic'
]
export const dayOptions = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export const timetableDayTabs = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
]
export const durationOptions = ['30', '45', '60', '90', '120']

export const sortOptions = [
  {
    key: 'startTime',
    label: 'Start Time',
    column: 'start'
  },
  {
    key: 'endTime',
    label: 'End Time',
    column: 'end'
  },
  {
    key: 'day',
    label: 'Day',
    column: 'day'
  }
] as const satisfies readonly SortOption[]

export const emptyTimetableForm: TimetableFormState = {
  className: '',
  duration: '',
  periodStartTime: '',
  section: '',
  subjectGroup: '',
  timetableRows: timetableDayTabs.map(day => ({
    id: `timetable-row-${day.toLowerCase()}-1`,
    day,
    endTime: '',
    startTime: '',
    subject: '',
    teacher: ''
  }))
}

export const emptyFilters: TimetableFilter = {
  className: null,
  day: null,
  section: null,
  subject: null,
  teacher: null,
  view: null
}

export const timetableEvents: TimetableEvent[] = [
  lesson(
    'tt-assembly-mon',
    'Assembly',
    'House Coordinators',
    'Assembly',
    'monday',
    8,
    9,
    'Auditorium',
    'slate',
    {
      isAllDay: true
    }
  ),
  lesson(
    'tt-maths-mon',
    'Maths',
    'Anjali Rao',
    'Maths',
    'monday',
    9,
    10,
    'Room 201',
    'blue'
  ),
  lesson(
    'tt-physics-mon',
    'Physics',
    'Raghav Menon',
    'Physics',
    'monday',
    10,
    11,
    'Physics Lab',
    'purple'
  ),
  lesson(
    'tt-english-mon',
    'English',
    'Meera Iyer',
    'English',
    'monday',
    11,
    12,
    'Room 201',
    'green'
  ),
  lesson(
    'tt-lunch-mon',
    'Lunch Break',
    'Class Mentor',
    'Lunch Break',
    'monday',
    12,
    13,
    'Cafeteria',
    'amber'
  ),
  lesson(
    'tt-cs-mon',
    'Computer Science',
    'Kavya Shah',
    'Computer Science',
    'monday',
    13,
    14,
    'Computer Lab',
    'cyan'
  ),
  lesson(
    'tt-chem-mon',
    'Chemistry',
    'Nikhil Varma',
    'Chemistry',
    'monday',
    14,
    15,
    'Chemistry Lab',
    'red'
  ),

  lesson(
    'tt-bio-tue',
    'Biology',
    'Priya Nair',
    'Biology',
    'tuesday',
    9,
    10,
    'Biology Lab',
    'pink'
  ),
  lesson(
    'tt-maths-tue',
    'Maths',
    'Anjali Rao',
    'Maths',
    'tuesday',
    10,
    11,
    'Room 201',
    'blue'
  ),
  lesson(
    'tt-english-tue',
    'English',
    'Meera Iyer',
    'English',
    'tuesday',
    11,
    12,
    'Room 201',
    'green'
  ),
  lesson(
    'tt-lunch-tue',
    'Lunch Break',
    'Class Mentor',
    'Lunch Break',
    'tuesday',
    12,
    13,
    'Cafeteria',
    'amber'
  ),
  lesson(
    'tt-sports-tue',
    'Sports',
    'Arun Das',
    'Sports',
    'tuesday',
    13,
    14,
    'Playground',
    'slate'
  ),
  lesson(
    'tt-physics-tue',
    'Physics',
    'Raghav Menon',
    'Physics',
    'tuesday',
    14,
    15,
    'Physics Lab',
    'purple'
  ),

  lesson(
    'tt-cs-wed',
    'Computer Science',
    'Kavya Shah',
    'Computer Science',
    'wednesday',
    9,
    10,
    'Computer Lab',
    'cyan'
  ),
  lesson(
    'tt-chem-wed',
    'Chemistry',
    'Nikhil Varma',
    'Chemistry',
    'wednesday',
    10,
    11,
    'Chemistry Lab',
    'red'
  ),
  lesson(
    'tt-maths-wed',
    'Maths',
    'Anjali Rao',
    'Maths',
    'wednesday',
    11,
    12,
    'Room 201',
    'blue'
  ),
  lesson(
    'tt-lunch-wed',
    'Lunch Break',
    'Class Mentor',
    'Lunch Break',
    'wednesday',
    12,
    13,
    'Cafeteria',
    'amber'
  ),
  lesson(
    'tt-bio-wed',
    'Biology',
    'Priya Nair',
    'Biology',
    'wednesday',
    13,
    14,
    'Biology Lab',
    'pink'
  ),
  lesson(
    'tt-english-wed',
    'English',
    'Meera Iyer',
    'English',
    'wednesday',
    14,
    15,
    'Room 201',
    'green'
  ),

  lesson(
    'tt-physics-thu',
    'Physics',
    'Raghav Menon',
    'Physics',
    'thursday',
    9,
    10,
    'Physics Lab',
    'purple'
  ),
  lesson(
    'tt-cs-thu',
    'Computer Science',
    'Kavya Shah',
    'Computer Science',
    'thursday',
    10,
    11,
    'Computer Lab',
    'cyan'
  ),
  lesson(
    'tt-chem-thu',
    'Chemistry',
    'Nikhil Varma',
    'Chemistry',
    'thursday',
    11,
    12,
    'Chemistry Lab',
    'red'
  ),
  lesson(
    'tt-lunch-thu',
    'Lunch Break',
    'Class Mentor',
    'Lunch Break',
    'thursday',
    12,
    13,
    'Cafeteria',
    'amber'
  ),
  lesson(
    'tt-maths-thu',
    'Maths',
    'Anjali Rao',
    'Maths',
    'thursday',
    13,
    14,
    'Room 201',
    'blue'
  ),
  lesson(
    'tt-sports-thu',
    'Sports',
    'Arun Das',
    'Sports',
    'thursday',
    14,
    15,
    'Playground',
    'slate'
  ),

  lesson(
    'tt-assembly-fri',
    'Weekly Assembly',
    'House Coordinators',
    'Assembly',
    'friday',
    8,
    9,
    'Auditorium',
    'slate',
    {
      isAllDay: true
    }
  ),
  lesson(
    'tt-english-fri',
    'English',
    'Meera Iyer',
    'English',
    'friday',
    9,
    10,
    'Room 201',
    'green'
  ),
  lesson(
    'tt-bio-fri',
    'Biology',
    'Priya Nair',
    'Biology',
    'friday',
    10,
    11,
    'Biology Lab',
    'pink'
  ),
  lesson(
    'tt-physics-fri',
    'Physics',
    'Raghav Menon',
    'Physics',
    'friday',
    11,
    12,
    'Physics Lab',
    'purple'
  ),
  lesson(
    'tt-lunch-fri',
    'Lunch Break',
    'Class Mentor',
    'Lunch Break',
    'friday',
    12,
    13,
    'Cafeteria',
    'amber'
  ),
  lesson(
    'tt-cs-fri',
    'Computer Science',
    'Kavya Shah',
    'Computer Science',
    'friday',
    13,
    14,
    'Computer Lab',
    'cyan'
  ),
  lesson(
    'tt-chem-fri',
    'Chemistry',
    'Nikhil Varma',
    'Chemistry',
    'friday',
    14,
    15,
    'Chemistry Lab',
    'red'
  ),

  lesson(
    'tt-maths-sat',
    'Maths Revision',
    'Anjali Rao',
    'Maths',
    'saturday',
    9,
    10,
    'Room 201',
    'blue'
  ),
  lesson(
    'tt-science-sat',
    'Science Lab',
    'Nikhil Varma',
    'Chemistry',
    'saturday',
    10,
    12,
    'Chemistry Lab',
    'red',
    {
      status: 'unconfirmed'
    }
  ),
  lesson(
    'tt-sports-sat',
    'Sports',
    'Arun Das',
    'Sports',
    'saturday',
    12,
    13,
    'Playground',
    'slate'
  )
]

export const toAgendaEvents = (
  events: TimetableEvent[]
): TimetableAgendaEvent[] => {
  return events.map(event => ({
    ...event,
    color: agendaColorMap[event.color],
    end: event.end,
    id: event.id,
    isAllDay: event.isAllDay,
    isReadOnly: event.isReadOnly,
    start: event.start,
    status: event.status,
    teacherAvatar: teachers.find(teacher => teacher.name === event.teacher)
      ?.avatar,
    tone: event.color,
    title: event.title
  }))
}
