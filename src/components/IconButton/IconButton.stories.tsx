import { ICON_BUTTON_STYLE_KEYS, IconButton } from './index'
import type { Meta, Story } from '@storybook/react'
import type { IconButtonProps } from './index'

export default {
  component: IconButton,
  title: 'Components/IconButton'
} as Meta<IconButtonProps>

const Template: Story<IconButtonProps> = args => <IconButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  iconButtonStyle: ICON_BUTTON_STYLE_KEYS.CHEVRON_LEFT
}

export const Toggle = Template.bind({})
Toggle.args = {
  iconButtonStyle: ICON_BUTTON_STYLE_KEYS.HEART
}
