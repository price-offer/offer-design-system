import type {
  ColorScheme,
  SelectBoxOption,
  SelectBoxProps,
  Size
} from '../index'
import { createContext, useState } from 'react'
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'
import { OptionList } from './OptionList'
import { Options } from './Options'
import styled from '@emotion/styled'
import { Trigger } from './Trigger'
import { useClose } from '@hooks'

type HandleChangeValue = (item: SelectBoxOption) => void
interface SelectProps extends SelectBoxProps {
  children: ReactNode
}

/* Context Type */
interface SelectContextState {
  placeholder: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>> | null
  value: number | string
  setValue: HandleChangeValue | null
  options: SelectBoxOption[]
}
interface SelectStyleContextState {
  size: Size
  colorScheme: ColorScheme
}

export const SelectContext = createContext<SelectContextState>({
  isOpen: false,
  options: [],
  placeholder: '',
  setIsOpen: null,
  setValue: null,
  value: ''
})
export const SelectStyleContext = createContext<SelectStyleContextState>({
  colorScheme: 'light',
  size: 'small'
})

export const Select = ({
  colorScheme = 'light',
  placeholder = '값을 입력하세요.',
  options,
  size = 'small',
  value: defaultValue = '',
  children,
  onChange
}: SelectProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<number | string>(defaultValue)
  const ref = useClose({ onClose: setIsOpen })

  const handleChangeValue: HandleChangeValue = item => {
    onChange(item)
    setValue(item.value)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        options,
        placeholder,
        setIsOpen,
        setValue: handleChangeValue,
        value
      }}>
      <SelectStyleContext.Provider value={{ colorScheme, size }}>
        <StyledSelect ref={ref}>{children}</StyledSelect>
      </SelectStyleContext.Provider>
    </SelectContext.Provider>
  )
}

Select.Trigger = Trigger
Select.OptionList = OptionList
Select.Options = Options

const StyledSelect = styled.div`
  position: relative;
`
