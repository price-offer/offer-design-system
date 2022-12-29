import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { mergeRefs } from '@offer-ui/utils/mergeRefs'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { useClickAway } from '@offer-ui/hooks'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Modal 내부에 들어갈 내용을 정합니다.
   * @type ReactNode
   */
  children: ReactNode
  /**
   * Modal의 open/close 여부를 정합니다.
   * @type boolean | undefined
   */
  isOpen?: boolean
  /**
   * Modal의 너비를 정합니다.
   * @type number
   */
  width?: number
  /**
   * Modal의 높이를 정합니다.
   * @type number | undefined
   */
  height?: number
  /**
   * Modal이 close될 때 실행할 함수를 정합니다.
   * @type (): void | undefined
   */
  onClose?(): void
}

type StyledModalProps = StyledProps<ModalProps, 'width' | 'height'>
type StyledDIMProps = StyledProps<ModalProps, 'isOpen'>

export const Modal = forwardRef(function Modal(
  {
    children,
    width = 400,
    height = 0,
    onClose,
    isOpen = false,
    ...props
  }: ModalProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [topElement, setTopElement] = useState<HTMLDivElement | null>(null)
  const modalRef = useClickAway<HTMLDivElement>(() => {
    onClose?.()
  })

  useEffect(() => {
    const divElement = document.createElement('div')
    setTopElement(divElement)
    document.body.append(divElement)

    return (): void => {
      topElement && document.body.removeChild(topElement)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible'

    return (): void => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  return topElement
    ? ReactDOM.createPortal(
        <StyledDIM isOpen={isOpen}>
          <StyledModal
            {...props}
            ref={mergeRefs([modalRef, ref])}
            height={height}
            width={width}>
            {children}
          </StyledModal>
        </StyledDIM>,
        topElement
      )
    : null
})

const StyledDIM = styled.div<StyledDIMProps>`
  position: fixed;
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
  overflow: scroll;
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => (height ? `${height}px` : '100%')};
  min-height: 68px;
  padding: 20px;
  background-color: ${({ theme }): string => theme.colors.grayScale.white};
  box-shadow: ${({ theme }): string =>
    `0px 3px 20px ${theme.colors.dim.opacity40}`};
`
