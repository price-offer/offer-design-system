import type { Meta, Story } from '@storybook/react'
import { TextArea } from './index'
import type { TextAreaProps } from './index'

export default {
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  },
  component: TextArea,
  title: 'Component/TextArea'
} as Meta<TextAreaProps>

const Template: Story<TextAreaProps> = args => (
  <div>
    <TextArea {...args} />
  </div>
)

export const Filled = Template.bind({})

Filled.args = {
  BgType: 'filled',
  children: '',
  guideMessage: '안내 메세지',
  label: '라벨'
}

export const Ghost = Template.bind({})

Ghost.args = {
  BgType: 'ghost',
  children: '',
  guideMessage: '안내 메세지',
  label: '라벨'
}
