import styled from '@emotion/styled'
import { Icon } from '@offer-ui/components/Icon'
import type { StyledProps } from '@offer-ui/types'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import type { MainInputProps } from './index'

type SearchInputProps = Omit<
  MainInputProps,
  'label' | 'status' | 'message' | 'isPrice'
>
type StyledInputProps = StyledProps<SearchInputProps, 'isSmall'>
type StyledInputFormProps = StyledProps<SearchInputProps, 'width'>

export const SearchInput = forwardRef(function SearchInput(
  { isSmall, width = '100%', ...props }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <StyledInputForm width={width}>
      <StyledIcon color={'grayScale50'} isSmall={isSmall} type="search" />
      <StyledInput ref={ref} isSmall={isSmall} {...props} />
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
