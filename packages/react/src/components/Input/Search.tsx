import styled from '@emotion/styled'
import { Icon } from '@offer-ui/components/Icon'
import type { StyledProps } from '@offer-ui/types'
import { mergeRefs } from '@offer-ui/utils/mergeRefs'
import type { FormEventHandler, ForwardedRef } from 'react'
import { forwardRef, useRef } from 'react'
import { isSmallSize, type InputProps } from './index'

export type SearchInputProps = InputProps & {
  /**
   * @description Input의 submit시 실행할 함수를 정합니다.
   * @type (value?: string): void
   */
  onSubmitValue?(value?: string): void
}
type StyledInputProps = {
  isSmall: boolean
}
type StyledInputFormProps = StyledProps<SearchInputProps, 'width'>

export const Search = forwardRef(function Search(
  {
    inputSize = 'small',
    width = '100%',
    onSubmitValue,
    ...props
  }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const isSmall = isSmallSize(inputSize)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onSubmitValue?.(inputRef.current?.value)
  }

  return (
    <StyledInputForm width={width} onSubmit={handleSubmitSearch}>
      <StyledIcon color={'grayScale50'} isSmall={isSmall} type="search" />
      <StyledInput
        ref={mergeRefs([ref, inputRef])}
        isSmall={isSmall}
        {...props}
      />
    </StyledInputForm>
  )
})

const StyledInputForm = styled.form<StyledInputFormProps>`
  display: inline-flex;
  position: relative;
  width: ${({ width }): string => width};
`
const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: none;

  ${({ isSmall, theme }): string => `
    background-color: ${theme.colors.bgGray02};
    ${theme.fonts[isSmall ? 'body02R' : 'body01R']}

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

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
      padding: 10px 12px 10px 43px;
      height: 40px;
    `
    }
    return `
      padding: 18px 12px 18px 43px;
      height: 56px;
    `
  }}
`

const StyledIcon = styled(Icon)<StyledInputProps>`
  top: ${({ isSmall }): string => (isSmall ? '7px' : '15px')};
  left: 12px;
  position: absolute;
`
