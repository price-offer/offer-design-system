import { Input, INPUT_STYLE_KEYS } from './index'
import type { Meta, Story } from '@storybook/react'
import type { InputProps } from './index'

export default {
  argTypes: {
    hasWon: {
      control: 'boolean'
    },
    inputSize: {
      control: 'radio',
      options: ['small', 'large']
    },
    inputStyle: {
      control: 'radio',
      options: Object.values(INPUT_STYLE_KEYS)
    },
    status: {
      control: 'radio',
      options: ['error', 'success', 'default', 'none']
    }
  },
  components: Input,
  title: 'Components/Input'
} as Meta<InputProps>

const Template: Story<InputProps> = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  hasWon: true,
  inputSize: 'large',
  inputStyle: INPUT_STYLE_KEYS.DEFAULT,
  label: '라벨',
  placeholder: '내용을 입력하세요',
  status: 'success'
}

export const Chatting = Template.bind({})
Chatting.args = {
  inputSize: 'large',
  inputStyle: 'chatting',
  placeholder: '내용을 입력하세요'
}

export const Search = Template.bind({})
Search.args = {
  inputSize: 'large',
  inputStyle: 'search',
  placeholder: '내용을 입력하세요'
}
