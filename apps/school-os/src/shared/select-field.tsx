import { Label, ListBox, Select } from '@vezham/react-v3'

type Props = {
  ariaLabel: string
  error?: string
  errorClassName?: string
  label: string
  labelClassName?: string
  options: readonly string[]
  placeholder: string
  showError?: boolean
  value: string
  onChange: (value: string) => void
}

export const AcademicSelectField = ({
  ariaLabel,
  error,
  errorClassName,
  label,
  labelClassName,
  options,
  placeholder,
  showError = true,
  value,
  onChange
}: Props) => (
  <>
    <Select
      fullWidth
      aria-label={ariaLabel}
      aria-invalid={Boolean(error)}
      placeholder={placeholder}
      value={value || null}
      onChange={nextValue => onChange(nextValue ? String(nextValue) : '')}>
      <Label className={labelClassName}>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map(option => (
            <ListBox.Item key={option} id={option} textValue={option}>
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
    {showError && error && <p className={errorClassName}>{error}</p>}
  </>
)
