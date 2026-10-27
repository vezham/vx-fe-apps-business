import type { AcademicEntityConfig } from '@shared/entity-page'

export type ClassroomColumnKey = 'capacity' | 'id' | 'roomno' | 'status'

export type ClassroomRecord = {
  capacity: string
  createdAt: string
  id: string
  roomno: string
  status: 'Active' | 'Inactive'
}

const classroomRecords: readonly ClassroomRecord[] = [
  {
    id: 'R167648',
    roomno: '101',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-05-01'
  },
  {
    id: 'R167647',
    roomno: '102',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-30'
  },
  {
    id: 'R167646',
    roomno: '103',
    capacity: '60',
    status: 'Active',
    createdAt: '2026-04-29'
  },
  {
    id: 'R167645',
    roomno: '104',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-04-26'
  },
  {
    id: 'R167644',
    roomno: '105',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-21'
  },
  {
    id: 'R167643',
    roomno: '106',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-04-20'
  },
  {
    id: 'R167642',
    roomno: '107',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-15'
  },
  {
    id: 'R167641',
    roomno: '108',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-03-31'
  },
  {
    id: 'R167640',
    roomno: '109',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-01-12'
  },
  {
    id: 'R167639',
    roomno: '110',
    capacity: '50',
    status: 'Active',
    createdAt: '2025-12-20'
  }
]

const roomNumbers = classroomRecords.map(record => record.roomno)
const capacities = ['10', '20', '30', '40', '50', '60', '70', '80']

export const classroomConfig = {
  columns: [
    { id: 'id', label: 'ID', defaultWidth: 140, minWidth: 120 },
    { id: 'roomno', label: 'Room No', defaultWidth: 150, minWidth: 120 },
    {
      id: 'capacity',
      label: 'Capacity',
      defaultWidth: 150,
      isNumeric: true,
      minWidth: 120
    },
    { id: 'status', label: 'Status', defaultWidth: 140, minWidth: 120 }
  ],
  createDraft: () => ({
    capacity: '',
    createdAt: '',
    id: '',
    roomno: '',
    status: 'Active' as const
  }),
  createId: records => {
    const largestId = Math.max(
      0,
      ...records.map(record => Number(record.id.slice(1)))
    )

    return `R${String(largestId + 1).padStart(6, '0')}`
  },
  detailTabs: [
    { id: 'overview', label: 'Overview' },
    { id: 'availability', label: 'Availability' },
    { id: 'notes', label: 'Notes' }
  ],
  entityLabel: 'Classroom',
  fields: [
    { id: 'roomno', label: 'Room No' },
    { id: 'capacity', label: 'Capacity', type: 'number' }
  ],
  filters: [
    { id: 'roomno', label: 'Room No', options: roomNumbers },
    { id: 'capacity', label: 'Capacity', options: capacities },
    { id: 'status', label: 'Status', options: ['Active', 'Inactive'] }
  ],
  getSearchValues: record => [
    record.id,
    record.roomno,
    record.capacity,
    record.status
  ],
  initialRecords: classroomRecords,
  getRecordSummary: record =>
    `Room ${record.roomno} has a capacity of ${record.capacity} students and is ${record.status.toLowerCase()}.`,
  pageKey: 'classroom',
  pathname: '/academic/classroom'
} satisfies AcademicEntityConfig<ClassroomRecord, ClassroomColumnKey>
