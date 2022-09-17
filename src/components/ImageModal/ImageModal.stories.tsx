import type { Meta, Story } from '@storybook/react'
import { ImageModal } from './index'
import type { ImageModalProps } from './index'
import { useState } from 'react'

export default {
  component: ImageModal,
  title: 'Components/ImageModal'
} as Meta<ImageModalProps>

const parentElement = document.createElement('div')
document.body.append(parentElement)

const Template: Story<ImageModalProps> = args => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ImageModal
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
  images: [
    {
      id: '1',
      src: 'http://placekitten.com/200/300'
    },
    {
      id: '2',
      src: 'http://placekitten.com/500/600'
    },
    {
      id: '3',
      src: 'http://placekitten.com/400/800'
    }
  ],
  name: 'cat-detail',
  parentElement
}

export const OneImage = Template.bind({})
OneImage.args = {
  images: [
    {
      id: '4',
      src: 'http://placekitten.com/200/300'
    }
  ],
  name: 'solo-cat',
  parentElement
}
