import { Input, INPUT_STYLE_KEYS } from './index'
import type { Meta, Story } from '@storybook/react'
import type { InputProps } from './index'

export default {
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['small', 'large']
    },
    inputStyle: {
      control: 'radio',
      options: Object.values(INPUT_STYLE_KEYS)
    },
    isPrice: {
      control: 'boolean'
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
  inputSize: 'large',
  inputStyle: 'default',
  isPrice: true,
  label: '라벨',
  message: '안내 메세지',
  placeholder: '내용을 입력하세요',
  status: 'success'
}
