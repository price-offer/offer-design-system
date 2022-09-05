import type { Meta, Story } from '@storybook/react'
import { fonts } from '@themes'
import { Text } from './index'
import type { TextProps } from './index'

export default {
  argTypes: {
    color: {
      control: { type: 'color' }
    },
    textStyle: {
      control: { type: 'radio' },
      options: [...Object.keys(fonts)]
    }
  },
  component: Text,
  title: 'Component/Text'
} as Meta<TextProps>

const Template: Story<TextProps> = args => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'hello',
  textStyle: 'body01M'
}
