import type { ChangeEventHandler, ReactElement } from 'react'
import { convertToNumber, toLocaleCurrency } from '@utils/format'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { Text } from '@components'
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
        {label && <Text styleType="body01M">{label}</Text>}
        <StyledInput isSmall={isSmall} onChange={handleChange} {...props} />
        <StyledPriceUnit isSmall={isSmall} styleType="subtitle01M">
          {VALIDATE_MESSAGE.PRICE_UNIT}
        </StyledPriceUnit>
      </StyledInputLabel>
      {hasGuideMessage && (
        <StyledInputGuideMessage status={status} styleType="caption01M">
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

  color: ${({ theme }): string => theme.colors.grayScale.gray70};
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
    return isSmall
      ? `
        width: 360px;
        height: 32px;
      `
      : `
        width: 714px;
        height: 36px;
      `
  }}
`

const StyledPriceUnit = styled(Text)<StyledInputProps>`
  position: absolute;
  right: 0;

  ${({ theme, isSmall }): string => `
    bottom: ${isSmall ? '14px' : '16px'};
    color: ${theme.colors.grayScale.gray90};
  `}
`

const StyledInputGuideMessage = styled(Text)<StyledGuideMessageProps>`
  color: ${({ theme, status }): string => {
    const isGray = status === 'error' || status === 'success'

    return isGray ? theme.colors.grayScale.gray50 : theme.colors.action[status]
  }};
`
