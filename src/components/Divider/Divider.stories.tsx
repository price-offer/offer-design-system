import type { Meta, Story } from '@storybook/react'
import { Divider } from './index'
import type { DividerProps } from './index'

export default {
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical']
    },
    size: {
      control: { type: 'radio' },
      options: ['regular', 'bold']
    }
  },
  component: Divider,
  title: 'Components/Divider'
} as Meta

const Template: Story<DividerProps> = args => <Divider {...args} />
export const Default = Template.bind({})
Default.args = {
  direction: 'horizontal',
  size: 'regular'
}
