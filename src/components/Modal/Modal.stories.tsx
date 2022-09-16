import type { Meta, Story } from '@storybook/react'
import { Modal } from './index'
import type { ModalProps } from './index'
import { useState } from 'react'

export default {
  component: Modal,
  title: 'Components/Modal'
} as Meta<ModalProps>

const parentElement = document.createElement('div')
document.body.append(parentElement)

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

export const Basic = Template.bind({})
Basic.args = {
  content: <div>Hello World!</div>,
  height: 300,
  parentElement
}
