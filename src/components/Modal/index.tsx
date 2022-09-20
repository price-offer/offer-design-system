import type { HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useClickAway } from '@hooks'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  content: ReactElement
  parentElement: HTMLElement
  isOpen?: boolean
  width?: number
  height?: number
  onClose?(): void
}

type StyledModalProps = StyledProps<ModalProps, 'width' | 'height'>
type StyledDIMProps = StyledProps<ModalProps, 'isOpen'>

export const Modal = ({
  content,
  width = 400,
  height = 0,
  onClose,
  parentElement,
  isOpen = false,
  ...props
}: ModalProps): ReactElement => {
  const modalRef = useClickAway<HTMLDivElement>(() => {
    onClose?.()
  })

  return ReactDOM.createPortal(
    <StyledDIM isOpen={isOpen}>
      <StyledModal {...props} ref={modalRef} height={height} width={width}>
        <StyledCloseIcon onClick={onClose}>
          <img alt="close-button" src={ICON.CLOSE_24} />
        </StyledCloseIcon>
        {content}
      </StyledModal>
    </StyledDIM>,
    parentElement
  )
}

const StyledDIM = styled.div<StyledDIMProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ isOpen }): string => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }): string => theme.zIndex.modal};
  background-color: ${({ theme }): string => theme.colors.dim.opacity50};
`
const StyledModal = styled.div<StyledModalProps>`
  position: relative;
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => (height ? `${height}px` : 'auto')};
  min-height: 68px;
  padding: 20px;
  background-color: ${({ theme }): string => theme.colors.grayScale.white};
  box-shadow: ${({ theme }): string =>
    `0px 3px 20px ${theme.colors.dim.opacity40}`};
`
const StyledCloseIcon = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    filter: ${({ theme }): string =>
      hexToCSSFilter(theme.colors.grayScale.gray30).filter};
  }
`
