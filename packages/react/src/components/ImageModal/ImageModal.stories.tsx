import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ImageModal as ImageModalComponent } from './index'

type ImageModal = typeof ImageModalComponent

const meta: Meta<ImageModal> = {
  component: ImageModalComponent,
  title: 'Components/ImageModal'
}

export default meta

export const Default: StoryObj<ImageModal> = {
  args: {
    images: [
      {
        id: '1',
        src: 'errorImage'
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
    name: 'cat-detail'
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <ImageModalComponent
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
