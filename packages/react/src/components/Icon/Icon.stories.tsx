import { colors } from '@offer-ui/styles/themes'
import type { Meta, Story } from '@storybook/react'
import { Icon, ICON_TYPES } from './index'
import type { IconProps } from './index'

export default {
  argType: {
    type: {
      control: 'select',
      options: [...Object.keys(ICON_TYPES)]
    },
    color: {
      control: 'select',
      options: [...Object.keys(colors)]
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
