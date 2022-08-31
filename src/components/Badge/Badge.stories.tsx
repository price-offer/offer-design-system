import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { Badge } from './index'

export default {
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['gray', 'orange', 'purple']
    }
  },
  component: Badge,
  title: 'Component/Badge'
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />

export const Gray = Template.bind({})
Gray.args = { children: 'Badge', colorScheme: 'gray' }

export const Orange = Template.bind({})
Orange.args = { children: 'Badge', colorScheme: 'orange' }

export const Purple = Template.bind({})
Purple.args = { children: 'Badge', colorScheme: 'purple' }
