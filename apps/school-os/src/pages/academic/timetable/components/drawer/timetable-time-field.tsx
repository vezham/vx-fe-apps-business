import type { ComponentProps } from 'react'

import { Label, TimeField } from '@vezham/react-v3'

import {
  formatTimeFieldValue,
  getTimeFieldValue
} from '@pages/academic/timetable/utils/timetable'
import { classNames } from '@pages/academic/timetable/variants'

type Props = {
  error?: string
  label: string
  value: string
  onChange: (value: string) => void
}

type TimeFieldValue = ComponentProps<typeof TimeField>['value']

export const TimetableTimeField = ({
  error,
  label,
  value,
  onChange
}: Props) => {
  return (
    <div className={classNames.field}>
      <TimeField
        fullWidth
        aria-label={label}
        granularity="minute"
        hourCycle={24}
        isInvalid={Boolean(error)}
        value={getTimeFieldValue(value) as TimeFieldValue}
        onChange={nextValue =>
          onChange(nextValue ? formatTimeFieldValue(nextValue) : '')
        }>
        <Label className={classNames.fieldLabel}>{label}</Label>
        <TimeField.Group fullWidth>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
      </TimeField>
      {error && <p className={classNames.fieldError}>{error}</p>}
    </div>
  )
}
