import { useMemo } from 'react'

import { useSectionToolbarContent } from '@vezham/react/layouts/section'

import { TimetableCalendar } from './components/calendar/timetable-calendar'
import { TimetableDrawer } from './components/drawer/timetable-drawer'
import { TimetableHeaderToolbar } from './components/toolbar/timetable-toolbar'
import { useTimetablePage } from './hooks/use-timetable-page'
import { classNames } from './variants'

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
      <TimetableCalendar {...page.calendar} />
      <TimetableDrawer {...page.drawerProps} />
    </section>
  )
}

export default TimeTablePage
