import type { Meta, Story } from '@storybook/react'
import { Text } from './index'
import type { TextProps } from './index'
import { theme } from '@offer-ui/themes'

export default {
  argTypes: {
    color: {
      control: { type: 'select', options: [...Object.keys(theme.colors)] }
    },
    styleType: {
      control: { type: 'select' },
      options: [...Object.keys(theme.fonts)]
    },
    tag: {
      control: { type: 'radio' },
      options: ['p', 'span']
    }
  },
  component: Text,
  title: 'Components/Text'
} as Meta<TextProps>

const Template: Story<TextProps> = args => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'hello',
  styleType: 'body01M'
}
