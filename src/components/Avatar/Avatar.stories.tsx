import { Avatar, AVATAR_SIZE } from './index'
import type { Meta, Story } from '@storybook/react'
import type { AvatarProps } from './index'

export default {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.keys(AVATAR_SIZE)
    }
  },
  component: Avatar,
  title: 'Components/Avatar'
} as Meta<AvatarProps>

const Template: Story<AvatarProps> = args => <Avatar {...args} />
export const Primary = Template.bind({})
Primary.args = {
  alt: 'avatar',
  size: 'medium',
  src: 'https://picsum.photos/100'
}
