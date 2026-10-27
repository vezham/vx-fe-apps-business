import { parseTime } from '@internationalized/date'

import type {
  TimetableEvent,
  TimetableFormErrors,
  TimetableFormState
} from '@pages/academic/timetable/types'

export const validateTimetableForm = (form: TimetableFormState) => {
  const errors: TimetableFormErrors = {}
  const filledRows = getFilledTimetableRows(form)

  if (!form.className.trim()) {
    errors.className = 'Class is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.subjectGroup.trim()) {
    errors.subjectGroup = 'Subject group is required.'
  }

  if (!form.periodStartTime.trim()) {
    errors.periodStartTime = 'Period start time is required.'
  }

  if (!form.duration.trim()) {
    errors.duration = 'Duration is required.'
  }

  if (
    !filledRows.length ||
    filledRows.some(
      row =>
        !row.subject.trim() ||
        !row.teacher.trim() ||
        !row.day.trim() ||
        !row.startTime.trim() ||
        !row.endTime.trim()
    )
  ) {
    errors.timetableRows = 'Complete every timetable row.'
  }

  if (
    filledRows.some(
      row =>
        row.startTime &&
        row.endTime &&
        parseTimeToMinutes(row.endTime) <= parseTimeToMinutes(row.startTime)
    )
  ) {
    errors.timetableRows = 'End time must be after start time.'
  }

  return errors
}

export function getFilledTimetableRows(form: TimetableFormState) {
  return form.timetableRows.filter(
    row =>
      row.subject.trim() ||
      row.teacher.trim() ||
      row.startTime.trim() ||
      row.endTime.trim()
  )
}

export const getTimeFieldValue = (value: string) => {
  if (!value) {
    return null
  }

  try {
    return parseTime(value)
  } catch {
    return null
  }
}

export const formatTimeFieldValue = (value: {
  hour: number
  minute: number
}) => {
  return `${String(value.hour).padStart(2, '0')}:${String(
    value.minute
  ).padStart(2, '0')}`
}

export const parseTimeInput = (value: string) => {
  const [hour = '0', minute = '0'] = value.split(':')

  return {
    hour: Number(hour),
    minute: Number(minute)
  }
}

export const getSubjectColor = (subject: string): TimetableEvent['color'] => {
  const colorMap: Record<string, TimetableEvent['color']> = {
    Assembly: 'slate',
    Biology: 'pink',
    Chemistry: 'red',
    'Computer Science': 'cyan',
    English: 'green',
    'Lunch Break': 'amber',
    Maths: 'blue',
    Physics: 'purple',
    Sports: 'slate'
  }

  return colorMap[subject] ?? 'blue'
}

export const isValidEvent = (
  event: TimetableEvent | undefined
): event is TimetableEvent => {
  return Boolean(
    event?.id &&
    event.title &&
    event.teacher &&
    event.subject &&
    event.room &&
    event.className &&
    event.section &&
    event.start &&
    event.end
  )
}

function parseTimeToMinutes(value: string) {
  const time = parseTimeInput(value)

  return time.hour * 60 + time.minute
}
