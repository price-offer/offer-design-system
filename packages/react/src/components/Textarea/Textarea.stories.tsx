import type { Meta, StoryObj } from '@storybook/react'
import { TextArea as TextAreaComponent } from './index'

type TextArea = typeof TextAreaComponent

const meta: Meta<TextArea> = {
  component: TextAreaComponent,
  title: 'Components/TextArea'
}

export default meta

export const Default: StoryObj<TextArea> = {
  args: {
    bgType: 'filled',
    guideMessage: '안내 메세지',
    label: '라벨',
    placeholder: 'plaecholder'
  },
  render: args => <TextAreaComponent {...args} />
}
