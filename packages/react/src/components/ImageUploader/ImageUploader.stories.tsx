import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { v4 as uuidV4 } from 'uuid'
import { ImageUploader as ImageUploaderComponent } from './index'

type ImageUploader = typeof ImageUploaderComponent

const meta: Meta<ImageUploader> = {
  component: ImageUploaderComponent,
  title: 'Components/ImageUploader'
}

export default meta

export const Default: StoryObj<ImageUploader> = {
  args: {
    images: [
      {
        id: uuidV4(),
        isRepresent: true,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        id: uuidV4(),
        isRepresent: false,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ],
    onChange: (params): void => {
      action(JSON.stringify(params))
    }
  },
  render: args => (
    <div style={{ maxHeight: '304px', maxWidth: '1200px' }}>
      <ImageUploaderComponent {...args} />
    </div>
  )
}
