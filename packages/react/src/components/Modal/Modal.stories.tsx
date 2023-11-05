import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal as ModalComponent } from './index'

type Modal = typeof ModalComponent

const meta: Meta<Modal> = {
  component: ModalComponent,
  title: 'Components/Modal'
}

export default meta

export const Default: StoryObj<Modal> = {
  args: {
    children: 'Hello World!',
    height: '300px',
    isOpen: false
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <ModalComponent
          {...args}
          isOpen={isOpen}
          onClose={(): void => {
            setIsOpen(false)
          }}
        />
        <button
          type="button"
          onClick={(): void => {
            setIsOpen(true)
          }}>
          Open!
        </button>
      </>
    )
  }
}
