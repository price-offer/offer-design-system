import type { Meta, Story } from '@storybook/react'
import { Badge } from './index'
import type { BadgeProps } from './index'

export default {
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['gray', 'orange', 'purple']
    }
  },
  component: Badge,
  title: 'Component/Badge'
} as Meta<BadgeProps>

const Template: Story<BadgeProps> = args => <Badge {...args} />

export const Gray = Template.bind({})
Gray.args = { children: 'Badge', colorScheme: 'gray' }

export const Orange = Template.bind({})
Orange.args = { children: 'Badge', colorScheme: 'orange' }

export const Purple = Template.bind({})
Purple.args = { children: 'Badge', colorScheme: 'purple' }
