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

export const isArrow = Template.bind({})
isArrow.args = {
  images,
  isArrow: true,
  name: 'products',
  size: 687
}
export const NoArrow = Template.bind({})

NoArrow.args = {
  images,
  isArrow: false,
  name: 'products',
  size: 687
}
