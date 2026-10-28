import { EntityActiveFilters, type EntityFilter } from '@shared/record-list'
import { useMemo } from 'react'

import { useSectionToolbarContent } from '@vezham/react/layouts/section'

import { TimetableCalendar } from './components/calendar/timetable-calendar'
import { TimetableDrawer } from './components/drawer/timetable-drawer'
import { TimetableHeaderToolbar } from './components/toolbar/timetable-toolbar'
import { useTimetablePage } from './hooks/use-timetable-page'
import type { TimetableFilter } from './types'
import { classNames } from './variants'

type TimetableFilterKey = Exclude<keyof TimetableFilter, 'view'>

const timetableFilterDefinitions: readonly EntityFilter<TimetableFilterKey>[] =
  [
    { id: 'className', label: 'Class', options: [] },
    { id: 'section', label: 'Section', options: [] },
    { id: 'teacher', label: 'Teacher', options: [] },
    { id: 'subject', label: 'Subject', options: [] },
    { id: 'day', label: 'Day', options: [] }
  ]

const TimeTablePage = () => {
  const page = useTimetablePage()
  const toolbarContent = useMemo(
    () => ({
      desktop: (
        <TimetableHeaderToolbar
          draftFilters={page.toolbar.draftFilters}
          onApply={page.toolbar.onApplyFilters}
          onReset={page.toolbar.onResetFilters}
          setDraftFilters={page.toolbar.setDraftFilters}
        />
      ),
      mobile: (
        <TimetableHeaderToolbar
          draftFilters={page.toolbar.draftFilters}
          onApply={page.toolbar.onApplyFilters}
          onReset={page.toolbar.onResetFilters}
          setDraftFilters={page.toolbar.setDraftFilters}
        />
      )
    }),
    [page.toolbar]
  )

  useSectionToolbarContent(toolbarContent)

  return (
    <section className={classNames.page}>
      <EntityActiveFilters
        filters={timetableFilterDefinitions}
        values={page.filters}
        onRemove={page.removeFilter}
      />
      <TimetableCalendar {...page.calendar} />
      <TimetableDrawer {...page.drawerProps} />
    </section>
  )
}

export default TimeTablePage
