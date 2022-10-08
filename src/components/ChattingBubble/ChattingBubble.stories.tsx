import type { Meta, Story } from '@storybook/react'
import { ChattingBubble } from './index'
import type { ChattingBubbleProps } from './index'

export default {
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  },
  component: ChattingBubble,
  title: 'Components/ChattingBubble'
} as Meta<ChattingBubbleProps>

const Template: Story<ChattingBubbleProps> = args => (
  <ChattingBubble {...args} />
)

export const Default = Template.bind({})

Default.args = {
  children:
    'Sender입니다. 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대화 대화대화대 문장으로 대화를 나눠볼까요? 최대 입력가능 문자수는 100자. 여기까지가 최대',
  type: 'send'
}

Default.parameters = {
  backgrounds: { default: 'light' }
}
