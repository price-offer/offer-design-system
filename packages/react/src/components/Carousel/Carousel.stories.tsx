import type { Meta, Story } from '@storybook/react'
import { Carousel } from './index'
import type { CarouselProps } from './index'

export default {
  argTypes: {},
  component: Carousel,
  title: 'Components/Carousel'
} as Meta<CarouselProps>
const images = [
  { id: 1, url: 'https://picsum.photos/400' },
  { id: 2, url: 'https://picsum.photos/400' },
  { id: 3, url: 'https://picsum.photos/400' }
]

const Template: Story<CarouselProps> = args => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {
  images,
  isArrow: true,
  name: 'products',
  size: 687
}
