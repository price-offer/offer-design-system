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
    iconUrl: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small']
    },
    type: {
      control: { type: 'radio' },
      option: ['button', 'submit', 'reset']
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

export const Option = Template.bind({})
Option.args = {
  buttonStyle: 'solidDisabled',
  children: 'CTA 버튼',
  option: 'option',
  size: 'small'
}

export const Icon = Template.bind({})
Icon.args = {
  buttonStyle: 'ghost',
  children: 'CTA 버튼',
  iconUrl: ICON.HEART_24,
  size: 'medium'
}
export const IconOption = Template.bind({})
IconOption.args = {
  buttonStyle: 'outline',
  children: 'CTA 버튼',
  iconUrl: ICON.HEART_24,
  option: 'option',
  size: 'small'
}
