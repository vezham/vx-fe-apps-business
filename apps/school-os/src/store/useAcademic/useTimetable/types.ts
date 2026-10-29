import type { CalendarDateTime } from '@internationalized/date'

import { useOverlayState } from '@vezham/react-v3'

export type RQTimetable = Record<string, never>

export type TimetableView = 'day' | 'week' | 'month' | 'year'

export type TimetableColor =
  'blue' | 'green' | 'purple' | 'amber' | 'pink' | 'cyan' | 'slate' | 'red'

export type Teacher = {
  id: string
  name: string
  subject: string
  avatar: string
}

export type TimetableEvent = {
  id: string
  title: string
  teacher: string
  className: string
  section: string
  subject: string
  day: string
  room: string
  color: TimetableColor
  start: CalendarDateTime
  end: CalendarDateTime
  isAllDay?: boolean
  isReadOnly?: boolean
  status?: 'confirmed' | 'unconfirmed'
}

export type TimetableFormRow = {
  id: string
  subject: string
  teacher: string
  day: string
  startTime: string
  endTime: string
}

export type TimetableFormState = {
  className: string
  section: string
  subjectGroup: string
  periodStartTime: string
  duration: string
  timetableRows: TimetableFormRow[]
}

export type TimetableFormErrors = Partial<
  Record<keyof TimetableFormState | keyof TimetableFormRow, string>
>

export type TimetableAgendaEvent = Omit<TimetableEvent, 'color'> & {
  color: string
  tone: TimetableColor
  teacherAvatar?: string
}

export type TimetableFilter = {
  className: string | null
  section: string | null
  teacher: string | null
  subject: string | null
  day: string | null
}

export type SortOption = {
  key: string
  label: string
  column: keyof TimetableEvent
}

export type TimetableResponse = TimetableEvent[]

export type DrawerState = ReturnType<typeof useDisclosure>

export function useDisclosure() {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}
