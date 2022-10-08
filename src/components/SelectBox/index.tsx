import type { HTMLAttributes, ReactElement } from 'react'
import { colors } from '@themes'
import { Icon } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'
import { useClose } from '@hooks'
import { useState } from 'react'

type ColorScheme = 'none' | 'light' | 'dark'
type Size = 'small' | 'medium'
interface Option {
  text: string
  value: string | number
}
type OnChangeValue = (item: Option) => void
export type SelectBoxProps = {
  colorScheme?: ColorScheme
  size?: Size
  placeholder?: string
  value?: string | number
  options: Option[]
  onChange: OnChangeValue
} & HTMLAttributes<HTMLDivElement>

/** Styled Type */
interface StyledSelectProps
  extends StyledProps<SelectBoxProps, 'colorScheme' | 'size'> {
  isEmpty: boolean
  isSelected: boolean
}
type GetFontColorParams = Omit<StyledSelectProps, 'isSelected'> & {
  theme: Theme
}
type GetFontColor = (params: GetFontColorParams) => string
type ApplyColorScheme = (colorScheme: ColorScheme, theme: Theme) => string
type ApplySize = (size: Size, theme: Theme) => string

export const SelectBox = ({
  colorScheme = 'light',
  size = 'small',
  placeholder = '값을 입력하세요.',
  value: defaultValue = '',
  options,
  onChange,
  ...props
}: SelectBoxProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<number | string>(defaultValue)
  const ref = useClose<HTMLDivElement>({ onClose: setIsOpen })
  const text =
    options.find(option => option.value === value)?.text || placeholder
  const isEmpty = value === ''

  const handleOpenOptions = (): void => {
    setIsOpen?.(true)
  }

  const handleChangeValue: OnChangeValue = item => {
    onChange(item)
    setValue(item.value)
    setIsOpen(false)
  }

  const getIconColor = (): string => {
    const { gray90, white } = colors.grayScale
    const isDark = colorScheme === 'dark'

    return isDark ? white : gray90
  }

  return (
    <StyledSelectBoxWrapper ref={ref} {...props}>
      <StyledTriggerWrapper
        colorScheme={colorScheme}
        isEmpty={isEmpty}
        size={size}
        onClick={handleOpenOptions}>
        <span>{text}</span>
        <StyledTriggerArrow
          color={getIconColor()}
          size={16}
          type="chevronDown"
        />
      </StyledTriggerWrapper>
      {isOpen && (
        <StyledOptionListWrapper size={size}>
          <StyledOptionList>
            {options?.map(item => (
              <StyledOptionsWrapper
                key={item.value}
                isSelected={value === item.value}
                onClick={(): void => {
                  handleChangeValue(item)
                }}>
                <StyledOption>{item.text}</StyledOption>
              </StyledOptionsWrapper>
            ))}
          </StyledOptionList>
        </StyledOptionListWrapper>
      )}
    </StyledSelectBoxWrapper>
  )
}

const StyledSelectBoxWrapper = styled.div`
  position: relative;
`

/** Trigger */
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
const StyledTriggerArrow = styled(Icon)`
  margin-left: 4px;
`

/** OptionList  */
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

/** Options */
const StyledOptionsWrapper = styled.li<Pick<StyledSelectProps, 'isSelected'>>`
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
