import type { Meta, StoryObj } from '@storybook/react'
import { Image as ImageComponent } from './index'

type Image = typeof ImageComponent

const meta: Meta<Image> = {
  argTypes: {
    objectFit: {
      control: { type: 'radio' },
      options: ['fill', 'contain', 'cover', 'none']
    }
  },
  component: ImageComponent,
  title: 'Components/Image'
}

export default meta

export const Default: StoryObj<Image> = {
  args: {
    alt: 'Image',
    boxSize: '276px',
    fallbackSrc: 'https://via.placeholder.com/200',
    objectFit: 'cover',
    src: 'https://via.placeholder.com/150'
  },
  render: args => <ImageComponent {...args} />
}
