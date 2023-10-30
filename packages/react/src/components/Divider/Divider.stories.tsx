import type { Meta, StoryObj } from '@storybook/react'
import { Divider as DividerComponent } from './index'

type Divider = typeof DividerComponent

const meta: Meta<Divider> = {
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical']
    },
    gap: {
      control: { type: 'number' }
    },
    length: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'radio' },
      options: ['regular', 'bold']
    }
  },
  component: DividerComponent,
  title: 'Components/Divider'
}

export default meta

export const Default: StoryObj<Divider> = {
  args: {
    direction: 'horizontal',
    size: 'regular'
  },
  render: args => <DividerComponent {...args} />
}
