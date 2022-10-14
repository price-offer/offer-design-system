import type { Meta, Story } from '@storybook/react'
import Carousel from './index'
import type { CarouselProps } from './index'
import { IMAGE } from '@constants'

export default {
  argTypes: {},
  component: Carousel,
  title: 'Components/Carousel'
} as Meta<CarouselProps>
const images = [
  { id: 1, url: `${IMAGE.CATEGORY_CAR}` },
  { id: 2, url: `${IMAGE.CATEGORY_APPLIANCE}` },
  { id: 3, url: `${IMAGE.CATEGORY_APPLIANCE_PC}` }
]

const Template: Story<CarouselProps> = args => <Carousel {...args} />

export const Default = Template.bind({})
Default.args = {
  images,
  isArrow: true,
  name: 'products',
  size: 687
}
