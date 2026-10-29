import { CalendarDate } from '@internationalized/date'

import type { TimetableAgendaEvent } from '@pages/academic/timetable/types'
import { getTodayCalendarDate } from '@pages/academic/timetable/utils/date'
import { classNames } from '@pages/academic/timetable/variants'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' })

type Props = {
  date: CalendarDate
  events: TimetableAgendaEvent[]
}

export const YearCalendar = ({ date, events }: Props) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1)

  return (
    <div className={classNames.yearGrid}>
      {months.map(month => (
        <YearMonth key={month} date={date} events={events} month={month} />
      ))}
    </div>
  )
}

const YearMonth = ({ date, events, month }: Props & { month: number }) => {
  const firstDay = new CalendarDate(date.year, month, 1)
  const daysInMonth = firstDay.add({ months: 1 }).subtract({ days: 1 }).day
  const leadingDays = new Date(Date.UTC(date.year, month - 1, 1)).getUTCDay()
  const cells = Array.from({ length: leadingDays + daysInMonth }, (_, index) =>
    index < leadingDays
      ? null
      : new CalendarDate(date.year, month, index - leadingDays + 1)
  )
  const monthLabel = monthFormatter.format(
    new Date(Date.UTC(date.year, month - 1, 1))
  )
  const today = getTodayCalendarDate()

  return (
    <section
      aria-label={`${monthLabel} ${date.year}`}
      className={classNames.yearMonth}>
      <h3 className={classNames.yearMonthTitle}>{monthLabel}</h3>
      <div className={classNames.yearWeekdays} aria-hidden="true">
        {weekdays.map((weekday, index) => (
          <span key={`${weekday}-${index}`}>{weekday}</span>
        ))}
      </div>
      <div className={classNames.yearMonthGrid}>
        {cells.map((cellDate, index) => {
          if (!cellDate) {
            return <span key={`empty-${index}`} aria-hidden="true" />
          }

          const dayEvents = events.filter(
            event =>
              event.start.year === cellDate.year &&
              event.start.month === cellDate.month &&
              event.start.day === cellDate.day
          )
          const isToday =
            today.year === cellDate.year &&
            today.month === cellDate.month &&
            today.day === cellDate.day

          return (
            <div key={cellDate.toString()} className={classNames.yearDayCell}>
              <span
                className={
                  isToday ? classNames.yearDayToday : classNames.yearDay
                }>
                {cellDate.day}
              </span>
              {dayEvents.length > 0 && (
                <div className={classNames.yearDayEvents}>
                  {dayEvents.slice(0, 2).map(event => (
                    <span
                      key={event.id}
                      aria-label={event.title}
                      className={classNames.yearDayEvent}
                      style={{ backgroundColor: event.color }}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
