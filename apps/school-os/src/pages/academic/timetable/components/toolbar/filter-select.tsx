import { AcademicSelectField } from '@shared/select-field'

type Props = {
  label: string
  options: string[]
  placeholder: string
  value: string | null
  onChange: (value: string | null) => void
}

export const FilterSelect = ({
  label,
  options,
  placeholder,
  value,
  onChange
}: Props) => {
  return (
    <AcademicSelectField
      ariaLabel={`Filter by ${label.toLowerCase()}`}
      label={label}
      options={options}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={nextValue => onChange(nextValue || null)}
    />
  )
}
