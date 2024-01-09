import type { Meta, StoryObj } from '@storybook/react'
import { Input as InputComponent } from './index'

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
    status: 'success'
  },
  render: args => <InputComponent {...args} />
}

export const Chatting: StoryObj<Input> = {
  args: {
    guideMessage: '안내 메세지',
    inputSize: 'large',
    isPrice: true,
    label: '라벨',
    placeholder: '내용을 입력하세요',
    status: 'success'
  },
  render: args => <InputComponent.Chatting {...args} />
}

export const Edit: StoryObj<Input> = {
  args: {
    guideMessage: '안내 메세지',
    inputSize: 'large',
    isPrice: true,
    label: '라벨',
    placeholder: '내용을 입력하세요',
    status: 'success'
  },
  render: args => <InputComponent.Edit {...args} />
}

export const Search: StoryObj<Input> = {
  args: {
    guideMessage: '안내 메세지',
    inputSize: 'large',
    isPrice: true,
    label: '라벨',
    placeholder: '내용을 입력하세요',
    status: 'success'
  },
  render: args => <InputComponent.Search {...args} />
}
