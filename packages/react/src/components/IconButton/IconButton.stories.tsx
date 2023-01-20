import type { Meta, Story } from '@storybook/react'
import { IconButton } from './index'
import type { IconButtonProps } from './index'

export default {
  component: IconButton,
  title: 'Components/IconButton'
} as Meta<IconButtonProps>

const Template: Story<IconButtonProps> = args => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  colorType: 'brandPrimary',
  icon: 'arrowLeft',
  shape: 'rounded',
  size: 'small'
}
