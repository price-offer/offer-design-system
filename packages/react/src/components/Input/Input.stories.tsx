import type { Meta, StoryObj } from '@storybook/react'
import { Input as InputComponent, INPUT_STYLE_KEYS } from './index'

type Input = typeof InputComponent

const meta: Meta<Input> = {
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
  component: InputComponent,
  title: 'Components/Input'
}

export default meta

export const Default: StoryObj<Input> = {
  args: {
    guideMessage: '안내 메세지',
    inputSize: 'large',
    isPrice: true,
    label: '라벨',
    placeholder: '내용을 입력하세요',
    status: 'success',
    styleType: 'default'
  },
  render: args => <InputComponent {...args} />
}
