import type { Meta, StoryObj } from '@storybook/react'
import { Badge as BadgeComponent } from './index'

type Badge = typeof BadgeComponent

const meta: Meta<Badge> = {
  argTypes: {
    colorType: {
      control: { type: 'radio' },
      options: ['gray', 'orange', 'purple']
    }
  },
  component: BadgeComponent,
  title: 'Components/Badge'
}

export default meta

export const Default: StoryObj<Badge> = {
  args: { children: 'Badge', colorType: 'gray' },
  render: args => <BadgeComponent {...args} />
}
