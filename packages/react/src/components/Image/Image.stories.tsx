import type { Meta, Story } from '@storybook/react'
import { Image } from './index'
import type { ImageProps } from './index'

export default {
  argTypes: {
    objectFit: {
      control: { type: 'radio' },
      options: ['fill', 'contain', 'cover', 'none']
    }
  },
  component: Image,
  title: 'Components/Image'
} as Meta<ImageProps>

const Template: Story<ImageProps> = args => <Image {...args} />
export const Default = Template.bind({})
Default.args = {
  alt: 'Image',
  boxSize: '276px',
  fallbackSrc: 'https://via.placeholder.com/200',
  objectFit: 'cover',
  src: 'https://via.placeholder.com/150'
}
