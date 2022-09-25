import type { ColorScheme, Size, StyledSelectProps } from '../index'
import { SelectContext, SelectStyleContext } from './index'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import { Image } from '@components'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import type { Theme } from '@emotion/react'
import { useContext } from 'react'

type GetFontColorParams = Omit<StyledSelectProps, 'isSelected'> & {
  theme: Theme
}
type GetFontColor = (params: GetFontColorParams) => string
type ApplyIconColor = (colorScheme: ColorScheme, theme: Theme) => string
type ApplySize = (size: Size, theme: Theme) => string
type ApplyColorScheme = (colorScheme: ColorScheme, theme: Theme) => string

export const Trigger = (): ReactElement => {
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
