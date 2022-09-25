import type { ReactElement } from 'react'
import { Select } from './Select'

export type ColorScheme = 'none' | 'light' | 'dark'
export type Size = 'small' | 'medium'
export interface SelectBoxOption {
  text: string
  value: string | number
}
export interface SelectBoxProps {
  colorScheme?: ColorScheme
  size?: Size
  placeholder?: string
  value?: string | number
  options: SelectBoxOption[]
  onChange(options: SelectBoxOption): void
}

export const SelectBox = ({
  size = 'small',
  colorScheme = 'light',
  value = '',
  placeholder = '값을 선택하세요.',
  options,
  onChange
}: SelectBoxProps): ReactElement => {
  return (
    <Select
      colorScheme={colorScheme}
      options={options}
      placeholder={placeholder}
      size={size}
      value={value}
      onChange={onChange}>
      <Select.Trigger />
      <Select.OptionList>
        <Select.Options />
      </Select.OptionList>
    </Select>
  )
}
