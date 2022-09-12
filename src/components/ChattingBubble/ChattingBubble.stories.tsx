import type { Meta, Story } from '@storybook/react'
import { ChattingBubble } from './index'
import type { ChattingBubbleProps } from './index'
import styled from '@emotion/styled'

export default {
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  },
  component: ChattingBubble,
  title: 'Component/ChattingBubble'
} as Meta<ChattingBubbleProps>

const Template: Story<ChattingBubbleProps> = args => (
  <StyledBackGround>
    <ChattingBubble {...args} />
  </StyledBackGround>
)

export const Sender = Template.bind({})

Sender.args = {
  children: 'Sender입니다.',
  user: 'sender'
}

Sender.parameters = {
  backgrounds: { default: 'dark' }
}

export const Recevier = Template.bind({})

Recevier.args = {
  children: 'Recevier입니다.',
  user: 'receiver'
}

Recevier.parameters = {
  backgrounds: { default: 'dark' }
}

const StyledBackGround = styled.div``
