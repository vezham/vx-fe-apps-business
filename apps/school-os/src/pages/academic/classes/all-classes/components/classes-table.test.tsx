import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import type { Selection } from 'react-aria-components'
import { describe, expect, it, vi } from 'vitest'

import { ClassesPagination, ClassesTable } from './classes-table'
import { initialClasses } from './data'

describe('Classes pagination', () => {
  it('sends numeric page changes for previous, next, and direct selection', () => {
    const onPageChange = vi.fn()
    render(
      <ClassesPagination
        currentPage={2}
        pageSize={10}
        totalItems={30}
        totalPages={3}
        onPageChange={onPageChange}
        onPageSizeChange={vi.fn()}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Prev' }))
    expect(onPageChange).toHaveBeenLastCalledWith(1)
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onPageChange).toHaveBeenLastCalledWith(3)
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    expect(onPageChange).toHaveBeenLastCalledWith(1)
    expect(onPageChange).toHaveBeenCalledTimes(3)
  })
})

describe('Classes table selection', () => {
  it('selects all visible rows from the header checkbox', () => {
    const onSelectionChange = vi.fn()
    const records = initialClasses.slice(0, 2)

    const TableHarness = () => {
      const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

      return (
        <ClassesTable
          onOpenClass={vi.fn()}
          onSelectionChange={keys => {
            onSelectionChange(keys)
            setSelectedKeys(keys)
          }}
          onSortChange={vi.fn()}
          records={records}
          selectedKeys={selectedKeys}
          sortDescriptor={{ column: 'id', direction: 'ascending' }}
          visibleColumns={new Set(['id', 'className'])}
        />
      )
    }

    render(<TableHarness />)

    const selectAll = screen.getByRole('checkbox', {
      name: 'Select all classes'
    })
    fireEvent.click(selectAll)

    expect(onSelectionChange).toHaveBeenLastCalledWith('all')

    fireEvent.click(selectAll)

    const clearedSelection = onSelectionChange.mock.lastCall?.[0]
    expect(clearedSelection).toBeInstanceOf(Set)
    expect(clearedSelection).toHaveLength(0)
  })
})
