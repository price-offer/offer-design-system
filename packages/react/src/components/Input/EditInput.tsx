import type { ChangeEventHandler, ForwardedRef } from 'react'
import { convertToNumber, toLocaleCurrency } from '@offer-ui/utils/format'
import type { ColorKeys } from '@offer-ui/themes'
import { forwardRef } from 'react'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { Text } from '@offer-ui/components'
import { VALIDATE_MESSAGE } from '@offer-ui/constants'

type EditInputProps = Omit<MainInputProps, 'isPrice'>
interface StyledInputProps {
  isSmall: boolean
}
type StyledGuideMessageProps = StyledProps<EditInputProps, 'status'>
type StyledInputFormProps = StyledProps<EditInputProps, 'width'>

export const EditInput = forwardRef(function EditInput(
  {
    label = '',
    guideMessage = '',
    status = 'default',
    isSmall,
    width = '100%',
    onChange,
    ...props
  }: EditInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const hasGuideMessage = status !== 'none'

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const numberValue = convertToNumber(e.target.value)
    e.target.value = numberValue > 0 ? toLocaleCurrency(numberValue) : ''

    onChange?.(e)
  }

  return (
    <StyledInputForm width={width}>
      <StyledInputLabel>
        {label && <Text styleType="body01M">{label}</Text>}
        <StyledInput
          ref={ref}
          isSmall={isSmall}
          onChange={handleChange}
          {...props}
        />
        <StyledPriceUnit
          color="grayScale90"
          isSmall={isSmall}
          styleType="subtitle01M">
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
})

const StyledInputForm = styled.form<StyledInputFormProps>`
  display: inline-flex;
  flex-direction: column;
  width: ${({ width }): string => width};
`
const StyledInputLabel = styled.label`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  color: ${({ theme }): string => theme.colors.grayScale70};
`

const StyledInput = styled.input<StyledInputProps>`
  padding: 8px 20px 8px 0;
  margin-bottom: 8px;
  border: none;
  ${({ isSmall, theme }): string => `
    height:${isSmall ? 'height: 32px' : 'height: 36px'};
    border-bottom: 1px solid ${theme.colors.black};
    ${theme.fonts[isSmall ? 'body01R' : 'display02M']}}
    ::placeholder {
      color: ${theme.colors.grayScale50};
    }
  `}
`

const StyledPriceUnit = styled(Text)<StyledInputProps>`
  position: absolute;
  right: 0;
  ${({ isSmall }): string => `
    bottom: ${isSmall ? '14px' : '16px'};
  `}
`

const StyledInputGuideMessage = styled(Text)<StyledGuideMessageProps>`
  color: ${({ theme, status }): string => {
    return theme.colors[applyGuideMessageColor({ status })]
  }};
`

const applyGuideMessageColor = ({
  status
}: StyledGuideMessageProps): ColorKeys => {
  switch (status) {
    case 'success':
      return 'actSuccess'
    case 'error':
      return 'actError'
    default:
      return 'grayScale50'
  }
}
