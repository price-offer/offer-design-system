import { colors } from '@offer-ui/styles/themes'
import type { Meta, StoryObj } from '@storybook/react'
import { ICON_TYPES } from '../Icon'
import { IconButton as IconButtonComponent } from './index'

type IconButton = typeof IconButtonComponent

const meta: Meta<IconButton> = {
  argTypes: {
    hasShadow: {
      control: 'boolean'
    },
    icon: {
      control: 'select',
      options: [...Object.keys(ICON_TYPES)]
    },
    color: {
      control: 'select',
      options: [...Object.keys(colors)]
    }
  },
  component: IconButtonComponent,
  title: 'Components/IconButton'
}

export default meta

export const Default: StoryObj<IconButton> = {
  args: {
    color: 'brandPrimary',
    icon: 'arrowLeft',
    size: 24
  },
  render: args => <IconButtonComponent {...args} />
}
