import { Button, BUTTON_STYLE_KEYS } from './index'
import type { Meta, Story } from '@storybook/react'
import type { ButtonProps } from './index'
import { ICON } from '@constants'

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

export const Basic = Template.bind({})
Basic.args = {
  buttonStyle: 'solidPrimary',
  children: 'CTA 버튼',
  size: 'large'
}

export const Icon = Template.bind({})
Icon.args = {
  buttonStyle: 'ghost',
  children: 'CTA 버튼',
  iconUrl: ICON.HEART_24,
  size: 'medium'
}
