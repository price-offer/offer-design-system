import type { ChangeEventHandler, MouseEventHandler, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import { Image } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'
import { useClose } from '@hooks'
import { useState } from 'react'

type ColorScheme = 'none' | 'light' | 'dark'
type Size = 'small' | 'medium'
interface SelectBoxOption {
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
export type SelectBoxOnChangeHandler = (options: SelectBoxOption) => void

type StyledSelectProps = StyledProps<SelectBoxProps, 'colorScheme' | 'size'> & {
  isEmpty: boolean
}
interface GetFontColorParams {
  isEmpty: boolean
  colorScheme: ColorScheme
  size: Size
  theme: Theme
}
type GetFontColor = (params: GetFontColorParams) => string
type ApplyIconColor = (colorScheme: ColorScheme, theme: Theme) => string
type ApplySize = (size: Size, theme: Theme) => string
type ApplyColorScheme = (colorScheme: ColorScheme, theme: Theme) => string

export const SelectBox = ({
  size = 'small',
  colorScheme = 'light',
  value = '',
  placeholder = '값을 선택하세요.',
  options,
  onChange
}: SelectBoxProps): ReactElement => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<SelectBoxOption>({
    text: options.find(option => option.value === value)?.text || '',
    value
  })
  const { ref } = useClose({ onClose: setIsShowOptions })
  const isEmpty = selectedOption.value === ''

  const handleShowOption: MouseEventHandler<HTMLDivElement> = () => {
    setIsShowOptions(prev => !prev)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target

    setSelectedOption({
      text: name,
      value: value
    })
    setIsShowOptions(false)
    onChange({ text: name, value })
  }

  return (
    <>
      <StyledSelect ref={ref}>
        <StyledTrigger
          colorScheme={colorScheme}
          isEmpty={isEmpty}
          size={size}
          onClick={handleShowOption}>
          <span>{selectedOption.text || placeholder}</span>
          <TriggerIcon
            alt="trigger-icon"
            boxSize="16px"
            colorScheme={colorScheme}
            src={ICON.CHEVRON_DOWN_16}
          />
        </StyledTrigger>
        {isShowOptions && (
          <StyledOptionsWrapper size={size}>
            <StyledOptionsList>
              {options?.map(({ text, value }, index) => (
                <StyledOptionItem key={value}>
                  <StyledOption
                    checked={selectedOption.value === value}
                    id={`option-${index}`}
                    name={text}
                    type="checkbox"
                    value={value}
                    onChange={handleChange}
                  />
                  <StyledOptionLabel htmlFor={`option-${index}`}>
                    {text}
                  </StyledOptionLabel>
                </StyledOptionItem>
              ))}
            </StyledOptionsList>
          </StyledOptionsWrapper>
        )}
      </StyledSelect>
    </>
  )
}

const StyledSelect = styled.div`
  position: relative;
`
const StyledTrigger = styled.div<StyledSelectProps>`
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
const TriggerIcon = styled(Image)<Pick<StyledSelectProps, 'colorScheme'>>`
  margin-left: 4px;
  ${({ colorScheme, theme }): string => applyIconColor(colorScheme, theme)}
`
const StyledOptionsWrapper = styled.div<Pick<StyledSelectProps, 'size'>>`
  position: absolute;
  left: 0;
  top: ${({ size }): string => `${size === 'small' ? '40px' : '48px'}`};
`
const StyledOptionsList = styled.ul`
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
const StyledOptionItem = styled.li`
  ${({ theme }): string => `
    :hover {
      background-color: ${theme.colors.background.gray02};
      cursor: pointer;
    };

    input[type='checkbox']:checked + label {
      background-color: ${theme.colors.background.gray02};
    };
  `}
`
const StyledOptionLabel = styled.label`
  display: block;
  padding: 8px 4px;
  cursor: pointer;
`
const StyledOption = styled.input`
  display: none;
`
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
