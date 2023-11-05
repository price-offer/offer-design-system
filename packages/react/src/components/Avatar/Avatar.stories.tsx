import type { Meta, StoryObj } from '@storybook/react'
import { Avatar as AvatarComponent, AVATAR_WRAPPER_SIZE } from './index'

type Avatar = typeof AvatarComponent
const meta: Meta<Avatar> = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.keys(AVATAR_WRAPPER_SIZE)
    }
  },
  component: AvatarComponent,
  title: 'Components/Avatar'
}

export default meta

export const Default: StoryObj<Avatar> = {
  args: {
    alt: 'avatar',
    size: 'medium',
    src: 'https://picsum.photos/100'
  },
  render: args => <AvatarComponent {...args} />
}
