import type {
  ColorScheme,
  SelectBoxOption,
  SelectBoxProps,
  Size
} from './index'
import { createContext, useContext, useState } from 'react'
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import { Image } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'
import { useClose } from '@hooks'

/* Select Type */
type HandleChangeValue = (item: SelectBoxOption) => void

interface SelectProps extends Required<SelectBoxProps> {
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

/* Style Type */
type StyledSelectProps = StyledProps<SelectBoxProps, 'colorScheme' | 'size'> & {
  isEmpty: boolean
  isSelected: boolean
}
type GetFontColorParams = Omit<StyledSelectProps, 'isSelected'> & {
  theme: Theme
}
type GetFontColor = (params: GetFontColorParams) => string
type ApplyIconColor = (colorScheme: ColorScheme, theme: Theme) => string
type ApplySize = (size: Size, theme: Theme) => string
type ApplyColorScheme = (colorScheme: ColorScheme, theme: Theme) => string

const SelectContext = createContext<SelectContextState>({
  isOpen: false,
  options: [],
  placeholder: '',
  setIsOpen: null,
  setValue: null,
  value: ''
})
const SelectStyleContext = createContext<SelectStyleContextState>({
  colorScheme: 'light',
  size: 'small'
})

export const Select = ({
  colorScheme,
  placeholder,
  options,
  size,
  value: defaultValue,
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

const Trigger = (): ReactElement => {
  const { placeholder, setIsOpen, value, options } = useContext(SelectContext)
  const { size, colorScheme } = useContext(SelectStyleContext)
  const text = options.find(option => option.value === value)?.text || ''
  const isEmpty = value === ''

  const handleClick = (): void => {
    setIsOpen?.(true)
  }

  return (
    <StyledTriggerWrapper
      colorScheme={colorScheme}
      isEmpty={isEmpty}
      size={size}
      onClick={handleClick}>
      <span>{text || placeholder}</span>
      <StyledTriggerArrow
        alt="trigger-icon"
        boxSize="16px"
        colorScheme={colorScheme}
        src={ICON.CHEVRON_DOWN_16}
      />
    </StyledTriggerWrapper>
  )
}

const OptionList = ({
  children
}: Pick<SelectProps, 'children'>): ReactElement => {
  const { isOpen } = useContext(SelectContext)
  const { size } = useContext(SelectStyleContext)

  return (
    <>
      {isOpen && (
        <StyledOptionListWrapper size={size}>
          <StyledOptionList>{children}</StyledOptionList>
        </StyledOptionListWrapper>
      )}
    </>
  )
}

const Options = (): ReactElement => {
  const { setValue, options, value } = useContext(SelectContext)

  const handleChangeValue: HandleChangeValue = item => {
    setValue?.(item)
  }

  return (
    <>
      {options?.map(item => (
        <StyledOptionWrapper
          key={item.value}
          isSelected={value === item.value}
          onClick={(): void => {
            handleChangeValue(item)
          }}>
          <StyledOption>{item.text}</StyledOption>
        </StyledOptionWrapper>
      ))}
    </>
  )
}

Select.Trigger = Trigger
Select.OptionList = OptionList
Select.Options = Options

const StyledSelect = styled.div`
  position: relative;
`

/* Trigger */
const StyledTriggerWrapper = styled.div<Omit<StyledSelectProps, 'isSelected'>>`
  ${({ colorScheme, isEmpty, theme, size }): string => `
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    ${applyColorScheme(colorScheme, theme)}
    ${applySize(size, theme)}
    color:${getFontColor({ colorScheme, isEmpty, size, theme })};
  `}
`
const StyledTriggerArrow = styled(Image)<
  Pick<StyledSelectProps, 'colorScheme'>
>`
  margin-left: 4px;
  ${({ colorScheme, theme }): string => applyIconColor(colorScheme, theme)}
`

/* OptionList */
const StyledOptionListWrapper = styled.div<Pick<StyledSelectProps, 'size'>>`
  position: absolute;
  left: 0;
  top: ${({ size }): string => `${size === 'small' ? '40px' : '48px'}`};
`
const StyledOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 4px;
  gap: 8px;
  user-select: none;
  min-width: 120px;
  border-radius: 4px;
  ${({ theme }): string => `
    background-color: ${theme.colors.grayScale.white};
    border: 1px solid ${theme.colors.grayScale.gray10};

    ${theme.mediaQuery.desktop} {
      font-size: 12px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    }

    ${theme.mediaQuery.tablet} {
      font-size: 14px;
      box-shadow: none;
    }
  `}
`

/* Option */
const StyledOptionWrapper = styled.li<Pick<StyledSelectProps, 'isSelected'>>`
  ${({ theme, isSelected }): string => `
    :hover {
      background-color: ${theme.colors.background.gray02};
      cursor: pointer;
    };

    background-color: ${isSelected ? theme.colors.background.gray02 : ''};
  `}
`
const StyledOption = styled.span`
  display: block;
  padding: 8px 4px;
  cursor: pointer;
`

/* Styled Function */
const applySize: ApplySize = (size, theme) => {
  const { body02B, body02M } = theme.fonts

  switch (size) {
    case 'small':
      return `
        height: 32px;
        padding: 4px 8px;
        border-radius: 4px;
        ${body02B}
      `
    case 'medium':
      return `
        height: 40px;
        padding: 12px 10px;
        border-radius: 6px;
        ${body02M}
      `
  }
}
const applyColorScheme: ApplyColorScheme = (colorScheme, theme) => {
  const { black, gray20, white } = theme.colors.grayScale

  switch (colorScheme) {
    case 'none':
      return `
        background-color: none;
        border: none;
      `
    case 'light':
      return `
        background-color: ${white};
        border: 1px solid ${gray20};
      `
    case 'dark':
      return `
        background-color: ${black};
        border: none;
      `
  }
}
const getFontColor: GetFontColor = ({ isEmpty, colorScheme, size, theme }) => {
  const { gray50, gray90, black, white } = theme.colors.grayScale
  const isDark = colorScheme === 'dark'
  const smallPrimary = isDark ? white : gray90
  const mediumPrimary = isDark ? white : black

  switch (size) {
    case 'small':
      return `${isEmpty ? gray50 : smallPrimary}`
    case 'medium':
      return `${isEmpty ? gray50 : mediumPrimary}`
  }
}
const applyIconColor: ApplyIconColor = (colorScheme, theme) => {
  const { gray90, white } = theme.colors.grayScale
  const isDark = colorScheme === 'dark'

  if (isDark) {
    return `filter: ${hexToCSSFilter(white).filter}`
  } else {
    return `filter: ${hexToCSSFilter(gray90).filter}`
  }
}
