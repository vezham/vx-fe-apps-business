import type { AcademicEntityConfig } from './entity-page'
import type { EntityRecord } from './record-list'

export type AcademicRecord = EntityRecord & Record<string, string>

type Column = {
  id: string
  label: string
  defaultWidth?: number
  minWidth?: number
  isNumeric?: boolean
}

type Definition = {
  columns: readonly Column[]
  entityLabel: string
  pluralLabel?: string
  fields: readonly { id: string; label: string; type?: 'number' | 'text' }[]
  filterKeys: readonly string[]
  pageKey: string
  pathname: string
  records: readonly AcademicRecord[]
}

const ACADEMIC_FIRST_COLUMN_WIDTH = 100

const withDefaults = (columns: readonly Column[]) =>
  columns.map((column, index) => ({
    ...column,
    defaultWidth:
      index === 0 ? ACADEMIC_FIRST_COLUMN_WIDTH : (column.defaultWidth ?? 150),
    minWidth:
      index === 0 ? ACADEMIC_FIRST_COLUMN_WIDTH : (column.minWidth ?? 120)
  }))

const unique = (values: readonly string[]) => [...new Set(values)]

export const defineAcademicConfig = ({
  columns,
  entityLabel,
  pluralLabel,
  fields,
  filterKeys,
  pageKey,
  pathname,
  records
}: Definition) => {
  const resolvedColumns = withDefaults(columns)

  return {
    columns: resolvedColumns,
    createDraft: () => {
      const draft: AcademicRecord = {
        createdAt: '',
        id: '',
        status: 'Active'
      }
      for (const field of fields) draft[field.id] = ''
      return draft
    },
    createId: currentRecords => {
      const prefix = currentRecords[0]?.id.match(/^[A-Za-z]+/)?.[0] ?? 'ID'
      const largestId = Math.max(
        0,
        ...currentRecords.map(record => {
          const match = record.id.match(/(\d+)$/)
          return match ? Number(match[1]) : 0
        })
      )
      return `${prefix}${String(largestId + 1).padStart(6, '0')}`
    },
    detailTabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'notes', label: 'Notes' }
    ],
    entityLabel,
    pluralLabel,
    fields,
    filters: filterKeys.map(id => ({
      id,
      label:
        resolvedColumns.find(column => column.id === id)?.label ??
        id.replace(/([A-Z])/g, ' $1'),
      options: unique(
        records.map(record => String(record[id] ?? '')).filter(Boolean)
      )
    })),
    getSearchValues: record => Object.values(record),
    initialRecords: records,
    getRecordSummary: record =>
      `${entityLabel} ${record.id} is ${record.status.toLowerCase()}.`,
    pageKey,
    pathname
  } satisfies AcademicEntityConfig<AcademicRecord, string>
}

const dates = [
  '2026-05-01',
  '2026-04-30',
  '2026-04-29',
  '2026-04-26',
  '2026-04-21',
  '2026-04-20',
  '2026-04-15',
  '2026-03-31',
  '2026-01-12',
  '2025-12-20',
  '2026-04-02',
  '2027-02-14'
]

const records = <
  T extends { id: string; status?: string; createdAt?: string } & Record<
    string,
    string
  >
>(
  rows: readonly T[]
): readonly AcademicRecord[] =>
  rows.map((row, index) => ({
    createdAt: row.createdAt ?? dates[index % dates.length],
    status: row.status ?? 'Active',
    ...row
  }))

export const classRoutineConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'classes', label: 'Class', defaultWidth: 110 },
    { id: 'section', label: 'Section', defaultWidth: 110 },
    { id: 'teacher', label: 'Teacher', defaultWidth: 160 },
    { id: 'subject', label: 'Subject', defaultWidth: 190 },
    { id: 'day', label: 'Day', defaultWidth: 120 },
    { id: 'starttime', label: 'Start Time', defaultWidth: 140 },
    { id: 'endtime', label: 'End Time', defaultWidth: 140 },
    { id: 'classroom', label: 'Class Room', defaultWidth: 130 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Class Routine',
  pluralLabel: 'Class Routines',
  fields: [
    { id: 'classes', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'subject', label: 'Subject' },
    { id: 'day', label: 'Day' },
    { id: 'starttime', label: 'Start Time' },
    { id: 'endtime', label: 'End Time' },
    { id: 'classroom', label: 'Class Room' }
  ],
  filterKeys: ['classes', 'section', 'teacher', 'subject', 'day', 'status'],
  pageKey: 'classroutine',
  pathname: '/academic/class-routine',
  records: records([
    {
      id: 'RT167648',
      classes: 'I',
      section: 'A',
      teacher: 'Erickson',
      subject: 'English',
      day: 'Monday',
      starttime: '09.30 AM',
      endtime: '10.45 PM',
      classroom: '101',
      status: 'Active'
    },
    {
      id: 'RT167647',
      classes: 'I',
      section: 'B',
      teacher: 'Mori',
      subject: 'Math',
      day: 'Tuesday',
      starttime: '10.45 AM',
      endtime: '12.00 PM',
      classroom: '102',
      status: 'Active'
    },
    {
      id: 'RT167646',
      classes: 'II',
      section: 'A',
      teacher: 'Joseph',
      subject: 'Physics',
      day: 'Wednesday',
      starttime: '12.00 AM',
      endtime: '01.15 PM',
      classroom: '103',
      status: 'Active'
    },
    {
      id: 'RT167645',
      classes: 'II',
      section: 'B',
      teacher: 'James',
      subject: 'Chemistry',
      day: 'Thursday',
      starttime: '01.15 PM',
      endtime: '02.30 PM',
      classroom: '104',
      status: 'Active'
    },
    {
      id: 'RT167644',
      classes: 'II',
      section: 'C',
      teacher: 'Federi',
      subject: 'Biology',
      day: 'Friday',
      starttime: '02.30 PM',
      endtime: '03.45 PM',
      classroom: '105',
      status: 'Inactive'
    },
    {
      id: 'RT167643',
      classes: 'III',
      section: 'A',
      teacher: 'Teresa',
      subject: 'Higher Math',
      day: 'Saturday',
      starttime: '03.45 PM',
      endtime: '05.00 PM',
      classroom: '106',
      status: 'Active'
    },
    {
      id: 'RT167642',
      classes: 'III',
      section: 'B',
      teacher: 'James',
      subject: 'Information Technology',
      day: 'Monday',
      starttime: '09.30 AM',
      endtime: '10.45 PM',
      classroom: '107',
      status: 'Active'
    },
    {
      id: 'RT167641',
      classes: 'IV',
      section: 'A',
      teacher: 'Hendrita',
      subject: 'Moral Education',
      day: 'Tuesday',
      starttime: '10.45 AM',
      endtime: '12.00 PM',
      classroom: '108',
      status: 'Active'
    },
    {
      id: 'RT167640',
      classes: 'IV',
      section: 'B',
      teacher: 'Morgan',
      subject: 'Finance',
      day: 'Wednesday',
      starttime: '12.00 PM',
      endtime: '01.15 PM',
      classroom: '109',
      status: 'Inactive'
    },
    {
      id: 'RT167639',
      classes: 'V',
      section: 'A',
      teacher: 'Ramsey',
      subject: 'Economics',
      day: 'Thursday',
      starttime: '01.15 PM',
      endtime: '02.30 PM',
      classroom: '110',
      status: 'Active'
    },
    {
      id: 'RT167638',
      classes: 'V',
      section: 'B',
      teacher: 'Henry',
      subject: 'Math',
      day: 'Friday',
      starttime: '02.30 PM',
      endtime: '03.45 PM',
      classroom: '111',
      status: 'Active'
    },
    {
      id: 'RT167637',
      classes: 'III',
      section: 'A',
      teacher: 'Jordan',
      subject: 'Physics',
      day: 'Saturday',
      starttime: '03.45 PM',
      endtime: '05.00 PM',
      classroom: '112',
      status: 'Inactive'
    }
  ])
})

export const sectionConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 180 },
    { id: 'section', label: 'Section Name', defaultWidth: 220 },
    { id: 'status', label: 'Status', defaultWidth: 140 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Section',
  pluralLabel: 'Sections',
  fields: [{ id: 'section', label: 'Section Name' }],
  filterKeys: ['section', 'status'],
  pageKey: 'section',
  pathname: '/academic/section',
  records: records(
    'ABCDEFGHIJ'.split('').map((section, index) => ({
      id: `SE${String(167645 - index)}`,
      section,
      status: 'Active'
    }))
  )
})

export const subjectConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'name', label: 'Name', defaultWidth: 220 },
    { id: 'code', label: 'Code', defaultWidth: 120, isNumeric: true },
    { id: 'type', label: 'Type', defaultWidth: 140 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Subject',
  pluralLabel: 'Subjects',
  fields: [
    { id: 'name', label: 'Name' },
    { id: 'code', label: 'Code', type: 'number' },
    { id: 'type', label: 'Type' }
  ],
  filterKeys: ['name', 'code', 'type', 'status'],
  pageKey: 'subject',
  pathname: '/academic/subject',
  records: records([
    {
      id: 'SU128394',
      name: 'English',
      code: '101',
      type: 'Theory',
      status: 'Active'
    },
    {
      id: 'SU128393',
      name: 'Maths',
      code: '102',
      type: 'Theory',
      status: 'Active'
    },
    {
      id: 'SU128392',
      name: 'Physics',
      code: '103',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128391',
      name: 'Chemistry',
      code: '104',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128390',
      name: 'Biology',
      code: '105',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128389',
      name: 'Higher Math',
      code: '106',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128388',
      name: 'Information Technology',
      code: '107',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128387',
      name: 'Moral Education',
      code: '108',
      type: 'Practical',
      status: 'Active'
    },
    {
      id: 'SU128386',
      name: 'Finance',
      code: '109',
      type: 'Theory',
      status: 'Active'
    },
    {
      id: 'SU128385',
      name: 'Economics',
      code: '110',
      type: 'Theory',
      status: 'Active'
    }
  ])
})

export const syllabusConfig = defineAcademicConfig({
  columns: [
    { id: 'classes', label: 'Class', defaultWidth: 120 },
    { id: 'section', label: 'Section', defaultWidth: 120 },
    { id: 'subject', label: 'Subject', defaultWidth: 200 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Syllabus',
  pluralLabel: 'Syllabi',
  fields: [
    { id: 'classes', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'subject', label: 'Subject' }
  ],
  filterKeys: ['classes', 'section', 'subject', 'status'],
  pageKey: 'syllabus',
  pathname: '/academic/syllabus',
  records: records([
    {
      id: 'SE167645',
      classes: 'I',
      section: 'A',
      subject: 'I, C English',
      status: 'Active'
    },
    {
      id: 'SE167644',
      classes: 'I',
      section: 'B',
      subject: 'III, A Maths',
      status: 'Active'
    },
    {
      id: 'SE167643',
      classes: 'II',
      section: 'C',
      subject: 'II, A English',
      status: 'Active'
    },
    {
      id: 'SE167642',
      classes: 'II',
      section: 'A',
      subject: 'IV, A Physics',
      status: 'Active'
    },
    {
      id: 'SE167641',
      classes: 'II',
      section: 'B',
      subject: 'V, A Chemistry',
      status: 'Active'
    },
    {
      id: 'SE167640',
      classes: 'IV',
      section: 'C',
      subject: 'III, B Maths',
      status: 'Active'
    },
    {
      id: 'SE167639',
      classes: 'III',
      section: 'C',
      subject: 'IV, B Chemistry',
      status: 'Active'
    },
    {
      id: 'SE167638',
      classes: 'III',
      section: 'A',
      subject: 'I, B Maths',
      status: 'Active'
    },
    {
      id: 'SE167637',
      classes: 'III',
      section: 'A',
      subject: 'VI, B Chemistry',
      status: 'Active'
    },
    {
      id: 'SE167636',
      classes: 'IV',
      section: 'B',
      subject: 'IV, D Maths',
      status: 'Active'
    },
    {
      id: 'SE167635',
      classes: 'V',
      section: 'A',
      subject: 'I, B Maths',
      status: 'Active'
    }
  ])
})

export const homeworkConfig = defineAcademicConfig({
  columns: [
    { id: 'classes', label: 'Class', defaultWidth: 110 },
    { id: 'section', label: 'Section', defaultWidth: 110 },
    { id: 'subject', label: 'Subject', defaultWidth: 150 },
    { id: 'homeworkdate', label: 'Homework Date', defaultWidth: 170 },
    { id: 'submissiondate', label: 'Submission Date', defaultWidth: 180 },
    { id: 'createdBy', label: 'Created By', defaultWidth: 160 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Homework',
  pluralLabel: 'Homework',
  fields: [
    { id: 'classes', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'subject', label: 'Subject' },
    { id: 'homeworkdate', label: 'Homework Date' },
    { id: 'submissiondate', label: 'Submission Date' },
    { id: 'createdBy', label: 'Created By' }
  ],
  filterKeys: ['classes', 'section', 'subject', 'status'],
  pageKey: 'homework',
  pathname: '/academic/homework',
  records: records([
    {
      id: 'HW1783929',
      classes: 'I',
      section: 'A',
      subject: 'English',
      homeworkdate: '10 May 2024',
      submissiondate: '12 May 2024',
      createdBy: 'Janet',
      status: 'Active'
    },
    {
      id: 'HW1783928',
      classes: 'II',
      section: 'B',
      subject: 'English',
      homeworkdate: '11 May 2024',
      submissiondate: '13 May 2024',
      createdBy: 'Joann',
      status: 'Active'
    },
    {
      id: 'HW1783927',
      classes: 'III',
      section: 'A',
      subject: 'English',
      homeworkdate: '12 May 2024',
      submissiondate: '14 May 2024',
      createdBy: 'Kathleen',
      status: 'Active'
    },
    {
      id: 'HW1783926',
      classes: 'IV',
      section: 'B',
      subject: 'English',
      homeworkdate: '13 May 2024',
      submissiondate: '15 May 2024',
      createdBy: 'Gifford',
      status: 'Active'
    },
    {
      id: 'HW1783925',
      classes: 'V',
      section: 'C',
      subject: 'English',
      homeworkdate: '14 May 2024',
      submissiondate: '16 May 2024',
      createdBy: 'Lisa',
      status: 'Active'
    },
    {
      id: 'HW1783924',
      classes: 'I',
      section: 'A',
      subject: 'English',
      homeworkdate: '15 May 2024',
      submissiondate: '17 May 2024',
      createdBy: 'Ralph',
      status: 'Active'
    },
    {
      id: 'HW1783923',
      classes: 'II',
      section: 'B',
      subject: 'English',
      homeworkdate: '16 May 2024',
      submissiondate: '18 May 2024',
      createdBy: 'Julie',
      status: 'Active'
    },
    {
      id: 'HW1783922',
      classes: 'III',
      section: 'A',
      subject: 'English',
      homeworkdate: '17 May 2024',
      submissiondate: '19 May 2024',
      createdBy: 'Ryan',
      status: 'Active'
    },
    {
      id: 'HW1783921',
      classes: 'IV',
      section: 'B',
      subject: 'English',
      homeworkdate: '18 May 2024',
      submissiondate: '20 May 2024',
      createdBy: 'Susan',
      status: 'Active'
    },
    {
      id: 'HW1783920',
      classes: 'IV',
      section: 'A',
      subject: 'English',
      homeworkdate: '19 May 2024',
      submissiondate: '21 May 2024',
      createdBy: 'Richard',
      status: 'Active'
    },
    {
      id: 'HW1783919',
      classes: 'V',
      section: 'C',
      subject: 'English',
      homeworkdate: '20 May 2024',
      submissiondate: '22 May 2024',
      createdBy: 'Martha',
      status: 'Active'
    },
    {
      id: 'HW1783918',
      classes: 'III',
      section: 'A',
      subject: 'English',
      homeworkdate: '21 May 2024',
      submissiondate: '23 May 2024',
      createdBy: 'Albert',
      status: 'Active'
    }
  ])
})

export const reasonsConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 150 },
    { id: 'role', label: 'Role', defaultWidth: 150 },
    { id: 'reasons', label: 'Reason', defaultWidth: 220 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Reason',
  pluralLabel: 'Reasons',
  fields: [
    { id: 'role', label: 'Role' },
    { id: 'reasons', label: 'Reason' }
  ],
  filterKeys: ['role', 'reasons', 'status'],
  pageKey: 'reasons',
  pathname: '/academic/reasons',
  records: records([
    { id: 'SE167645', role: 'Teacher', reasons: 'Pregnancy', status: 'Active' },
    {
      id: 'SE167644',
      role: 'Student',
      reasons: 'Fees Unpaid',
      status: 'Active'
    },
    { id: 'SE167643', role: 'Staff', reasons: 'Complaint', status: 'Active' },
    { id: 'SE167642', role: 'Student', reasons: 'Complaint', status: 'Active' },
    { id: 'SE167641', role: 'Staff', reasons: 'Complaint', status: 'Active' },
    {
      id: 'SE167640',
      role: 'Student',
      reasons: 'Fail in all Subject',
      status: 'Active'
    },
    { id: 'SE167639', role: 'Staff', reasons: 'Engage', status: 'Active' },
    {
      id: 'SE167638',
      role: 'Student',
      reasons: 'Experience',
      status: 'Active'
    },
    {
      id: 'SE167637',
      role: 'Staff',
      reasons: 'No improvement',
      status: 'Active'
    },
    {
      id: 'SE167636',
      role: 'Staff',
      reasons: 'Issue in Family',
      status: 'Active'
    },
    { id: 'SE167635', role: 'Teacher', reasons: 'Pregnancy', status: 'Active' }
  ])
})

export const scheduleConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'type', label: 'Type', defaultWidth: 140 },
    { id: 'starttime', label: 'Start Time', defaultWidth: 140 },
    { id: 'endtime', label: 'End Time', defaultWidth: 140 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Schedule',
  pluralLabel: 'Schedules',
  fields: [
    { id: 'type', label: 'Type' },
    { id: 'starttime', label: 'Start Time' },
    { id: 'endtime', label: 'End Time' }
  ],
  filterKeys: ['type', 'status'],
  pageKey: 'schedule',
  pathname: '/academic/classes/schedule',
  records: records(
    [
      ['S148239', '09.30 AM', '01.30 PM'],
      ['S148238', '10.30 AM', '02.30 PM'],
      ['S148237', '11.30 AM', '03.30 PM'],
      ['S148236', '12.30 PM', '04.30 PM'],
      ['S148235', '01.30 PM', '04.30 PM'],
      ['S148234', '10.30 AM', '04.30 PM'],
      ['S148233', '11.30 AM', '12.30 PM'],
      ['S148232', '12.30 PM', '04.30 PM'],
      ['S148231', '01.30 PM', '04.30 PM'],
      ['S148230', '02.30 PM', '05.30 PM'],
      ['S148228', '10.30 AM', '02.30 PM'],
      ['S148229', '11.30 AM', '03.30 PM']
    ].map(([id, starttime, endtime], index) => ({
      id,
      type: 'Class',
      starttime,
      endtime,
      status: index === 4 || index === 8 || index === 11 ? 'Inactive' : 'Active'
    }))
  )
})

export const examConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'name', label: 'Exam', defaultWidth: 220 },
    { id: 'date', label: 'Date', defaultWidth: 160 },
    { id: 'starttime', label: 'Start Time', defaultWidth: 140 },
    { id: 'endtime', label: 'End Time', defaultWidth: 140 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Exam',
  pluralLabel: 'Exams',
  fields: [
    { id: 'name', label: 'Exam' },
    { id: 'date', label: 'Date' },
    { id: 'starttime', label: 'Start Time' },
    { id: 'endtime', label: 'End Time' }
  ],
  filterKeys: ['name', 'date', 'status'],
  pageKey: 'exam',
  pathname: '/academic/examinations/exam',
  records: records([
    {
      id: 'E140523',
      name: 'Weekly Test',
      date: '13 May 2024',
      starttime: '09.30 AM',
      endtime: '10.45 PM',
      status: 'Active'
    },
    {
      id: 'E140522',
      name: 'Monthly Test',
      date: '27 May 2024',
      starttime: '10.45 AM',
      endtime: '12.00 PM',
      status: 'Active'
    },
    {
      id: 'E140521',
      name: 'Chapter Wise Test',
      date: '05 Jun 2024',
      starttime: '12.00 AM',
      endtime: '01.15 PM',
      status: 'Active'
    },
    {
      id: 'E140520',
      name: 'Unit Test',
      date: '15 Jun 2024',
      starttime: '01.15 PM',
      endtime: '02.30 PM',
      status: 'Active'
    },
    {
      id: 'E140519',
      name: 'Progress Test',
      date: '20 Jun 2024',
      starttime: '02.30 PM',
      endtime: '03.45 PM',
      status: 'Inactive'
    },
    {
      id: 'E140518',
      name: 'Oral Test',
      date: '03 Jul 2024',
      starttime: '03.45 PM',
      endtime: '05.00 PM',
      status: 'Active'
    },
    {
      id: 'E140517',
      name: 'Semester Exam',
      date: '18 Jul 2024',
      starttime: '09.30 AM',
      endtime: '10.45 PM',
      status: 'Active'
    },
    {
      id: 'E140516',
      name: 'Quarterly Exam',
      date: '26 Aug 2024',
      starttime: '10.45 AM',
      endtime: '12.00 PM',
      status: 'Active'
    },
    {
      id: 'E140515',
      name: 'Half yearly Exam',
      date: '15 Nov 2024',
      starttime: '12.00 PM',
      endtime: '01.15 PM',
      status: 'Inactive'
    },
    {
      id: 'E140514',
      name: 'Anuual Exam',
      date: '10 Mar 2025',
      starttime: '01.15 PM',
      endtime: '02.30 PM',
      status: 'Active'
    }
  ])
})

export const examScheduleConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'classes', label: 'Class', defaultWidth: 110 },
    { id: 'section', label: 'Section', defaultWidth: 110 },
    { id: 'examName', label: 'Exam', defaultWidth: 180 },
    { id: 'date', label: 'Date', defaultWidth: 160 },
    { id: 'subject', label: 'Subject', defaultWidth: 160 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Exam Schedule',
  pluralLabel: 'Exam Schedules',
  fields: [
    { id: 'classes', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'examName', label: 'Exam' },
    { id: 'date', label: 'Date' },
    { id: 'subject', label: 'Subject' }
  ],
  filterKeys: ['classes', 'section', 'examName', 'subject', 'status'],
  pageKey: 'exam-schedule',
  pathname: '/academic/examinations/exam-schedule',
  records: records([
    {
      id: 'RT167648',
      classes: 'I',
      section: 'A',
      examName: 'Monthly Test',
      date: '13 May 2024',
      subject: 'English',
      status: 'Active'
    },
    {
      id: 'RT167647',
      classes: 'I',
      section: 'B',
      examName: 'Monthly Test',
      date: '14 May 2024',
      subject: 'Math',
      status: 'Active'
    },
    {
      id: 'RT167646',
      classes: 'II',
      section: 'A',
      examName: 'Monthly Test',
      date: '15 May 2024',
      subject: 'Physics',
      status: 'Active'
    },
    {
      id: 'RT167645',
      classes: 'II',
      section: 'B',
      examName: 'Unit Test',
      date: '16 May 2024',
      subject: 'Chemistry',
      status: 'Active'
    },
    {
      id: 'RT167644',
      classes: 'II',
      section: 'C',
      examName: 'Unit Test',
      date: '17 May 2024',
      subject: 'Biology',
      status: 'Inactive'
    },
    {
      id: 'RT167643',
      classes: 'III',
      section: 'A',
      examName: 'Unit Test',
      date: '18 May 2024',
      subject: 'Higher Math',
      status: 'Active'
    },
    {
      id: 'RT167642',
      classes: 'III',
      section: 'B',
      examName: 'Annual Exam',
      date: '19 May 2024',
      subject: 'Information Technology',
      status: 'Active'
    },
    {
      id: 'RT167641',
      classes: 'IV',
      section: 'A',
      examName: 'Annual Exam',
      date: '20 May 2024',
      subject: 'Moral Education',
      status: 'Active'
    },
    {
      id: 'RT167640',
      classes: 'IV',
      section: 'B',
      examName: 'Annual Exam',
      date: '21 May 2024',
      subject: 'Finance',
      status: 'Inactive'
    },
    {
      id: 'RT167639',
      classes: 'V',
      section: 'A',
      examName: 'Chapter Wise Test',
      date: '22 May 2024',
      subject: 'Economics',
      status: 'Active'
    }
  ])
})

export const gradesConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'grade', label: 'Grade', defaultWidth: 120 },
    { id: 'percentage', label: 'Percentage', defaultWidth: 180 },
    { id: 'points', label: 'Points', defaultWidth: 120, isNumeric: true },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Grade',
  pluralLabel: 'Grades',
  fields: [
    { id: 'grade', label: 'Grade' },
    { id: 'percentage', label: 'Percentage' },
    { id: 'points', label: 'Points', type: 'number' }
  ],
  filterKeys: ['grade', 'percentage', 'points', 'status'],
  pageKey: 'grades',
  pathname: '/academic/examinations/grades',
  records: records([
    {
      id: 'G180482',
      grade: 'O',
      percentage: '90% - 100%',
      points: '10',
      status: 'Active'
    },
    {
      id: 'G180481',
      grade: 'A+',
      percentage: '80% - 90%',
      points: '8',
      status: 'Active'
    },
    {
      id: 'G180480',
      grade: 'A',
      percentage: '70% - 80%',
      points: '6',
      status: 'Active'
    },
    {
      id: 'G180479',
      grade: 'B+',
      percentage: '60% - 70%',
      points: '4',
      status: 'Active'
    },
    {
      id: 'G180478',
      grade: 'B',
      percentage: '60% - 70%',
      points: '3',
      status: 'Active'
    },
    {
      id: 'G180477',
      grade: 'C+',
      percentage: '50% - 60%',
      points: '2',
      status: 'Active'
    },
    {
      id: 'G180476',
      grade: 'C',
      percentage: '40% - 50%',
      points: '1',
      status: 'Active'
    },
    {
      id: 'G180475',
      grade: 'F',
      percentage: '35% - 40%',
      points: '0',
      status: 'Active'
    },
    {
      id: 'G180474',
      grade: 'D',
      percentage: 'Below 35%',
      points: '9',
      status: 'Active'
    }
  ])
})

export const examAttendanceConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'name', label: 'Student', defaultWidth: 180 },
    { id: 'rollNo', label: 'Roll No', defaultWidth: 120 },
    { id: 'classes', label: 'Class', defaultWidth: 110 },
    { id: 'section', label: 'Section', defaultWidth: 110 },
    { id: 'examtype', label: 'Exam', defaultWidth: 170 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Exam Attendance',
  pluralLabel: 'Exam Attendance',
  fields: [
    { id: 'name', label: 'Student' },
    { id: 'rollNo', label: 'Roll No' },
    { id: 'classes', label: 'Class' },
    { id: 'section', label: 'Section' },
    { id: 'examtype', label: 'Exam' }
  ],
  filterKeys: ['classes', 'section', 'examtype', 'status'],
  pageKey: 'exam-attendance',
  pathname: '/academic/examinations/exam-attendance',
  records: records([
    {
      id: 'EA123794',
      name: 'Janet',
      rollNo: '35013',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Present'
    },
    {
      id: 'EA123793',
      name: 'Joann',
      rollNo: '35012',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Absent'
    },
    {
      id: 'EA123792',
      name: 'Kathleen',
      rollNo: '35011',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Absent'
    },
    {
      id: 'EA123791',
      name: 'Gifford',
      rollNo: '35010',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Present'
    },
    {
      id: 'EA123790',
      name: 'Lisa',
      rollNo: '35009',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Late'
    },
    {
      id: 'EA123789',
      name: 'Ralph',
      rollNo: '35008',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Present'
    },
    {
      id: 'EA123788',
      name: 'Julie',
      rollNo: '35007',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Late'
    },
    {
      id: 'EA123787',
      name: 'Ryan',
      rollNo: '35006',
      classes: 'V',
      section: 'A',
      examtype: 'Monthly Test',
      status: 'Absent'
    },
    {
      id: 'EA123786',
      name: 'Susan',
      rollNo: '35004',
      classes: 'V',
      section: 'B',
      examtype: 'Monthly Test',
      status: 'Absent'
    },
    {
      id: 'EA123785',
      name: 'Nora',
      rollNo: '35003',
      classes: 'V',
      section: 'B',
      examtype: 'Monthly Test',
      status: 'Late'
    }
  ])
})

export const examResultsConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140 },
    { id: 'name', label: 'Student', defaultWidth: 180 },
    { id: 'rollNo', label: 'Roll No', defaultWidth: 120 },
    { id: 'total', label: 'Total', defaultWidth: 120, isNumeric: true },
    { id: 'percent', label: 'Percent', defaultWidth: 120, isNumeric: true },
    { id: 'grade', label: 'Grade', defaultWidth: 120 },
    { id: 'result', label: 'Result', defaultWidth: 120 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Exam Result',
  pluralLabel: 'Exam Results',
  fields: [
    { id: 'name', label: 'Student' },
    { id: 'rollNo', label: 'Roll No' },
    { id: 'total', label: 'Total', type: 'number' },
    { id: 'percent', label: 'Percent', type: 'number' },
    { id: 'grade', label: 'Grade' },
    { id: 'result', label: 'Result' }
  ],
  filterKeys: ['grade', 'result', 'status'],
  pageKey: 'exam-results',
  pathname: '/academic/examinations/exam-results',
  records: records([
    {
      id: 'AD9892434',
      name: 'Janet',
      rollNo: '35013',
      total: '644',
      percent: '92',
      grade: 'O',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892433',
      name: 'Joann',
      rollNo: '35012',
      total: '244',
      percent: '34',
      grade: 'F',
      result: 'Fail',
      status: 'Active'
    },
    {
      id: 'AD9892432',
      name: 'Kathleen',
      rollNo: '35011',
      total: '558',
      percent: '79',
      grade: 'A',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892431',
      name: 'Gifford',
      rollNo: '35010',
      total: '477',
      percent: '68',
      grade: 'B+',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892430',
      name: 'Lisa',
      rollNo: '35009',
      total: '285',
      percent: '40',
      grade: 'F',
      result: 'Fail',
      status: 'Active'
    },
    {
      id: 'AD9892429',
      name: 'Ralph',
      rollNo: '35008',
      total: '408',
      percent: '58',
      grade: 'B',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892428',
      name: 'Julie',
      rollNo: '35007',
      total: '552',
      percent: '78',
      grade: 'A',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892427',
      name: 'Ryan',
      rollNo: '35006',
      total: '317',
      percent: '45',
      grade: 'F',
      result: 'Fail',
      status: 'Active'
    },
    {
      id: 'AD9892426',
      name: 'Marcus',
      rollNo: '35005',
      total: '627',
      percent: '89',
      grade: 'A+',
      result: 'Pass',
      status: 'Active'
    },
    {
      id: 'AD9892425',
      name: 'Nora',
      rollNo: '35004',
      total: '493',
      percent: '70',
      grade: 'B+',
      result: 'Pass',
      status: 'Active'
    }
  ])
})

export const timetableConfig = defineAcademicConfig({
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 170 },
    { id: 'name', label: 'Subject', defaultWidth: 180 },
    { id: 'teacher', label: 'Teacher', defaultWidth: 180 },
    { id: 'day', label: 'Day', defaultWidth: 120 },
    { id: 'className', label: 'Class', defaultWidth: 130 },
    { id: 'room', label: 'Room', defaultWidth: 150 },
    { id: 'status', label: 'Status', defaultWidth: 130 },
    { id: 'createdAt', label: 'Created At', defaultWidth: 150 }
  ],
  entityLabel: 'Timetable',
  pluralLabel: 'Timetables',
  fields: [
    { id: 'name', label: 'Subject' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'day', label: 'Day' },
    { id: 'className', label: 'Class' },
    { id: 'room', label: 'Room' }
  ],
  filterKeys: ['name', 'teacher', 'day', 'className', 'status'],
  pageKey: 'timetable',
  pathname: '/academic/timetable',
  records: records([
    {
      id: 'tt-assembly-mon',
      name: 'Assembly',
      teacher: 'House Coordinators',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Auditorium',
      status: 'Active'
    },
    {
      id: 'tt-maths-mon',
      name: 'Maths',
      teacher: 'Anjali Rao',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Room 201',
      status: 'Active'
    },
    {
      id: 'tt-physics-mon',
      name: 'Physics',
      teacher: 'Raghav Menon',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Physics Lab',
      status: 'Active'
    },
    {
      id: 'tt-english-mon',
      name: 'English',
      teacher: 'Meera Iyer',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Room 201',
      status: 'Active'
    },
    {
      id: 'tt-lunch-mon',
      name: 'Lunch Break',
      teacher: 'Class Mentor',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Cafeteria',
      status: 'Active'
    },
    {
      id: 'tt-cs-mon',
      name: 'Computer Science',
      teacher: 'Kavya Shah',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Computer Lab',
      status: 'Active'
    },
    {
      id: 'tt-chem-mon',
      name: 'Chemistry',
      teacher: 'Nikhil Varma',
      day: 'Monday',
      className: 'Grade 10',
      room: 'Chemistry Lab',
      status: 'Active'
    },
    {
      id: 'tt-biology-tue',
      name: 'Biology',
      teacher: 'Priya Nair',
      day: 'Tuesday',
      className: 'Grade 10',
      room: 'Biology Lab',
      status: 'Active'
    },
    {
      id: 'tt-sports-tue',
      name: 'Sports',
      teacher: 'Arun Das',
      day: 'Tuesday',
      className: 'Grade 10',
      room: 'Sports Ground',
      status: 'Active'
    }
  ])
})
