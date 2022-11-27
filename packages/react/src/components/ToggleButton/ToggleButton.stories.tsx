import type { Meta, Story } from '@storybook/react'
import { ToggleButton } from './index'
import type { ToggleButtonProps } from './index'

export default {
  component: ToggleButton,
  title: 'Components/ToggleButton'
} as Meta<ToggleButtonProps>

const Template: Story<ToggleButtonProps> = args => <ToggleButton {...args} />

export const Default = Template.bind({})
Default.args = {
  colorType: 'gray30',
  icon: 'heart',
  shape: 'rounded',
  size: 'medium',
  styleType: 'fill',
  toggleColorType: 'primary'
}
