import {
  type DetailTab,
  DetailTabs,
  getDetailTabId
} from '@component/detail-tabs'
import { StatusSwitchContent } from '@component/status-switch-content'
import type { ReactNode } from 'react'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

import { Book, Pen } from '@vezham/icons-react'
import { Sheet } from '@vezham/react-pro-v3'
import {
  Button,
  Chip,
  InputGroup,
  Label,
  Surface,
  Switch,
  TextField,
  Tooltip,
  toast,
  useMediaQuery
} from '@vezham/react-v3'
import { useSectionToolbarContent } from '@vezham/react/layouts/section'
import { useMobileControls } from '@vezham/react/mobile-controls'
import { useToolbarAction } from '@vezham/react/toolbar-actions'

import {
  EntityActiveFilters,
  type EntityColumn,
  type EntityFilter,
  EntityHeaderToolbar,
  EntityMobileToolbar,
  type EntityRecord,
  EntityTable,
  type EntityToolbarProps,
  createEntityFilters,
  useEntityList
} from './record-list'

type EntityField<Key extends string> = {
  id: Key
  label: string
  type?: 'number' | 'text'
}

export type AcademicEntityConfig<
  Row extends EntityRecord,
  Key extends string
> = {
  columns: readonly EntityColumn<Key>[]
  createDraft: () => Row
  createId: (records: readonly Row[]) => string
  detailTabs?: readonly DetailTab[]
  entityLabel: string
  pluralLabel?: string
  fields: readonly EntityField<Key>[]
  filters: readonly EntityFilter<Key>[]
  getSearchValues: (record: Row) => readonly string[]
  initialRecords: readonly Row[]
  getRecordSummary?: (record: Row) => string
  pageKey: string
  pathname: string
}

type EntityEditorProps<Row extends EntityRecord, Key extends string> = {
  config: AcademicEntityConfig<Row, Key>
  isCreateMode: boolean
  isOpen: boolean
  record: Row | null
  onOpenChange: (isOpen: boolean) => void
  onSave: (record: Row) => void
}

const EntityEditor = <Row extends EntityRecord, Key extends string>({
  config,
  isCreateMode,
  isOpen,
  record,
  onOpenChange,
  onSave
}: EntityEditorProps<Row, Key>) => {
  const isCompactSheet = useMediaQuery('(width < 768px)', {
    initializeWithValue: false
  })
  const [draft, setDraft] = useState<Row | null>(record)
  const activeRecord = draft ?? record

  const update = (id: Key, value: string) => {
    if (!activeRecord) return
    setDraft({ ...activeRecord, [id]: value })
  }

  return (
    <Sheet
      isOpen={isOpen}
      placement={isCompactSheet ? 'bottom' : 'right'}
      isHandleOnly={isCompactSheet}
      shouldAutoFocus={isCompactSheet}
      onOpenChange={onOpenChange}>
      <Sheet.Backdrop variant="blur" className="bg-overlay/10">
        <Sheet.Content
          className={
            isCompactSheet
              ? 'mx-auto h-[75dvh] max-h-[75dvh] w-full max-w-2xl'
              : 'w-full sm:w-[28rem]'
          }>
          <Sheet.Dialog
            className={
              isCompactSheet
                ? 'flex h-full max-h-none min-h-0 flex-col rounded-t-[1.75rem]'
                : undefined
            }>
            {isCompactSheet && <Sheet.Handle />}
            <Sheet.CloseTrigger
              aria-label={`Close ${config.entityLabel} editor`}
            />
            {activeRecord && (
              <>
                <Sheet.Header className="pr-12">
                  <Sheet.Heading>
                    {isCreateMode
                      ? `Add ${config.entityLabel}`
                      : `Edit ${config.entityLabel}`}
                  </Sheet.Heading>
                  {!isCreateMode && (
                    <p className="text-muted mt-1 text-sm">
                      ID {activeRecord.id}
                    </p>
                  )}
                </Sheet.Header>
                <Sheet.Body className="flex flex-col gap-5">
                  {config.fields.map(field => (
                    <TextField key={field.id} aria-label={field.label}>
                      <Label>{field.label}</Label>
                      <InputGroup className="border-border bg-surface-secondary focus-within:border-accent dark:border-foreground/20">
                        <InputGroup.Input
                          min={field.type === 'number' ? '0' : undefined}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          type={field.type}
                          value={String(
                            (activeRecord as Record<string, unknown>)[
                              field.id
                            ] ?? ''
                          )}
                          onChange={event =>
                            update(field.id, event.target.value)
                          }
                        />
                      </InputGroup>
                    </TextField>
                  ))}
                  <Switch
                    aria-label={`${config.entityLabel} status`}
                    isSelected={activeRecord.status === 'Active'}
                    onChange={isSelected =>
                      setDraft({
                        ...activeRecord,
                        status: isSelected ? 'Active' : 'Inactive'
                      })
                    }>
                    <StatusSwitchContent />
                  </Switch>
                </Sheet.Body>
                <Sheet.Footer className="justify-end gap-2">
                  <Sheet.Close>
                    <Button variant="secondary">Cancel</Button>
                  </Sheet.Close>
                  <Button
                    isDisabled={config.fields.some(
                      field =>
                        !String(
                          (activeRecord as Record<string, unknown>)[field.id] ??
                            ''
                        ).trim()
                    )}
                    onPress={() => onSave(activeRecord)}>
                    {isCreateMode ? `Add ${config.entityLabel}` : 'Save'}
                  </Button>
                </Sheet.Footer>
              </>
            )}
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}

type EntityDetailsProps<Row extends EntityRecord, Key extends string> = {
  config: AcademicEntityConfig<Row, Key>
  record: Row | null
  onEdit: (record: Row) => void
  onOpenChange: (isOpen: boolean) => void
}

const defaultDetailTabs: readonly DetailTab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'notes', label: 'Notes' }
]

const EntityDetailSection = ({
  children,
  title
}: {
  children: ReactNode
  title: string
}) => (
  <section>
    <h3 className="text-sm font-medium">{title}</h3>
    <p className="text-muted mt-2 text-sm">{children}</p>
  </section>
)

const EntityDetails = <Row extends EntityRecord, Key extends string>({
  config,
  record,
  onEdit,
  onOpenChange
}: EntityDetailsProps<Row, Key>) => {
  const isCompactSheet = useMediaQuery('(width < 768px)', {
    initializeWithValue: false
  })
  const [tab, setTab] = useState(defaultDetailTabs[0].id)
  const tabs = config.detailTabs ?? defaultDetailTabs
  const detailTabs = useMemo(
    () => (isCompactSheet ? [{ id: 'home', label: 'Home' }, ...tabs] : tabs),
    [isCompactSheet, tabs]
  )
  const summary = record
    ? (config.getRecordSummary?.(record) ??
      `${config.entityLabel} ${record.id} is ${record.status.toLowerCase()}.`)
    : ''
  const activeTab = detailTabs.some(detailTab => detailTab.id === tab)
    ? tab
    : (detailTabs[0]?.id ?? defaultDetailTabs[0].id)

  const renderTab = () => {
    if (!record) return null

    if (activeTab === 'home')
      return (
        <div className="flex max-w-2xl flex-col gap-8">
          <EntityDetailSection title={`${config.entityLabel} summary`}>
            {summary}
          </EntityDetailSection>
          {tabs
            .filter(item => item.id !== 'overview')
            .map(item => (
              <EntityDetailSection key={item.id} title={item.label}>
                {item.id === 'notes'
                  ? 'No notes have been added yet.'
                  : `No ${item.label.toLowerCase()} entries have been added yet.`}
              </EntityDetailSection>
            ))}
        </div>
      )

    if (activeTab === 'overview')
      return (
        <div className="flex max-w-2xl flex-col gap-8">
          <EntityDetailSection title={`${config.entityLabel} summary`}>
            {summary}
          </EntityDetailSection>
          <EntityDetailSection title="Recent activity">
            Record created on {record.createdAt}.
          </EntityDetailSection>
        </div>
      )

    const detailTab = tabs.find(item => item.id === activeTab)

    return (
      <EntityDetailSection title={detailTab?.label ?? 'Details'}>
        {activeTab === 'notes'
          ? 'No notes have been added yet.'
          : `No ${detailTab?.label.toLowerCase() ?? 'detail'} entries have been added yet.`}
      </EntityDetailSection>
    )
  }

  return (
    <Sheet
      isOpen={Boolean(record)}
      placement={isCompactSheet ? 'bottom' : 'right'}
      isHandleOnly={isCompactSheet}
      shouldAutoFocus={isCompactSheet}
      onOpenChange={onOpenChange}>
      <Sheet.Backdrop variant="blur" className="bg-overlay/10">
        <Sheet.Content
          className={
            isCompactSheet
              ? 'mx-auto h-[70dvh] max-h-[70dvh] w-full max-w-2xl'
              : 'inset-y-0 flex h-svh w-full flex-col sm:w-[min(72rem,calc(100vw-1.5rem))]'
          }>
          <Sheet.Dialog
            className={`relative flex h-full min-h-0 flex-col ${
              isCompactSheet ? 'max-h-none rounded-t-[1.75rem]' : ''
            }`}>
            {isCompactSheet && <Sheet.Handle />}
            <Sheet.CloseTrigger
              aria-label={`Close ${config.entityLabel} details`}
            />
            {record && (
              <>
                <Sheet.Header className="shrink-0 gap-3 pr-12">
                  <Sheet.Heading className="sr-only">
                    {config.entityLabel} details
                  </Sheet.Heading>
                  <DetailTabs
                    ariaLabel={`${config.entityLabel} sections`}
                    idPrefix={`${config.pageKey}-detail`}
                    selectedKey={activeTab}
                    tabs={detailTabs}
                    onSelectionChange={setTab}
                  />
                </Sheet.Header>
                <Sheet.Body className="min-h-0 flex-1 overflow-hidden p-0">
                  <div className="flex h-full min-h-0">
                    <div
                      aria-labelledby={getDetailTabId(
                        `${config.pageKey}-detail`,
                        activeTab
                      )}
                      className="min-w-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8"
                      id={`${config.pageKey}-${activeTab}-panel`}
                      role="tabpanel">
                      <div className="mb-8 flex items-center gap-3">
                        <Surface className="flex size-11 shrink-0 items-center justify-center rounded-xl p-0">
                          <Book size={22} aria-hidden="true" />
                        </Surface>
                        <div className="min-w-0">
                          <p className="text-lg font-semibold">
                            {config.entityLabel}
                          </p>
                          <p className="text-muted text-sm">ID {record.id}</p>
                        </div>
                      </div>
                      {renderTab()}
                    </div>
                    <aside className="border-separator hidden w-72 shrink-0 overflow-y-auto border-l px-5 py-6 md:block">
                      <div className="flex flex-col gap-8">
                        <section>
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-muted text-base font-semibold">
                              {config.entityLabel} details
                            </p>
                            <Button
                              aria-label={`Edit ${config.entityLabel}`}
                              size="sm"
                              variant="secondary"
                              onPress={() => onEdit(record)}>
                              <Pen size={16} aria-hidden="true" />
                              Edit
                            </Button>
                          </div>
                          <dl className="mt-3 flex flex-col gap-3">
                            {config.columns.map(column => (
                              <div
                                key={column.id}
                                className="flex items-start justify-between gap-3">
                                <dt className="text-muted text-xs">
                                  {column.label}
                                </dt>
                                <dd className="max-w-[11rem] text-right text-sm">
                                  {column.id === 'status' ? (
                                    <Chip
                                      color={
                                        record.status === 'Active'
                                          ? 'success'
                                          : record.status === 'Inactive'
                                            ? 'danger'
                                            : 'accent'
                                      }
                                      size="sm"
                                      variant="soft">
                                      <Chip.Label>{record.status}</Chip.Label>
                                    </Chip>
                                  ) : (
                                    String(
                                      (record as Record<string, unknown>)[
                                        column.id
                                      ] ?? ''
                                    )
                                  )}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </section>
                        <EntityDetailSection title="Notes">
                          No notes have been added yet.
                        </EntityDetailSection>
                      </div>
                    </aside>
                  </div>
                </Sheet.Body>
                <Tooltip delay={0}>
                  <Button
                    isIconOnly
                    aria-label={`Edit ${config.entityLabel}`}
                    className="absolute right-3 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+0.5rem)] z-10 h-11 w-11 rounded-full p-0 shadow-lg md:hidden"
                    variant="primary"
                    onPress={() => onEdit(record)}>
                    <Pen size={22} aria-hidden="true" />
                  </Button>
                  <Tooltip.Content>Edit {config.entityLabel}</Tooltip.Content>
                </Tooltip>
              </>
            )}
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}

type Props<Row extends EntityRecord, Key extends string> = {
  config: AcademicEntityConfig<Row, Key>
  searchQuery: string
}

export const AcademicEntityPage = <
  Row extends EntityRecord,
  Key extends string
>({
  config,
  searchQuery
}: Props<Row, Key>) => {
  const page = useEntityList({
    columnKeys: config.columns.map(column => column.id),
    filterKeys: config.filters.map(filter => filter.id),
    getSearchValues: config.getSearchValues,
    initialRecords: config.initialRecords,
    initialSort: { column: 'createdAt', direction: 'descending' },
    searchQuery
  })
  const [detailRecord, setDetailRecord] = useState<Row | null>(null)
  const [editingRecord, setEditingRecord] = useState<Row | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { setIsFooterHidden } = useMobileControls()
  const isCompactToolbar = useMediaQuery('(max-width: 767px)', {
    initializeWithValue: false
  })

  useLayoutEffect(() => {
    setIsFooterHidden(
      isCompactToolbar &&
        Boolean(
          detailRecord ||
          editingRecord ||
          isCreateOpen ||
          page.selectedRecords.length
        )
    )

    return () => setIsFooterHidden(false)
  }, [
    detailRecord,
    editingRecord,
    isCompactToolbar,
    isCreateOpen,
    page.selectedRecords.length,
    setIsFooterHidden
  ])

  useToolbarAction('create', () => setIsCreateOpen(true), {
    pageKey: config.pageKey,
    pathname: config.pathname
  })

  const applyFilters = useCallback(() => {
    page.setFilters(page.draftFilters)
    page.resetPage()
  }, [page.draftFilters, page.resetPage, page.setFilters])
  const resetFilters = useCallback(() => {
    const empty = createEntityFilters(config.filters.map(filter => filter.id))

    page.setDraftFilters(empty)
    page.setFilters(empty)
    page.resetPage()
  }, [config.filters, page.resetPage, page.setDraftFilters, page.setFilters])
  const removeFilter = useCallback(
    (key: Key) => {
      const nextFilters = { ...page.filters, [key]: null }
      page.setDraftFilters(nextFilters)
      page.setFilters(nextFilters)
      page.resetPage()
    },
    [page.filters, page.resetPage, page.setDraftFilters, page.setFilters]
  )
  const handleSortChange = useCallback(
    (descriptor: Parameters<typeof page.setSortDescriptor>[0]) => {
      page.setSortDescriptor(descriptor)
      page.resetPage()
    },
    [page.resetPage, page.setSortDescriptor]
  )
  const toolbarProps = useMemo<EntityToolbarProps<Key>>(
    () => ({
      columns: config.columns,
      draftFilters: page.draftFilters,
      filters: config.filters,
      pageKey: config.pageKey,
      sortDescriptor: page.sortDescriptor,
      visibleColumns: page.visibleColumns,
      onApplyFilters: applyFilters,
      onDraftFiltersChange: page.setDraftFilters,
      onResetFilters: resetFilters,
      onSortChange: handleSortChange,
      onVisibleColumnsChange: page.setVisibleColumns
    }),
    [
      applyFilters,
      config.columns,
      config.filters,
      config.pageKey,
      handleSortChange,
      page.draftFilters,
      page.setDraftFilters,
      page.setVisibleColumns,
      page.sortDescriptor,
      page.visibleColumns,
      resetFilters
    ]
  )
  const toolbarContent = useMemo(
    () => ({
      desktop: <EntityHeaderToolbar {...toolbarProps} />,
      mobile: <EntityMobileToolbar {...toolbarProps} />
    }),
    [toolbarProps]
  )

  useSectionToolbarContent(toolbarContent)

  const save = (record: Row, isCreateMode: boolean) => {
    if (isCreateMode) {
      const nextRecord = {
        ...record,
        createdAt: new Date().toISOString().slice(0, 10),
        id: config.createId(page.records)
      }
      page.setRecords(current => [nextRecord, ...current])
      setIsCreateOpen(false)
      page.resetPage()
      toast.success(`${config.entityLabel} added.`)
      return
    }

    page.setRecords(current =>
      current.map(currentRecord =>
        currentRecord.id === record.id ? record : currentRecord
      )
    )
    setEditingRecord(null)
    toast.success(`${config.entityLabel} updated.`)
  }

  const selectedIds = page.selectedRecords.map(record => record.id)
  const copy = (value: string, message: string) => {
    if (!navigator.clipboard) {
      toast.danger('Copy is not available in this browser.')
      return
    }

    void navigator.clipboard
      .writeText(value)
      .then(() => toast.success(message))
      .catch(() => toast.danger('Unable to copy records.'))
  }

  return (
    <section className="relative flex h-full min-h-0 flex-1 flex-col gap-4">
      <EntityActiveFilters
        filters={config.filters}
        values={page.filters}
        onRemove={removeFilter}
      />
      <EntityTable
        columns={config.columns}
        currentPage={page.currentPage}
        entityLabel={config.entityLabel}
        pluralLabel={config.pluralLabel}
        pageSize={page.pageSize}
        records={page.pageRecords}
        selectedKeys={page.selectedKeys}
        sortDescriptor={page.sortDescriptor}
        totalItems={page.sortedRecords.length}
        totalPages={page.totalPages}
        visibleColumns={page.visibleColumns}
        renderCell={(record, column) =>
          column === 'status' ? (
            <Chip
              color={
                record.status === 'Active'
                  ? 'success'
                  : record.status === 'Inactive'
                    ? 'danger'
                    : 'accent'
              }
              size="sm"
              variant="soft">
              <Chip.Label>{record.status}</Chip.Label>
            </Chip>
          ) : (
            <span
              className={
                column === 'id'
                  ? 'text-muted font-mono text-sm'
                  : config.columns.find(item => item.id === column)?.isNumeric
                    ? 'tabular-nums'
                    : undefined
              }>
              {String((record as Record<string, unknown>)[column] ?? '')}
            </span>
          )
        }
        onClearSelection={() => page.setSelectedKeys(new Set())}
        onCopyIds={() =>
          copy(selectedIds.join('\n'), `${selectedIds.length} IDs copied.`)
        }
        onCopyLinks={() =>
          copy(
            selectedIds
              .map(id => `${window.location.origin}${config.pathname}/${id}`)
              .join('\n'),
            `${selectedIds.length} links copied.`
          )
        }
        onDelete={() => {
          page.setHiddenIds(current => new Set([...current, ...selectedIds]))
          page.setSelectedKeys(new Set())
          toast.success(
            `${selectedIds.length} ${config.entityLabel}${selectedIds.length === 1 ? '' : 's'} deleted.`
          )
        }}
        onEdit={() => setEditingRecord(page.selectedRecords[0] ?? null)}
        onOpenRecord={setDetailRecord}
        onPageChange={page.setPage}
        onPageSizeChange={value => {
          page.setPageSize(value)
          page.resetPage()
        }}
        onSelectionChange={page.setSelectedKeys}
        onSortChange={descriptor => {
          page.setSortDescriptor(descriptor)
          page.resetPage()
        }}
      />
      <EntityDetails
        key={detailRecord?.id ?? 'details-closed'}
        config={config}
        record={detailRecord}
        onOpenChange={isOpen => !isOpen && setDetailRecord(null)}
        onEdit={record => {
          setDetailRecord(null)
          setEditingRecord(record)
        }}
      />
      <EntityEditor
        key={editingRecord?.id ?? 'edit-closed'}
        config={config}
        isCreateMode={false}
        isOpen={Boolean(editingRecord)}
        record={editingRecord}
        onOpenChange={isOpen => !isOpen && setEditingRecord(null)}
        onSave={record => save(record, false)}
      />
      <EntityEditor
        key={isCreateOpen ? 'create-open' : 'create-closed'}
        config={config}
        isCreateMode
        isOpen={isCreateOpen}
        record={isCreateOpen ? config.createDraft() : null}
        onOpenChange={setIsCreateOpen}
        onSave={record => save(record, true)}
      />
    </section>
  )
}
