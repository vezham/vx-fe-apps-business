import { AltArrowRight, Filter } from '@vezham/icons-react'
import { Button, Separator, useMediaQuery } from '@vezham/react-v3'
import { useMobileToolbarNavigation } from '@vezham/react/layouts/section'

import type { FilterDropdownProps } from '@pages/academic/timetable/types'

import { FilterDropdown, TimetableFilterFields } from './filter-dropdown'

export const TimetableHeaderToolbar = ({
  draftFilters,
  onApply,
  onReset,
  setDraftFilters
}: FilterDropdownProps) => {
  const isCompactToolbar = useMediaQuery('(max-width: 767px)', {
    initializeWithValue: false
  })
  const hasFilters = Object.entries(draftFilters).some(
    ([key, value]) => key !== 'view' && Boolean(value)
  )

  if (isCompactToolbar) return null

  return (
    <div
      role="group"
      aria-label="Timetable controls"
      className="flex items-center gap-1">
      <Separator orientation="vertical" className="h-8" />
      <FilterDropdown
        draftFilters={draftFilters}
        hasFilters={hasFilters}
        isHeaderAction
        setDraftFilters={setDraftFilters}
        onApply={onApply}
        onReset={onReset}
      />
      <Separator orientation="vertical" className="h-8" />
    </div>
  )
}

export const TimetableMobileToolbar = ({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) => {
  const { closeSheet, openPage, page } = useMobileToolbarNavigation()

  if (page?.key === 'timetable-filter') {
    return (
      <div className="flex flex-col gap-5 px-3 pt-2">
        <TimetableFilterFields
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
          onApply={() => {
            onApply()
            closeSheet()
          }}
          onReset={() => {
            onReset()
            closeSheet()
          }}
        />
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label="Timetable controls"
      className="flex flex-col gap-1">
      <Button
        className="flex h-auto min-h-11 w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-start"
        variant="ghost"
        onPress={() => openPage({ key: 'timetable-filter', title: 'Filter' })}>
        <Filter size={18} aria-hidden="true" />
        <span className="flex-1">Filter</span>
        <AltArrowRight size={18} aria-hidden="true" />
      </Button>
    </div>
  )
}
