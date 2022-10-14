import type { Meta, Story } from '@storybook/react'
import { Badge } from './index'
import type { BadgeProps } from './index'

export default {
  argTypes: {
    colorType: {
      control: { type: 'radio' },
      options: ['gray', 'orange', 'purple']
    }
  },
  component: Badge,
  title: 'Components/Badge'
} as Meta<BadgeProps>

const Template: Story<BadgeProps> = args => <Badge {...args} />

export const Default = Template.bind({})
Default.args = { children: 'Badge', colorType: 'gray' }
