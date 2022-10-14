import type { ChangeEventHandler, ReactElement } from 'react'
import { convertToNumber, toLocaleCurrency } from '@utils/format'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { VALIDATE_MESSAGE } from '@constants'

type EditInputProps = Omit<MainInputProps, 'isPrice'>

interface StyledInputProps {
  isSmall: boolean
}
type StyledGuideMessageProps = StyledProps<EditInputProps, 'status'>

export const EditInput = ({
  label = '',
  guideMessage = '',
  status = 'default',
  isSmall,
  onChange,
  ...props
}: EditInputProps): ReactElement => {
  const hasGuideMessage = status !== 'none'

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const numberValue = convertToNumber(e.target.value)
    e.target.value = numberValue > 0 ? toLocaleCurrency(numberValue) : ''

    onChange?.(e)
  }

  return (
    <StyledInputForm>
      <StyledInputLabel>
        {label}
        <StyledInput isSmall={isSmall} onChange={handleChange} {...props} />
        <StyledPriceUnit isSmall={isSmall}>
          {VALIDATE_MESSAGE.PRICE_UNIT}
        </StyledPriceUnit>
      </StyledInputLabel>
      {hasGuideMessage && (
        <StyledInputGuideMessage status={status}>
          {guideMessage}
        </StyledInputGuideMessage>
      )}
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  flex-direction: column;
`
const StyledInputLabel = styled.label`
  position: relative;
  display: inline-flex;
  flex-direction: column;

  ${({ theme }): string => `
    color: ${theme.colors.grayScale.gray70};
    ${theme.fonts.body01M}
  `}
`
const StyledInput = styled.input<StyledInputProps>`
  padding: 8px 20px 8px 0;
  margin-bottom: 8px;
  border: none;

  ${({ isSmall, theme }): string => `
    border-bottom: 1px solid ${theme.colors.grayScale.black};
    ${theme.fonts[isSmall ? 'body01R' : 'display02M']}}

    ::placeholder {
      color: ${theme.colors.grayScale.gray50};
    }
  `}

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
        width: 360px;
        height: 32px;
      `
    }

    return `
        width: 714px;
        height: 36px;
      `
  }}
`

const StyledPriceUnit = styled.span<StyledInputProps>`
  position: absolute;
  right: 0;

  ${({ theme, isSmall }): string => `
    bottom: ${isSmall ? '14px' : '16px'};
    color: ${theme.colors.grayScale.gray90};
    ${theme.fonts.subtitle01M}
  `}
`

const StyledInputGuideMessage = styled.span<StyledGuideMessageProps>`
  color: ${({ theme, status }): string => {
    const hasStatus = status === 'error' || status === 'success'

    if (!hasStatus) {
      return theme.colors.grayScale.gray50
    }

    return theme.colors.action[status]
  }};

  ${({ theme }): string => theme.fonts.caption01M}
`
