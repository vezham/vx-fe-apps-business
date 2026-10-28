import { useState } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  Filter as FilterIcon
} from '@vezham/icons-react'
import { Button, Dropdown, Surface } from '@vezham/react-v3'

import {
  classOptions,
  dayOptions,
  sectionOptions,
  subjectOptions,
  teachers
} from '@pages/academic/timetable/data'
import type { FilterDropdownProps } from '@pages/academic/timetable/types'
import { classNames } from '@pages/academic/timetable/variants'

import { FilterSelect } from './filter-select'

export const FilterDropdown = ({
  draftFilters,
  hasFilters = false,
  isHeaderAction = false,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      {isHeaderAction ? (
        <Button
          isIconOnly
          aria-label="Filter"
          aria-pressed={hasFilters}
          className="h-9 w-9 min-w-9 shrink-0 rounded-full p-0"
          variant={hasFilters ? 'secondary' : 'ghost'}>
          <FilterIcon size={18} aria-hidden="true" />
        </Button>
      ) : (
        <Dropdown.Trigger>
          <Button variant="outline">
            <FilterIcon size={16} aria-hidden="true" />
            Filter
            <AltArrowDownIcon size={16} aria-hidden="true" />
          </Button>
        </Dropdown.Trigger>
      )}
      <Dropdown.Popover>
        <Surface className={classNames.filterPanel}>
          <h2 className={classNames.filterTitle}>Filter</h2>
          <FilterSelect
            label="Class"
            options={classOptions}
            placeholder="Select class"
            value={draftFilters.className}
            onChange={value =>
              setDraftFilters({ ...draftFilters, className: value })
            }
          />
          <FilterSelect
            label="Section"
            options={sectionOptions}
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({ ...draftFilters, section: value })
            }
          />
          <FilterSelect
            label="Teacher"
            options={teachers.map(teacher => teacher.name)}
            placeholder="Select teacher"
            value={draftFilters.teacher}
            onChange={value =>
              setDraftFilters({ ...draftFilters, teacher: value })
            }
          />
          <FilterSelect
            label="Subject"
            options={subjectOptions}
            placeholder="Select subject"
            value={draftFilters.subject}
            onChange={value =>
              setDraftFilters({ ...draftFilters, subject: value })
            }
          />
          <FilterSelect
            label="Day"
            options={dayOptions}
            placeholder="Select day"
            value={draftFilters.day}
            onChange={value => setDraftFilters({ ...draftFilters, day: value })}
          />

          <div className={classNames.filterActions}>
            <Button
              variant="secondary"
              onPress={() => {
                onReset()
                setIsOpen(false)
              }}>
              Reset
            </Button>
            <Button
              onPress={() => {
                onApply()
                setIsOpen(false)
              }}>
              Apply
            </Button>
          </div>
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}
