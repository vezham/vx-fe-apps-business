import { useQuery } from '@tanstack/react-query'

import { Timetables } from './action'
import { timetableEvents } from './data'
import type { RQTimetable } from './types'

export * from './data'
export * from './types'

const CK_TIMETABLE = 'timetable'

const useList = (rq: RQTimetable = {}) =>
  useQuery({
    queryKey: [CK_TIMETABLE, rq],
    queryFn: () => Timetables.list(rq),
    initialData: timetableEvents
  })

export const useTimetable = { list: useList }
