import type { Meta, Story } from '@storybook/react'
import { Input, INPUT_STYLE_KEYS } from './index'
import type { InputProps } from './index'

export default {
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['small', 'large']
    },
    isPrice: {
      control: 'boolean'
    },
    status: {
      control: 'radio',
      options: ['error', 'success', 'default', 'none']
    },
    styleType: {
      control: 'radio',
      options: Object.values(INPUT_STYLE_KEYS)
    },
    disabled: {
      control: 'boolean'
    }
  },
  components: Input,
  title: 'Components/Input'
} as Meta<InputProps>

const Template: Story<InputProps> = args => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  guideMessage: '안내 메세지',
  inputSize: 'large',
  isPrice: true,
  label: '라벨',
  placeholder: '내용을 입력하세요',
  status: 'success',
  styleType: 'default'
}
