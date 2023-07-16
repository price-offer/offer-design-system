import type { ChangeEventHandler, ForwardedRef } from 'react'
import { convertToNumber, toLocaleCurrency } from '@offer-ui/utils/format'
import type { MainInputProps as DefaultInputProps } from './index'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { Text } from '@offer-ui/components/Text'
import { theme } from '@offer-ui/themes'
import type { ThemeKeys } from '@offer-ui/themes'
import { VALIDATE_MESSAGE } from '@offer-ui/constants'

type StyledPriceUnitProps = StyledProps<DefaultInputProps, 'isSmall'> & {
  hasGuideMessage: boolean
}
type StyledInputProps = StyledProps<
  DefaultInputProps,
  'isPrice' | 'isSmall' | 'label'
> & {
  hasGuideMessage: boolean
}
type StyledStatusProps = StyledProps<DefaultInputProps, 'status'>
type StyledWrapperProps = StyledProps<DefaultInputProps, 'width'>

export const DefaultInput = forwardRef(function DefaultInput(
  {
    label = '',
    status = 'default',
    guideMessage = '',
    isPrice = false,
    isSmall,
    width = '100%',
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
    <StyledWrapper width={width}>
      <StyledLabel>
        {label && <Text styleType="body01M">{label}</Text>}
        <StyledInput
          ref={ref}
          hasGuideMessage={hasGuideMessage}
          isPrice={isPrice}
          isSmall={isSmall}
          label={label}
          onChange={handleInputChange}
          {...args}
        />
        {isPrice && (
          <StyledPriceUnit
            hasGuideMessage={hasGuideMessage}
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

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: inline-flex;
  flex-direction: column;
  width: ${({ width }): string => width};
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${theme.colors.grayScale70};
`
const StyledInput = styled.input<StyledInputProps>`
  margin: ${({ label, hasGuideMessage }): string =>
    `${label ? '8px' : '0'} 0 ${hasGuideMessage ? '8px' : '0'}`};
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
  ${({ isSmall }): string => `
    background-color: ${theme.colors.bgGray02};
    ${theme.fonts[isSmall ? 'body02M' : 'subtitle01M']}
    ::placeholder {
      color: ${theme.colors.grayScale50};
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
  ${({ isSmall, hasGuideMessage }): string => `
    color:${theme.colors.grayScale90};
    bottom: ${(isSmall ? 19 : 25) - (hasGuideMessage ? 0 : 8)}px;
  `}
`
const StyledStatus = styled(Text)<StyledStatusProps>`
  color: ${({ status }): string =>
    theme.colors[applyGuideMessageColor({ status })]};
`

const applyGuideMessageColor = ({
  status
}: StyledStatusProps): ThemeKeys['color'] => {
  switch (status) {
    case 'success':
      return 'actSuccess'
    case 'error':
      return 'actError'
    default:
      return 'grayScale50'
  }
}
