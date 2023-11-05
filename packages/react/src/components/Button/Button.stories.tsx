import type { Meta, StoryObj } from '@storybook/react'
import { ICON_TYPES } from '../Icon'
import { Button as ButtonComponent, BUTTON_STYLE_KEYS } from './index'

type Button = typeof ButtonComponent

const meta: Meta<Button> = {
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
  component: ButtonComponent,
  title: 'Components/Button'
}

export default meta

export const Default: StoryObj<Button> = {
  args: {
    children: 'CTA 버튼',
    icon: 'heart',
    size: 'medium',
    styleType: 'solidPrimary',
    width: '400px'
  },
  render: args => <ButtonComponent {...args} />
}
