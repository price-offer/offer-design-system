import { Button, BUTTON_STYLE_KEYS } from './index'
import type { Meta, Story } from '@storybook/react'
import type { ButtonProps } from './index'

export default {
  argTypes: {
    buttonStyle: {
      control: { type: 'radio' },
      options: Object.values(BUTTON_STYLE_KEYS)
    },
    children: {
      control: { type: 'text' }
    },
    iconUrl: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small']
    }
  },
  component: Button,
  title: 'Components/Button'
} as Meta<ButtonProps>

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  buttonStyle: 'ghost',
  children: 'CTA 버튼',
  iconType: 'heart',
  size: 'medium'
}
