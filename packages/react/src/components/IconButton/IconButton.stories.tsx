import type { Meta, Story } from '@storybook/react'
import { ICON_TYPES } from '../Icon'
import { IconButton } from './index'
import type { IconButtonProps } from './index'
import { theme } from '@offer-ui/themes'

export default {
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
      options: [...Object.keys(theme.colors)]
    }
  },
  component: IconButton,
  title: 'Components/IconButton'
} as Meta<IconButtonProps>

const Template: Story<IconButtonProps> = args => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'brandPrimary',
  icon: 'arrowLeft',
  size: 24
}
