import type { Dispatch, SetStateAction } from 'react'

import { useAgenda } from '@vezham/react-pro-v3'

import type {
  DrawerState,
  TimetableAgendaEvent,
  TimetableFilter,
  TimetableFormErrors,
  TimetableFormState
} from '@store/useAcademic/useTimetable/types'
import type { TimetableView } from '@store/useAcademic/useTimetable/types'

export { useDisclosure } from '@store/useAcademic/useTimetable/types'

export type {
  DrawerState,
  TimetableAgendaEvent,
  TimetableEvent,
  TimetableFilter,
  TimetableFormErrors,
  TimetableFormRow,
  TimetableFormState,
  TimetableView
} from '@store/useAcademic/useTimetable/types'

export type FilterDropdownProps = {
  draftFilters: TimetableFilter
  hasFilters?: boolean
  isHeaderAction?: boolean
  onApply: () => void
  onReset: () => void
  setDraftFilters: Dispatch<SetStateAction<TimetableFilter>>
}

export type TimetableCalendarProps = {
  agenda: ReturnType<typeof useAgenda>
  agendaEvents: TimetableAgendaEvent[]
  calendarDate: import('@internationalized/date').CalendarDate
  onNext: () => void
  onPrevious: () => void
  onToday: () => void
  view: TimetableView
}

export type TimetableDrawerProps = {
  drawerState: DrawerState
  form: TimetableFormState
  formErrors: TimetableFormErrors
  onCancel: () => void
  onClose: () => void
  onFormChange: <K extends keyof TimetableFormState>(
    field: K,
    value: TimetableFormState[K]
  ) => void
  onSave: () => void
}
