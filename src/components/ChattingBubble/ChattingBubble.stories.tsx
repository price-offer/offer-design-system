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
  <div>
    <ChattingBubble {...args} />
  </div>
)

export const Sender = Template.bind({})

Sender.args = {
  children:
    'Sender입니다. 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대 문장으로 대화를 나눠볼까요? 최대 입력가능 문자수는 100자. 여기까지가 최대',
  user: 'sender'
}

Sender.parameters = {
  backgrounds: { default: 'dark' }
}

export const Recevier = Template.bind({})

Recevier.args = {
  children:
    'Recevier입니다. 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대 문장으로 대화를 나눠볼까요? 최대 입력가능 문자수는 100자. 여기까지가 최대',
  user: 'receiver'
}

Recevier.parameters = {
  backgrounds: { default: 'dark' }
}
