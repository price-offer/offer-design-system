import type { Meta, Story } from '@storybook/react'
import { ICON_TYPES } from '../Icon'
import type { ButtonProps } from './index'
import { Button, BUTTON_STYLE_KEYS } from './index'

export default {
  argTypes: {
    children: {
      control: { type: 'text' }
    },
    icon: {
      control: { type: 'select' },
      options: Object.keys(ICON_TYPES)
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small']
    },
    styleType: {
      control: { type: 'radio' },
      options: Object.values(BUTTON_STYLE_KEYS)
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  },
  component: Button,
  title: 'Components/Button'
} as Meta<ButtonProps>

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'CTA 버튼',
  icon: 'heart',
  size: 'medium',
  styleType: 'solidPrimary',
  width: '400px'
}
