import { Avatar, AVATAR_WRAPPER_SIZE } from './index'
import type { Meta, Story } from '@storybook/react'
import type { AvatarProps } from './index'

export default {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.keys(AVATAR_WRAPPER_SIZE)
    }
  },
  component: Avatar,
  title: 'Components/Avatar'
} as Meta<AvatarProps>

const Template: Story<AvatarProps> = args => <Avatar {...args} />
export const Default = Template.bind({})
Default.args = {
  alt: 'avatar',
  size: 'medium',
  src: 'https://picsum.photos/100'
}
