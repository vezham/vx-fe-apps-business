export const classNames = {
  page: 'space-y-4',
  toolbar: 'flex flex-col gap-4 p-4',
  headerRow:
    'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
  mutedText: 'text-muted text-sm',
  title: 'text-base font-semibold',
  toolbarActions: 'flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end',
  dateOptionLabel: 'flex w-full items-center justify-between',
  rowsControls: 'flex items-center gap-2',
  filterPanel: 'flex w-80 flex-col gap-4 p-4',
  filterTitle: 'text-lg font-semibold',
  filterActions: 'flex justify-end gap-2',
  drawerDialog:
    'flex h-full w-full max-w-[960px] flex-col bg-black/5 backdrop-blur-2xl',
  drawerHeader: 'sticky top-0 z-10 border-b border-[#e8edf6] py-4',
  drawerHeaderRow: 'flex w-full items-center justify-between gap-3',
  drawerTitleGroup: 'flex min-w-0 items-center gap-2',
  drawerTitle: 'truncate text-lg font-semibold text-[#111827]',
  drawerActions: 'flex shrink-0 items-center gap-2',
  drawerBody: 'flex-1 px-4 py-4',
  drawerFooter: 'sticky bottom-0 border-t border-[#e8edf6] py-4',
  drawerFormFooterActions: 'flex w-full justify-end gap-3',
  form: 'space-y-6',
  formFields: 'space-y-5',
  scheduleTopGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
  timetableTabs: 'rounded-lg bg-[#e8edf6] p-5',
  timetableTabsList:
    'flex gap-x-10 gap-y-2 bg-transparent *:h-10 *:px-0 *:text-base *:font-medium',
  timetableTabPanel: 'space-y-5 pt-5',
  timetableRows: 'space-y-5',
  timetableRow:
    'grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_52px]',
  timetableDeleteButton: 'text-danger bg-danger/10 hover:bg-danger/15',
  field: 'space-y-2',
  fieldLabel: 'font-bold text-[#111827]',
  fieldError: 'text-danger text-sm',
  statusRow: 'flex items-center justify-between gap-6',
  calendarShell:
    'overflow-hidden rounded-lg border border-[#e8edf6] bg-white shadow-sm',
  calendarHeader:
    'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 border-b border-[#e8edf6] bg-white px-4 py-4 max-md:grid-cols-1 max-md:justify-items-center',
  calendarHeading:
    'min-w-0 truncate text-left text-xl font-semibold text-[#111827] max-md:justify-self-center max-md:text-center',
  calendarViewSelector: 'justify-self-center max-md:w-full max-md:max-w-md',
  calendarNavigation:
    'flex items-center justify-center gap-1 max-md:justify-self-center',
  calendarNavButton: 'size-9 rounded-full p-0',
  calendarTodayButton: 'min-w-20 rounded-full',
  agendaWrapper:
    'w-full overflow-hidden [--agenda-current-time-color:var(--color-danger)] [--agenda-event-radius:8px] [--agenda-slot-height:64px] max-md:[--agenda-time-column-width:52px]',
  agenda:
    'flex h-[calc(100dvh-17rem)] min-h-[620px] flex-col overflow-hidden [--agenda-current-time-color:var(--color-danger)] [--agenda-event-radius:8px] [--agenda-slot-height:64px] max-md:h-[calc(100dvh-14rem)] max-md:min-h-[560px] max-md:[--agenda-time-column-width:52px]',
  agendaHeader:
    'z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#e8edf6] bg-white px-4 py-3 max-md:flex-col max-md:items-stretch',
  agendaHeading: 'text-lg font-semibold text-[#111827]',
  agendaNavigation: 'flex items-center gap-2',
  agendaBody: 'min-h-0 flex-1 overflow-auto overscroll-contain',
  viewSelector: 'flex flex-wrap items-center gap-2',
  emptyState:
    'flex h-full min-h-96 items-center justify-center text-sm text-muted',
  timeGrid: 'relative min-w-[920px] bg-white',
  timeGridHeader:
    'sticky top-0 z-20 grid grid-cols-[72px_repeat(var(--timetable-day-count,6),minmax(128px,1fr))] border-b border-[#e8edf6] bg-white',
  dayHeader:
    'flex items-center justify-center gap-2 border-l border-[#e8edf6] px-3 py-3 text-sm font-medium text-[#6b7280]',
  dayHeaderToday: 'font-semibold text-[#111827]',
  allDayRow:
    'sticky top-[45px] z-20 grid grid-cols-[72px_repeat(var(--timetable-day-count,6),minmax(128px,1fr))] border-b border-[#e8edf6] bg-white',
  allDayLabel:
    'sticky left-0 z-30 flex items-start justify-end bg-white px-3 py-3 text-xs font-medium text-muted',
  allDaySlot: 'min-h-16 space-y-1 border-l border-[#eef2f7] bg-white p-1.5',
  timeRows: 'relative',
  timeRow:
    'grid min-h-[var(--agenda-slot-height)] grid-cols-[72px_repeat(var(--timetable-day-count,6),minmax(128px,1fr))] border-b border-[#eef2f7]',
  timeLabel:
    'sticky left-0 z-10 bg-white px-3 py-2 text-right text-xs font-medium text-muted',
  slot: 'min-h-[var(--agenda-slot-height)] border-l border-[#eef2f7] p-1.5',
  currentTimeIndicator:
    'pointer-events-none absolute left-0 right-0 z-30 flex translate-y-[-50%] items-center [top:calc(var(--timetable-current-offset)*var(--agenda-slot-height))]',
  currentTimeBadge:
    'ml-2 w-fit rounded-full bg-[var(--agenda-current-time-color)] px-1.5 py-0.5 text-xs font-semibold leading-none text-white shadow-sm',
  currentTimeLine: 'h-0.5 flex-1 bg-[var(--agenda-current-time-color)]/75',
  eventCard:
    'flex w-full min-w-0 flex-col gap-0.5 rounded-[var(--agenda-event-radius)] border p-2 text-left text-xs shadow-sm transition hover:shadow-md',
  eventCardSelected: 'ring-2 ring-primary/40',
  eventTitle: 'font-semibold leading-tight',
  eventContent:
    'flex h-full min-h-0 min-w-0 flex-col justify-start gap-0.5 overflow-hidden leading-tight',
  eventTeacher:
    'mt-0.5 flex min-h-5 min-w-0 items-center gap-1 rounded-md bg-white/80 px-1 py-0 text-[10px] font-medium leading-none opacity-95 shadow-sm',
  eventMeta: 'text-[10px] leading-none opacity-80',
  monthGrid: 'grid min-w-[920px] grid-cols-7 bg-white',
  monthWeekday:
    'sticky top-0 z-20 border-b border-l border-[#e8edf6] bg-white px-3 py-3 text-center text-sm font-medium text-[#6b7280] first:border-l-0',
  monthCell:
    'min-h-36 border-b border-l border-[#eef2f7] bg-white p-2 first:border-l-0',
  monthCellMuted:
    'min-h-36 border-b border-l border-[#eef2f7] bg-[#fbfcfe] p-2 text-muted first:border-l-0',
  monthCellToday: 'bg-danger/[0.03]',
  monthDate: 'mb-2 flex justify-end text-sm font-semibold',
  monthNowLine:
    'mb-1 flex items-center gap-1 text-[11px] font-semibold text-danger before:h-0.5 before:flex-1 before:bg-danger/70',
  monthEvents: 'flex flex-col gap-1',
  monthEvent:
    'truncate rounded-md bg-primary/10 px-2 py-1 text-left text-xs font-medium text-primary-700',
  moreEvents: 'text-xs text-muted',
  yearGrid:
    'grid max-h-[calc(100dvh-14rem)] grid-cols-1 gap-px overflow-auto bg-[#e8edf6] p-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  yearMonth: 'min-w-0 bg-white p-3',
  yearMonthTitle: 'mb-2 text-sm font-semibold text-[#111827]',
  yearWeekdays:
    'mb-1 grid grid-cols-7 text-center text-[10px] font-medium text-muted',
  yearMonthGrid: 'grid grid-cols-7 gap-y-1',
  yearDayCell:
    'flex min-h-8 flex-col items-center justify-start gap-0.5 text-xs text-[#374151]',
  yearDay: 'inline-flex size-6 items-center justify-center',
  yearDayToday:
    'inline-flex size-6 items-center justify-center rounded-full bg-danger font-semibold text-white',
  yearDayEvents: 'flex min-h-1 gap-0.5',
  yearDayEvent: 'size-1.5 rounded-full',
  todayBadge:
    'inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-danger px-1.5 text-sm font-semibold leading-none text-white',
  search: 'w-full sm:w-72',
  metaRow: 'flex flex-wrap items-center gap-2 text-sm text-muted',
  subjectChip: 'border border-[#e8edf6] bg-white',
  menuItemLabel: 'flex items-center gap-2'
} as const
