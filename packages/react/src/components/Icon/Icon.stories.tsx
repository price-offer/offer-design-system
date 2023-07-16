import { Icon, ICON_TYPES } from './index'
import type { Meta, Story } from '@storybook/react'
import type { IconProps } from './index'
import { theme } from '@offer-ui/themes'

export default {
  argType: {
    type: {
      control: 'select',
      options: [...Object.keys(ICON_TYPES)]
    },
    color: {
      control: 'select',
      options: [...Object.keys(theme.colors)]
    }
  },
  component: Icon,
  title: 'Components/Icon'
} as Meta<IconProps>

const Template: Story<IconProps> = args => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'grayScale20',
  size: 24,
  type: 'box'
}
