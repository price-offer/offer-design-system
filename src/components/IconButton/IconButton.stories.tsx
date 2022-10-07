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
  color: 'primary',
  iconButtonStyle: 'rounded',
  size: 'small',
  toggleColor: 'primaryWeak',
  toggleType: 'arrowUp',
  type: 'arrowLeft'
}
