import type { Meta, StoryObj } from '@storybook/react'
import { ToggleButton as ToggleButtonComponent } from './index'

type ToggleButton = typeof ToggleButtonComponent

const meta: Meta<ToggleButton> = {
  component: ToggleButtonComponent,
  title: 'Components/ToggleButton'
}

export default meta

export const Default: StoryObj<ToggleButton> = {
  args: {
    color: 'grayScale30',
    icon: 'heart',
    size: 16,
    toggleColor: 'brandPrimary',
    toggleIcon: 'heartFill'
  },
  render: args => <ToggleButtonComponent {...args} />
}
