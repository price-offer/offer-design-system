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
export const Primary = Template.bind({})
Primary.args = {
  alt: 'Image',
  boxSize: '276px',
  fallbackSrc: 'https://via.placeholder.com/200',
  height: '',
  objectFit: 'cover',
  radius: '0px',
  src: 'https://via.placeholder.com/150',
  width: ''
}
