import styled from '@emotion/styled'
import { Text, isSmallSize } from '@offer-ui/components'
import { VALIDATE_MESSAGE } from '@offer-ui/constants'
import type { ColorKeys } from '@offer-ui/themes'
import type { StyledProps } from '@offer-ui/types'
import { convertToNumber, toLocaleCurrency } from '@offer-ui/utils/format'
import { forwardRef } from 'react'
import type { ChangeEventHandler, FormEventHandler, ForwardedRef } from 'react'
import type { InputProps } from './index'

export type EditInputProps = InputProps & {
  /**
   * Input의 label 메세지를 정합니다.
   * @type string | undefined
   */
  label?: string
  /**
   * Input의 추가 설명 메세지의 상태를 정합니다.
   * @type 'none' | 'success' | 'error' | 'default' | undefined
   */
  status?: 'none' | 'success' | 'error' | 'default'
  /**
   * Input의 설명 메세지를 정합니다.
   * @type string | undefined
   */
  guideMessage?: string
  /**
   * Input 값으로 가격을 받는지 여부를 정합니다.
   * @type boolean | undefined
   */
  isPrice?: boolean
}
type StyledInputProps = {
  isSmall: boolean
  hasGuideMessage: boolean
}
type StyledGuideMessageProps = StyledProps<EditInputProps, 'status'>
type StyledInputFormProps = StyledProps<EditInputProps, 'width'>

export const Edit = forwardRef(function Edit(
  {
    label = '',
    guideMessage = '',
    status = 'default',
    inputSize = 'small',
    width = '100%',
    onChange,
    isPrice = false,
    maxLength,
    onInput,
    ...props
  }: EditInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const hasGuideMessage = status !== 'none'
  const isSmall = isSmallSize(inputSize)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isPrice) {
      const numberValue = convertToNumber(e.target.value)

      e.target.value = numberValue > 0 ? toLocaleCurrency(numberValue) : ''
    }

    onChange?.(e)
  }

  const handleInput: FormEventHandler<HTMLInputElement> = (e): void => {
    const inputValue = e.currentTarget.value

    if (maxLength && maxLength < inputValue.length) {
      e.currentTarget.value = inputValue.slice(0, maxLength)
    }

    onInput?.(e)
  }

  return (
    <StyledInputForm width={width}>
      <StyledInputLabel>
        {label && <Text styleType="body01M">{label}</Text>}
        <StyledInput
          ref={ref}
          hasGuideMessage={hasGuideMessage}
          isSmall={isSmall}
          maxLength={maxLength}
          onChange={handleChange}
          onInput={handleInput}
          {...props}
        />
        {isPrice && (
          <StyledPriceUnit
            color="grayScale90"
            hasGuideMessage={hasGuideMessage}
            isSmall={isSmall}
            styleType="subtitle01M">
            {VALIDATE_MESSAGE.PRICE_UNIT}
          </StyledPriceUnit>
        )}
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
  border: none;
  ${({ isSmall, theme, hasGuideMessage }): string => `
    margin-bottom: ${hasGuideMessage ? '8px' : '0'};
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
  ${({ isSmall, hasGuideMessage }): string => `
    bottom:  ${(isSmall ? 14 : 16) - (hasGuideMessage ? 0 : 8)}px;
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
