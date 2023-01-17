import type { ChangeEventHandler, ForwardedRef } from 'react'
import { convertToNumber, toLocaleCurrency } from '@offer-ui/utils/format'
import type { ColorKeys } from '@offer-ui/themes'
import type { MainInputProps as DefaultInputProps } from './index'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { Text } from '@offer-ui/components/Text'
import { VALIDATE_MESSAGE } from '@offer-ui/constants'

type StyledPriceUnitProps = StyledProps<DefaultInputProps, 'isSmall'>
type StyledInputProps = StyledProps<DefaultInputProps, 'isPrice'> &
  StyledPriceUnitProps
type StyledStatusProps = StyledProps<DefaultInputProps, 'status'>

export const DefaultInput = forwardRef(function DefaultInput(
  {
    label,
    status = 'default',
    guideMessage = '',
    isPrice = false,
    isSmall,
    onChange,
    ...args
  }: DefaultInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
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
          ref={ref}
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
})

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ theme }): string => `
    color: ${theme.colors.gsGray70};
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
    background-color: ${theme.colors.bgGray02};
    ${theme.fonts[isSmall ? 'body02M' : 'subtitle01M']}
    ::placeholder {
      color: ${theme.colors.gsGray50};
    }
    &:hover {
      background-color: ${theme.colors.bgGray04};
    }
    &:focus {
      background-color: ${theme.colors.bgGray04};
    }
  `}
`

const StyledPriceUnit = styled(Text)<StyledPriceUnitProps>`
  position: absolute;
  right: 12px;
  ${({ isSmall, theme }): string => `
    color:${theme.colors.gsGray90};
    bottom: ${isSmall ? '19px' : '25px'};
  `}
`
const StyledStatus = styled(Text)<StyledStatusProps>`
  color: ${({ theme, status }): string =>
    theme.colors[applyGuideMessageColor({ status })]};
`

const applyGuideMessageColor = ({ status }: StyledStatusProps): ColorKeys => {
  switch (status) {
    case 'success':
      return 'actSuccess'
    case 'error':
      return 'actError'
    default:
      return 'gsGray50'
  }
}
