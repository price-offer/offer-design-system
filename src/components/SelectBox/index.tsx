import type { ReactElement } from 'react'
import { Select } from './Select'
import type { StyledProps } from '@types'

export type ColorScheme = 'none' | 'light' | 'dark'
export type Size = 'small' | 'medium'
export interface SelectBoxOption {
  text: string
  value: string | number
}
export type SelectBoxChangeHandler = (item: SelectBoxOption) => void
export interface SelectBoxProps {
  colorScheme?: ColorScheme
  size?: Size
  placeholder?: string
  value?: string | number
  options: SelectBoxOption[]
  onChange: SelectBoxChangeHandler
}

/* Style Type */
export interface StyledSelectProps
  extends StyledProps<SelectBoxProps, 'colorScheme' | 'size'> {
  isEmpty: boolean
  isSelected: boolean
}

export const SelectBox = ({
  size,
  colorScheme,
  value,
  placeholder,
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
