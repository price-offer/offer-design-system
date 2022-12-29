import type { Meta, Story } from '@storybook/react'
import { Modal } from './index'
import type { ModalProps } from './index'
import { useState } from 'react'

export default {
  component: Modal,
  title: 'Components/Modal'
} as Meta<ModalProps>

const Template: Story<ModalProps> = args => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Modal
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

export const Default = Template.bind({})
Default.args = {
  children: 'Hello World!',
  height: '300px',
  isOpen: false
}
