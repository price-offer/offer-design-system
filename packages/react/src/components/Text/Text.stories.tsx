import { colors, fonts } from '@offer-ui/themes'
import type { Meta, StoryObj } from '@storybook/react'
import { Text as TextComponent } from './index'

type Text = typeof TextComponent

const meta: Meta<Text> = {
  argTypes: {
    color: {
      control: { type: 'select', options: [...Object.keys(colors)] }
    },
    styleType: {
      control: { type: 'select' },
      options: [...Object.keys(fonts)]
    },
    tag: {
      control: { type: 'radio' },
      options: ['p', 'span']
    }
  },
  component: TextComponent,
  title: 'Components/Text'
}

export default meta

export const Default: StoryObj<Text> = {
  args: {
    children: 'hello',
    styleType: 'body01M'
  },
  render: args => <TextComponent {...args} />
}
