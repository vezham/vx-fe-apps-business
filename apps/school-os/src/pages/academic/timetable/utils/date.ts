import { CalendarDate, type CalendarDateTime } from '@internationalized/date'

import { dayOptions } from '@pages/academic/timetable/data'
import type { TimetableView } from '@pages/academic/timetable/types'

const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long'
})

export const getAgendaDate = (date: CalendarDate, view: TimetableView) => {
  if (view !== 'week') {
    return date
  }

  return date.subtract({ days: getMondayOffset(date) }).add({ days: 3 })
}

export const getDateForDayName = (date: CalendarDate, dayName: string) => {
  const focusedDate = getAgendaDate(date, 'week')
  const nativeDate = new Date(
    focusedDate.year,
    focusedDate.month - 1,
    focusedDate.day
  )
  const startOfWeek = focusedDate.subtract({ days: nativeDate.getDay() })
  const dayIndex = dayOptions.findIndex(day => day === dayName)

  return startOfWeek.add({ days: Math.max(dayIndex, 0) })
}

export const getDayName = (date: CalendarDateTime) => {
  return weekdayFormatter.format(new Date(date.year, date.month - 1, date.day))
}

export const getTodayCalendarDate = () => {
  return dateToCalendarDate(new Date())
}

function getMondayOffset(date: CalendarDate) {
  const nativeDate = new Date(date.year, date.month - 1, date.day)
  const day = nativeDate.getDay()

  return day === 0 ? 6 : day - 1
}

function dateToCalendarDate(date: Date) {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}
