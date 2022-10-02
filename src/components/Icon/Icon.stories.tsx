import { Icon, ICON_TYPES } from './index'
import type { Meta, Story } from '@storybook/react'
import type { IconProps } from './index'

const iconTypeKeys = Object.keys(ICON_TYPES)

export default {
  argType: {
    iconType: {
      control: 'select',
      option: [...iconTypeKeys]
    }
  },
  component: Icon,
  title: 'Components/Icon'
} as Meta<IconProps>

const Template: Story<IconProps> = args => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
  iconType: 'box',
  size: 24
}
