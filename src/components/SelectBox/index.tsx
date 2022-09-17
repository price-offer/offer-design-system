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
interface Option {
  text: string
  value: string | number
}
export interface SelectBoxProps {
  colorScheme?: ColorScheme
  placeholder?: string
  value?: string | number
  options: Option[]
  onChange(options: Option): void
}
type StyledSelectProps = StyledProps<SelectBoxProps, 'colorScheme'> & {
  isEmpty: boolean
}
interface GetFontColorParams {
  isEmpty: boolean
  colorScheme: ColorScheme
  size: 'tablet' | 'desktop'
  theme: Theme
}
type GetFontColor = (params: GetFontColorParams) => string
type ApplyColorScheme = (colorScheme: ColorScheme, theme: Theme) => string

export const SelectBox = ({
  colorScheme = 'light',
  value = '',
  placeholder = '값을 선택하세요.',
  options,
  onChange
}: SelectBoxProps): ReactElement => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option>({
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
          onClick={handleShowOption}>
          <span>{selectedOption.text || placeholder}</span>
          <TriggerIcon
            alt="trigger-icon"
            boxSize="16px"
            colorScheme={colorScheme}
            isEmpty={isEmpty}
            src={ICON.CHEVRON_DOWN_16}
          />
        </StyledTrigger>
        {isShowOptions && (
          <StyledOptionsWrapper>
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
  ${({ colorScheme, isEmpty, theme }): string => `
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    ${applyColorScheme(colorScheme, theme)}
    ${theme.mediaQuery.desktop} {
      max-width: 221px;
      height: 40px;
      padding: 12px 10px;
      font-weight: 500;
      line-height: 20px;
      border-radius: 6px;
      color:${getFontColor({ colorScheme, isEmpty, size: 'tablet', theme })};
    };
    ${theme.mediaQuery.tablet} {
      max-width: 73px;
      height: 32px;
      padding: 4px 8px;
      font-weight: bold;
      line-height: 24px;
      border-radius: 4px;
      color: ${getFontColor({ colorScheme, isEmpty, size: 'tablet', theme })};
    }
  `}
`
const TriggerIcon = styled(Image)<StyledSelectProps>`
  margin-left: 4px;

  ${({ colorScheme, isEmpty, theme }): string => `
  ${theme.mediaQuery.desktop} {
    filter: ${
      hexToCSSFilter(
        getFontColor({ colorScheme, isEmpty, size: 'tablet', theme })
      ).filter
    }
  };

  ${theme.mediaQuery.tablet} {
    filter: ${
      hexToCSSFilter(
        getFontColor({ colorScheme, isEmpty, size: 'tablet', theme })
      ).filter
    }
  };
`}
`
const StyledOptionsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 48px;
`
const StyledOptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 4px;
  width: 120px;
  gap: 8px;
  user-select: none;
  background: #ffffff;
  border: 1px solid #e8e8ea;
  border-radius: 4px;
  ${({ theme }): string => `
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
  :hover {
    background: #f6f6f7;
    cursor: pointer;
  }

  input[type='checkbox']:checked + label {
    background: #f6f6f7;
  }
`
const StyledOptionLabel = styled.label`
  display: block;
  padding: 8px 4px;
  cursor: pointer;
`
const StyledOption = styled.input`
  display: none;
`

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
    case 'tablet':
      return `${isEmpty ? gray50 : smallPrimary}`
    case 'desktop':
      return `${isEmpty ? gray50 : mediumPrimary}`
  }
}
