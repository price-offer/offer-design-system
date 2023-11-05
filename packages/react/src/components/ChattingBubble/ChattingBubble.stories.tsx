import type { Meta, StoryObj } from '@storybook/react'
import { ChattingBubble as ChattingBubbleComponent } from './index'

type ChattingBubble = typeof ChattingBubbleComponent

const meta: Meta<ChattingBubble> = {
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  },
  component: ChattingBubbleComponent,
  title: 'Components/ChattingBubble'
}

export default meta

export const Default: StoryObj<ChattingBubble> = {
  args: {
    children:
      'Sender입니다. 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대 문장으로 대화를 나눠볼까요? 최대 입력가능 문자수는 100자. 여기까지가 최대',
    messageType: 'send'
  },
  render: args => <ChattingBubbleComponent {...args} />
}
