import type { ChangeEventHandler, ReactElement } from 'react'
import { convertToNumber, toLocaleCurrency } from '@utils/format'
import type { MainInputProps as DefaultInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { Text } from '@components'
import { VALIDATE_MESSAGE } from '@constants'

type StyledPriceUnitProps = StyledProps<DefaultInputProps, 'isSmall'>
type StyledInputProps = StyledProps<DefaultInputProps, 'isPrice'> &
  StyledPriceUnitProps
type StyledStatusProps = StyledProps<DefaultInputProps, 'status'>

export const DefaultInput = ({
  label,
  status = 'default',
  guideMessage = '',
  isPrice = false,
  isSmall,
  onChange,
  ...args
}: DefaultInputProps): ReactElement => {
  const hasGuideMessage = status !== 'none'
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isPrice) {
      const numberValue = convertToNumber(e.target.value)

      e.target.value = numberValue > 0 ? toLocaleCurrency(numberValue) : ''
    }

    onChange?.(e)
  }

  return (
    <StyledWrapper>
      <StyledLabel>
        {label && <Text styleType="body01M">{label}</Text>}
        <StyledInput
          isPrice={isPrice}
          isSmall={isSmall}
          onChange={handleInputChange}
          {...args}
        />
        {isPrice && (
          <StyledPriceUnit
            isSmall={isSmall}
            styleType={isSmall ? 'body02M' : 'subtitle01M'}>
            {VALIDATE_MESSAGE.PRICE_UNIT}
          </StyledPriceUnit>
        )}
      </StyledLabel>
      {hasGuideMessage && (
        <StyledStatus status={status} styleType="caption01M">
          {guideMessage}
        </StyledStatus>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ theme }): string => `
    color: ${theme.colors.grayScale.gray70};
  `}
`
const StyledInput = styled.input<StyledInputProps>`
  margin: 8px 0;
  width: 328px;
  border: none;

  ${({ isSmall, isPrice }): string => {
    if (isSmall) {
      return `
          padding: 10px ${isPrice ? 35 : 12}px 10px 12px;
          height: 40px;
      `
    }
    return `
      padding: 16px ${isPrice ? 35 : 12}px 16px 12px;
      height: 54px;
    `
  }}

  ${({ theme, isSmall }): string => `
    background-color: ${theme.colors.background.gray02};
    ${theme.fonts[isSmall ? 'body02M' : 'subtitle01M']}

    ::placeholder {
    color: ${theme.colors.grayScale.gray50};
    }

    &:hover {
      background-color: ${theme.colors.background.gray04};
    }

    &:focus {
      background-color: ${theme.colors.background.gray04};
    }
  `}
`

const StyledPriceUnit = styled(Text)<StyledPriceUnitProps>`
  position: absolute;
  right: 12px;

  ${({ isSmall, theme }): string => `
    color:${theme.colors.grayScale.gray90};
    bottom: ${isSmall ? '19px' : '25px'};
  `}
`
const StyledStatus = styled(Text)<StyledStatusProps>`
  color: ${({ theme, status }): string => {
    const isGray = status === 'error' || status === 'success'

    if (!isGray) {
      return theme.colors.grayScale.gray50
    }

    return theme.colors.action[status]
  }};
`
