import { Separator, useMediaQuery } from '@vezham/react-v3'

import type { FilterDropdownProps } from '@pages/academic/timetable/types'

import { FilterDropdown } from './filter-dropdown'

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

  if (isCompactToolbar) {
    return (
      <FilterDropdown
        draftFilters={draftFilters}
        hasFilters={hasFilters}
        setDraftFilters={setDraftFilters}
        onApply={onApply}
        onReset={onReset}
      />
    )
  }

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
