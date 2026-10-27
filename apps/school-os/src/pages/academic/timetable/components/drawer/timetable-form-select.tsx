import { AcademicSelectField } from '@shared/select-field'

import { classNames } from '@pages/academic/timetable/variants'

type Props = {
  error?: string
  label: string
  options: string[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export const TimetableFormSelect = ({
  error,
  label,
  options,
  placeholder,
  value,
  onChange
}: Props) => {
  return (
    <div className={classNames.field}>
      <AcademicSelectField
        ariaLabel={label}
        error={error}
        errorClassName={classNames.fieldError}
        label={label}
        labelClassName={classNames.fieldLabel}
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
