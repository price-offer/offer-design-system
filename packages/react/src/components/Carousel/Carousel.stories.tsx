import type { Meta, StoryObj } from '@storybook/react'
import { Carousel as CarouselComponent } from './index'
import type { CarouselProps } from './index'

type Carousel = typeof CarouselComponent

const meta: Meta<Carousel> = {
  component: CarouselComponent,
  title: 'Components/Carousel'
}

export default meta

export const Default: StoryObj<CarouselProps> = {
  args: {
    images: [
      { id: 1, url: 'https://picsum.photos/400' },
      { id: 2, url: 'https://picsum.photos/400' },
      { id: 3, url: 'https://picsum.photos/400' }
    ],
    isArrow: true,
    name: 'products',
    size: 687
  },
  render: args => <CarouselComponent {...args} />
}
