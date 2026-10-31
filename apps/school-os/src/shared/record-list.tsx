import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import type { Selection } from 'react-aria-components'

import {
  AltArrowDown,
  AltArrowRight,
  AltArrowUp,
  CheckCircle,
  Close,
  Filter,
  Hashtag,
  Link,
  Pen,
  SliderVertical,
  Sort,
  SortVertical,
  TrashBinTrash
} from '@vezham/icons-react'
import { ActionBar, EmptyState } from '@vezham/react-pro-v3'
import {
  Button,
  Checkbox,
  Chip,
  CloseButton,
  Dropdown,
  Label,
  ListBox,
  Pagination,
  Select,
  Separator,
  type SortDescriptor,
  Surface,
  Table,
  Tooltip,
  useMediaQuery
} from '@vezham/react-v3'
import { useMobileToolbarNavigation } from '@vezham/react/layouts/section'
import { PaginationControls } from '@vezham/react/pagination'

export type EntityRecord = {
  createdAt: string
  id: string
  status: string
}

export type EntityColumn<Key extends string> = {
  defaultWidth: number
  id: Key
  isNumeric?: boolean
  label: string
  minWidth: number
}

export type EntityFilter<Key extends string> = {
  id: Key
  label: string
  options: readonly string[]
}

export const createEntityFilters = <Key extends string>(keys: readonly Key[]) =>
  Object.fromEntries(keys.map(key => [key, null])) as Record<Key, string | null>

type EntityActiveFiltersProps<Key extends string> = {
  filters: readonly EntityFilter<Key>[]
  values: Readonly<Record<Key, string | null>>
  onRemove: (key: Key) => void
}

export const EntityActiveFilters = <Key extends string>({
  filters,
  values,
  onRemove
}: EntityActiveFiltersProps<Key>) => {
  const activeFilters = filters.flatMap(filter => {
    const value = values[filter.id]
    return value ? [{ filter, value }] : []
  })

  if (activeFilters.length === 0) return null

  return (
    <div
      role="group"
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-2">
      {activeFilters.map(({ filter, value }) => {
        const label = `${filter.label}: ${value}`

        return (
          <Chip
            key={filter.id}
            color="default"
            variant="soft"
            className="gap-1.5">
            <Chip.Label>{label}</Chip.Label>
            <CloseButton
              aria-label={`Remove ${label} filter`}
              className="h-5 min-h-5 w-5 min-w-5 rounded-full p-0"
              onPress={() => onRemove(filter.id)}
            />
          </Chip>
        )
      })}
    </div>
  )
}

type UseEntityListOptions<Row extends EntityRecord, Key extends string> = {
  columnKeys: readonly Key[]
  filterKeys: readonly Key[]
  getSearchValues: (row: Row) => readonly string[]
  initialRecords: readonly Row[]
  initialSort: SortDescriptor
  searchQuery?: string
}

export const useEntityList = <Row extends EntityRecord, Key extends string>({
  columnKeys,
  filterKeys,
  getSearchValues,
  initialRecords,
  initialSort,
  searchQuery = ''
}: UseEntityListOptions<Row, Key>) => {
  const [records, setRecords] = useState<Row[]>(() => [...initialRecords])
  const [filters, setFilters] = useState<Record<Key, string | null>>(() =>
    createEntityFilters(filterKeys)
  )
  const [draftFilters, setDraftFilters] = useState(filters)
  const [visibleColumns, setVisibleColumns] = useState<Set<Key>>(
    () => new Set(columnKeys)
  )
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [sortDescriptor, setSortDescriptor] =
    useState<SortDescriptor>(initialSort)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      if (hiddenIds.has(record.id)) return false
      const query = searchQuery.trim().toLowerCase()
      if (
        query &&
        !getSearchValues(record).some(value =>
          value.toLowerCase().includes(query)
        )
      )
        return false

      return filterKeys.every(key => {
        const filterValue = filters[key]
        if (!filterValue) return true
        return String((record as Record<string, unknown>)[key]) === filterValue
      })
    })
  }, [filterKeys, filters, getSearchValues, hiddenIds, records, searchQuery])

  const sortedRecords = useMemo(() => {
    const column = String(sortDescriptor.column)
    const direction = sortDescriptor.direction === 'descending' ? -1 : 1

    return [...filteredRecords].sort((first, second) => {
      const firstValue = String(
        (first as Record<string, unknown>)[column] ?? ''
      )
      const secondValue = String(
        (second as Record<string, unknown>)[column] ?? ''
      )

      return (
        firstValue.localeCompare(secondValue, undefined, { numeric: true }) *
        direction
      )
    })
  }, [filteredRecords, sortDescriptor])

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRecords = sortedRecords.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedIds =
    selectedKeys === 'all'
      ? new Set(pageRecords.map(record => record.id))
      : new Set(Array.from(selectedKeys, String))
  const selectedRecords = pageRecords.filter(record =>
    selectedIds.has(record.id)
  )

  const resetPage = useCallback(() => {
    setPage(1)
    setSelectedKeys(new Set())
  }, [])

  return {
    currentPage,
    draftFilters,
    filters,
    pageRecords,
    pageSize,
    records,
    selectedKeys,
    selectedRecords,
    setDraftFilters,
    setFilters,
    setHiddenIds,
    setPage,
    setPageSize,
    setRecords,
    setSelectedKeys,
    setSortDescriptor,
    setVisibleColumns,
    sortedRecords,
    sortDescriptor,
    totalPages,
    visibleColumns,
    resetPage
  }
}

export type EntityToolbarProps<Key extends string> = {
  columns: readonly EntityColumn<Key>[]
  draftFilters: Record<Key, string | null>
  filters: readonly EntityFilter<Key>[]
  pageKey: string
  sortDescriptor: SortDescriptor
  visibleColumns: ReadonlySet<Key>
  onApplyFilters: () => void
  onDraftFiltersChange: (filters: Record<Key, string | null>) => void
  onResetFilters: () => void
  onSortChange: (descriptor: SortDescriptor) => void
  onVisibleColumnsChange: (columns: Set<Key>) => void
}

const toolbarButtonClassName = 'h-9 w-9 min-w-9 shrink-0 rounded-full p-0'

const EntityFilterFields = <Key extends string>({
  draftFilters,
  filters,
  onApplyFilters,
  onDraftFiltersChange,
  onResetFilters
}: Pick<
  EntityToolbarProps<Key>,
  | 'draftFilters'
  | 'filters'
  | 'onApplyFilters'
  | 'onDraftFiltersChange'
  | 'onResetFilters'
>) => (
  <>
    {filters.map(filter => (
      <Select
        key={filter.id}
        fullWidth
        aria-label={`Filter by ${filter.label.toLowerCase()}`}
        placeholder={`Select ${filter.label.toLowerCase()}`}
        value={draftFilters[filter.id]}
        onChange={value =>
          onDraftFiltersChange({
            ...draftFilters,
            [filter.id]: value ? String(value) : null
          })
        }>
        <Label>{filter.label}</Label>
        <Select.Trigger className="border-border bg-surface-secondary focus-within:border-accent dark:border-foreground/20">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {filter.options.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    ))}
    <div className="flex justify-end gap-2 pt-1">
      <Button variant="secondary" onPress={onResetFilters}>
        Reset
      </Button>
      <Button onPress={onApplyFilters}>Apply</Button>
    </div>
  </>
)

const EntityToolbarControls = <Key extends string>({
  columns,
  draftFilters,
  filters,
  sortDescriptor,
  visibleColumns,
  onApplyFilters,
  onDraftFiltersChange,
  onResetFilters,
  onSortChange,
  onVisibleColumnsChange
}: EntityToolbarProps<Key>) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const hasFilters = Object.values(draftFilters).some(Boolean)
  const selectedSort = columns.find(
    column => column.id === String(sortDescriptor.column)
  )

  const handleApplyFilters = () => {
    onApplyFilters()
    setIsFilterOpen(false)
  }

  const handleResetFilters = () => {
    onResetFilters()
    setIsFilterOpen(false)
  }

  return (
    <div
      role="group"
      aria-label="Table controls"
      className="flex items-center gap-1">
      <Separator orientation="vertical" className="h-8" />
      <Dropdown isOpen={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Tooltip delay={0}>
          <Button
            isIconOnly
            aria-label="Filter"
            aria-pressed={hasFilters}
            className={toolbarButtonClassName}
            size="sm"
            variant={hasFilters ? 'secondary' : 'ghost'}>
            <Filter size={18} aria-hidden="true" />
          </Button>
          <Tooltip.Content>Filter</Tooltip.Content>
        </Tooltip>
        <Dropdown.Popover className="w-80 max-w-[calc(100vw-2rem)]">
          <Surface className="flex flex-col gap-4 rounded-2xl p-4">
            <EntityFilterFields
              draftFilters={draftFilters}
              filters={filters}
              onApplyFilters={handleApplyFilters}
              onDraftFiltersChange={onDraftFiltersChange}
              onResetFilters={handleResetFilters}
            />
          </Surface>
        </Dropdown.Popover>
      </Dropdown>

      <Dropdown>
        <Tooltip delay={0}>
          <Button
            isIconOnly
            aria-label="Columns"
            className={toolbarButtonClassName}
            size="sm"
            variant="ghost">
            <SliderVertical size={18} aria-hidden="true" />
          </Button>
          <Tooltip.Content>Columns</Tooltip.Content>
        </Tooltip>
        <Dropdown.Popover>
          <Dropdown.Menu
            aria-label="Show or hide columns"
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={keys => {
              const nextColumns =
                keys === 'all'
                  ? new Set(columns.map(column => column.id))
                  : new Set(Array.from(keys) as Key[])

              if (nextColumns.size) onVisibleColumnsChange(nextColumns)
            }}>
            {columns.map(column => (
              <Dropdown.Item
                key={column.id}
                id={column.id}
                textValue={column.label}>
                <span className="flex w-full items-center justify-between">
                  {column.label}
                  <Dropdown.ItemIndicator />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Dropdown>
        <Tooltip delay={0}>
          <Button
            isIconOnly
            aria-label="Sort"
            className={toolbarButtonClassName}
            size="sm"
            variant="ghost">
            <Sort size={18} aria-hidden="true" />
          </Button>
          <Tooltip.Content>
            Sort: {selectedSort?.label ?? 'Recently added'}
          </Tooltip.Content>
        </Tooltip>
        <Dropdown.Popover>
          <Dropdown.Menu
            aria-label="Sort records"
            selectedKeys={
              new Set([
                String(sortDescriptor.column),
                String(sortDescriptor.direction)
              ])
            }
            selectionMode="multiple">
            <Dropdown.Section aria-label="Sort field">
              {columns.map(column => (
                <Dropdown.Item
                  key={column.id}
                  id={column.id}
                  textValue={column.label}
                  onPress={() =>
                    onSortChange({
                      column: column.id,
                      direction: sortDescriptor.direction
                    })
                  }>
                  <span className="flex w-full items-center justify-between">
                    {column.label}
                    <Dropdown.ItemIndicator />
                  </span>
                </Dropdown.Item>
              ))}
            </Dropdown.Section>
            <Separator />
            {(['ascending', 'descending'] as const).map(direction => (
              <Dropdown.Item
                key={direction}
                id={direction}
                textValue={direction}
                onPress={() =>
                  onSortChange({
                    column: String(sortDescriptor.column),
                    direction
                  })
                }>
                <span className="flex w-full items-center justify-between">
                  {direction === 'ascending' ? 'Ascending' : 'Descending'}
                  <Dropdown.ItemIndicator />
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Separator orientation="vertical" className="h-8" />
    </div>
  )
}

const mobileActionClassName =
  'flex h-auto min-h-11 w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-start'

export const EntityHeaderToolbar = <Key extends string>(
  props: EntityToolbarProps<Key>
) => {
  const isCompactToolbar = useMediaQuery('(max-width: 767px)', {
    initializeWithValue: false
  })

  if (isCompactToolbar) return null

  return <EntityToolbarControls {...props} />
}

export const EntityMobileToolbar = <Key extends string>({
  columns,
  draftFilters,
  filters,
  pageKey,
  sortDescriptor,
  visibleColumns,
  onApplyFilters,
  onDraftFiltersChange,
  onResetFilters,
  onSortChange,
  onVisibleColumnsChange
}: EntityToolbarProps<Key>) => {
  const { closeSheet, openPage, page } = useMobileToolbarNavigation()
  const filterPageKey = `${pageKey}-filter`
  const columnsPageKey = `${pageKey}-columns`
  const sortPageKey = `${pageKey}-sort`
  const selectedSort = columns.find(
    column => column.id === String(sortDescriptor.column)
  )
  const selectSort = (
    column: string,
    direction: 'ascending' | 'descending'
  ) => {
    onSortChange({ column, direction })
    closeSheet()
  }

  if (page?.key === filterPageKey) {
    return (
      <div className="flex flex-col gap-5 px-3 pt-2">
        <EntityFilterFields
          draftFilters={draftFilters}
          filters={filters}
          onApplyFilters={() => {
            onApplyFilters()
            closeSheet()
          }}
          onDraftFiltersChange={onDraftFiltersChange}
          onResetFilters={() => {
            onResetFilters()
            closeSheet()
          }}
        />
      </div>
    )
  }

  if (page?.key === columnsPageKey) {
    return (
      <div className="flex flex-col gap-1 px-3 pt-2">
        <Label className="text-muted px-3 pt-2">Visible columns</Label>
        {columns.map(column => {
          const isSelected = visibleColumns.has(column.id)

          return (
            <Button
              key={column.id}
              aria-pressed={isSelected}
              className={mobileActionClassName}
              variant="ghost"
              onPress={() => {
                if (isSelected && visibleColumns.size === 1) return

                const nextColumns = new Set(visibleColumns)
                if (isSelected) nextColumns.delete(column.id)
                else nextColumns.add(column.id)

                onVisibleColumnsChange(nextColumns)
              }}>
              <span className="flex-1">{column.label}</span>
              {isSelected && (
                <CheckCircle size={18} aria-hidden="true" weight="filled" />
              )}
            </Button>
          )
        })}
      </div>
    )
  }

  if (page?.key === sortPageKey) {
    return (
      <div className="flex flex-col gap-1 px-3 pt-2">
        <Label className="text-muted px-3 pt-2">Sort by</Label>
        {columns.map(column => {
          const isSelected = sortDescriptor.column === column.id

          return (
            <Button
              key={column.id}
              aria-pressed={isSelected}
              className={mobileActionClassName}
              variant="ghost"
              onPress={() => selectSort(column.id, sortDescriptor.direction)}>
              <span className="flex-1">{column.label}</span>
              {isSelected && (
                <CheckCircle size={18} aria-hidden="true" weight="filled" />
              )}
            </Button>
          )
        })}
        <Separator className="my-1" />
        <Label className="text-muted px-3 pt-2">Direction</Label>
        {(['ascending', 'descending'] as const).map(direction => {
          const isSelected = sortDescriptor.direction === direction

          return (
            <Button
              key={direction}
              aria-pressed={isSelected}
              className={mobileActionClassName}
              variant="ghost"
              onPress={() =>
                selectSort(String(sortDescriptor.column), direction)
              }>
              <span className="flex-1">
                {direction === 'ascending' ? 'Ascending' : 'Descending'}
              </span>
              {isSelected && (
                <CheckCircle size={18} aria-hidden="true" weight="filled" />
              )}
            </Button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label="Table controls"
      className="flex flex-col gap-1">
      <Button
        className={mobileActionClassName}
        variant="ghost"
        onPress={() => openPage({ key: filterPageKey, title: 'Filter' })}>
        <Filter size={18} aria-hidden="true" />
        <span className="flex-1">Filter</span>
        <AltArrowRight size={18} aria-hidden="true" />
      </Button>
      <Button
        className={mobileActionClassName}
        variant="ghost"
        onPress={() => openPage({ key: columnsPageKey, title: 'Columns' })}>
        <SliderVertical size={18} aria-hidden="true" />
        <span className="flex-1">Columns</span>
        <AltArrowRight size={18} aria-hidden="true" />
      </Button>
      <Button
        className={mobileActionClassName}
        variant="ghost"
        onPress={() => openPage({ key: sortPageKey, title: 'Sort' })}>
        <Sort size={18} aria-hidden="true" />
        <span className="flex-1">
          Sort: {selectedSort?.label ?? 'Recently added'}
        </span>
        <AltArrowRight size={18} aria-hidden="true" />
      </Button>
    </div>
  )
}

type EntityTableProps<Row extends EntityRecord, Key extends string> = {
  columns: readonly EntityColumn<Key>[]
  currentPage: number
  entityLabel: string
  pluralLabel?: string
  pageSize: number
  records: readonly Row[]
  selectedKeys: Selection
  sortDescriptor: SortDescriptor
  totalItems: number
  totalPages: number
  visibleColumns: ReadonlySet<Key>
  renderCell: (record: Row, column: Key) => ReactNode
  onClearSelection: () => void
  onCopyIds: () => void
  onCopyLinks: () => void
  onDelete: () => void
  onEdit: () => void
  onOpenRecord: (record: Row) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSelectionChange: (keys: Selection) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export const EntityTable = <Row extends EntityRecord, Key extends string>({
  columns,
  currentPage,
  entityLabel,
  pluralLabel,
  pageSize,
  records,
  selectedKeys,
  sortDescriptor,
  totalItems,
  totalPages,
  visibleColumns,
  renderCell,
  onClearSelection,
  onCopyIds,
  onCopyLinks,
  onDelete,
  onEdit,
  onOpenRecord,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  onSortChange
}: EntityTableProps<Row, Key>) => {
  const visible = columns.filter(column => visibleColumns.has(column.id))
  const selectedCount =
    selectedKeys === 'all' ? records.length : selectedKeys.size
  const tableMinWidth =
    40 + visible.reduce((total, column) => total + column.defaultWidth, 0)
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastItem = Math.min(currentPage * pageSize, totalItems)
  const resolvedPluralLabel = pluralLabel ?? `${entityLabel}s`

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden">
      <Table className="min-h-0 min-w-0">
        <Table.ScrollContainer className="min-h-0 overflow-auto">
          <Table.ResizableContainer className="academic-entity-table__resizable-container">
            <Table.Content
              aria-label={resolvedPluralLabel}
              className="academic-entity-table__content min-w-[640px] [&_.table__column]:sticky [&_.table__column]:top-0 [&_.table__column]:z-[3]"
              style={{ minWidth: `${tableMinWidth}px` }}
              selectedKeys={selectedKeys}
              selectionBehavior="toggle"
              selectionMode="multiple"
              sortDescriptor={sortDescriptor}
              onSelectionChange={onSelectionChange}
              onSortChange={onSortChange}>
              <Table.Header>
                <Table.Column
                  className="bg-surface-secondary sticky left-0 z-[5]"
                  width={40}>
                  <Checkbox
                    aria-label={`Select all ${pluralLabel}`}
                    slot="selection">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Content>
                  </Checkbox>
                </Table.Column>
                {visible.map((column, index) => (
                  <Table.Column
                    key={column.id}
                    allowsSorting
                    className={
                      index === 0
                        ? 'bg-surface-secondary sticky left-10 z-[5]'
                        : undefined
                    }
                    defaultWidth={column.defaultWidth}
                    id={column.id}
                    isRowHeader={index === 0}
                    minWidth={column.minWidth}>
                    {({ sortDirection }) => (
                      <>
                        <span className="flex items-center gap-2">
                          {column.label}
                          {sortDirection === 'ascending' ? (
                            <AltArrowUp size={14} aria-hidden="true" />
                          ) : sortDirection === 'descending' ? (
                            <AltArrowDown size={14} aria-hidden="true" />
                          ) : (
                            <SortVertical size={14} aria-hidden="true" />
                          )}
                        </span>
                      </>
                    )}
                  </Table.Column>
                ))}
              </Table.Header>
              <Table.Body
                renderEmptyState={() => (
                  <div className="py-10">
                    <EmptyState size="sm">
                      <EmptyState.Header>
                        <EmptyState.Title>
                          No {resolvedPluralLabel} found
                        </EmptyState.Title>
                        <EmptyState.Description>
                          Adjust the filters to see records.
                        </EmptyState.Description>
                      </EmptyState.Header>
                    </EmptyState>
                  </div>
                )}>
                {records.map(record => (
                  <Table.Row key={record.id} id={record.id}>
                    <Table.Cell className="bg-surface-secondary sticky left-0 z-[2]">
                      <Checkbox
                        aria-label={`Select ${entityLabel} ${record.id}`}
                        slot="selection"
                        onClick={event => event.stopPropagation()}>
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Content>
                      </Checkbox>
                    </Table.Cell>
                    {visible.map((column, index) => (
                      <Table.Cell
                        key={column.id}
                        className={
                          index === 0
                            ? 'bg-surface-secondary sticky left-10 z-[2]'
                            : undefined
                        }
                        onClick={() => onOpenRecord(record)}>
                        {renderCell(record, column.id)}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table.ScrollContainer>
      </Table>
      <Pagination className="flex w-full flex-col items-center gap-3 px-1 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Pagination.Summary>
            {firstItem}-{lastItem} of {totalItems}
          </Pagination.Summary>
          <Select
            aria-label={`${pluralLabel} per page`}
            value={String(pageSize)}
            onChange={value => onPageSizeChange(Number(value))}>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {[5, 10, 12].map(option => (
                  <ListBox.Item
                    key={option}
                    id={String(option)}
                    textValue={String(option)}>
                    {option}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <span className="text-muted text-sm">per page</span>
        </div>
        <PaginationControls
          className="self-center sm:self-auto"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={nextPage =>
            onPageChange(
              typeof nextPage === 'function' ? nextPage(currentPage) : nextPage
            )
          }
        />
      </Pagination>
      <ActionBar
        aria-label={`Selected ${resolvedPluralLabel} actions`}
        isOpen={selectedCount > 0}>
        <ActionBar.Prefix>
          <Chip className="shrink-0 tabular-nums" size="sm">
            {selectedCount}
          </Chip>
        </ActionBar.Prefix>
        <Separator />
        <ActionBar.Content>
          <Button
            aria-label={`Edit selected ${entityLabel}`}
            isDisabled={selectedCount !== 1}
            size="sm"
            variant="ghost"
            onPress={onEdit}>
            <Pen size={16} aria-hidden="true" />
            <span className="action-bar__label">Edit</span>
          </Button>
          <Button
            aria-label={`Copy selected ${resolvedPluralLabel} IDs`}
            size="sm"
            variant="ghost"
            onPress={onCopyIds}>
            <Hashtag size={16} aria-hidden="true" />
            <span className="action-bar__label">Copy IDs</span>
          </Button>
          <Button
            aria-label={`Copy selected ${resolvedPluralLabel} links`}
            size="sm"
            variant="ghost"
            onPress={onCopyLinks}>
            <Link size={16} aria-hidden="true" />
            <span className="action-bar__label">Copy Links</span>
          </Button>
          <Button
            aria-label={`Delete selected ${resolvedPluralLabel}`}
            className="bg-danger/10 text-danger"
            size="sm"
            variant="ghost"
            onPress={onDelete}>
            <TrashBinTrash size={16} aria-hidden="true" />
            <span className="action-bar__label">Delete</span>
          </Button>
        </ActionBar.Content>
        <Separator />
        <ActionBar.Suffix>
          <Button
            isIconOnly
            aria-label="Clear selection"
            size="sm"
            variant="ghost"
            onPress={onClearSelection}>
            <Close size={16} aria-hidden="true" />
          </Button>
        </ActionBar.Suffix>
      </ActionBar>
    </div>
  )
}
