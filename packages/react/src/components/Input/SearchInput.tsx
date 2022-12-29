import { colors } from '@offer-ui/themes'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Icon } from '@offer-ui/components/Icon'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'

type SearchInputProps = Omit<
  MainInputProps,
  'label' | 'status' | 'message' | 'isPrice'
>
type StyledInputProps = StyledProps<SearchInputProps, 'isSmall'>

export const SearchInput = forwardRef(function SearchInput(
  { isSmall, ...props }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <StyledInputForm>
      <StyledIcon
        color={colors.grayScale.gray50}
        isSmall={isSmall}
        type="search"
      />
      <StyledInput ref={ref} isSmall={isSmall} {...props} />
    </StyledInputForm>
  )
})

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`
const StyledInput = styled.input<StyledInputProps>`
  border: none;

  ${({ isSmall, theme }): string => `
    background-color: ${theme.colors.background.gray02};
    ${theme.fonts[isSmall ? 'body02R' : 'body01R']}

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

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
      padding: 10px 12px 10px 43px;
      width: 328px;
      height: 40px;
    `
    }
    return `
      padding: 18px 12px 18px 43px;
      width: 360px;
      height: 56px;
    `
  }}
`

const StyledIcon = styled(Icon)<StyledInputProps>`
  top: ${({ isSmall }): string => (isSmall ? '7px' : '15px')};
  left: 12px;
  position: absolute;
`
