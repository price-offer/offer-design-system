import type { HTMLAttributes, ReactElement } from 'react'
import { useEffect, useMemo } from 'react'
import { IconButton } from '@components'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useClickAway } from '@hooks'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  isOpen?: boolean
  width?: number
  height?: number
  onClose?(): void
}

type StyledModalProps = StyledProps<ModalProps, 'width' | 'height'>
type StyledDIMProps = StyledProps<ModalProps, 'isOpen'>

export const Modal = ({
  children,
  width = 400,
  height = 0,
  onClose,
  isOpen = false,
  ...props
}: ModalProps): ReactElement => {
  const modalRef = useClickAway<HTMLDivElement>(() => {
    onClose?.()
  })
  const topElement: HTMLDivElement = useMemo(
    () => document.createElement('div'),
    []
  )

  useEffect(() => {
    document.body.append(topElement)

    return (): void => {
      document.body.removeChild(topElement)
    }
  }, [])

  return ReactDOM.createPortal(
    <StyledDIM isOpen={isOpen}>
      <StyledModal {...props} ref={modalRef} height={height} width={width}>
        <StyledCloseIcon
          color="gray30"
          iconButtonStyle="ghost"
          type="close"
          onClick={onClose}
        />
        {children}
      </StyledModal>
    </StyledDIM>,
    topElement
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
const StyledCloseIcon = styled(IconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`
