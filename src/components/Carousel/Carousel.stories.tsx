import type { Meta, Story } from '@storybook/react'
import Carousel from './index'
import type { CarouselProps } from './index'
import { IMAGE } from '@constants'

export default {
  argTypes: {},
  component: Carousel,
  title: 'Component/Carousel'
} as Meta<CarouselProps>

const Template: Story<CarouselProps> = args => <Carousel {...args} />

export const isArrow = Template.bind({})
isArrow.args = {
  images: [
    { id: 1, url: `${IMAGE.CATEGORY_CAR}` },
    { id: 2, url: `${IMAGE.CATEGORY_APPLIANCE}` }
  ],
  isArrow: true
}
export const NoArrow = Template.bind({})

NoArrow.args = {
  images: [
    { id: 1, url: `${IMAGE.CATEGORY_CAR}` },
    { id: 2, url: `${IMAGE.CATEGORY_APPLIANCE}` }
  ],
  isArrow: false
}
