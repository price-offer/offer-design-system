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

const Template: Story<TextAreaProps> = args => <TextArea {...args} />

export const Default = Template.bind({})

Default.args = {
  bgType: 'filled',
  label: '라벨'
}
export const NoLabel = Template.bind({})

NoLabel.args = {
  bgType: 'filled',
  guideMessage: '안내 메세지'
}

export const Filled = Template.bind({})

Filled.args = {
  bgType: 'filled',
  guideMessage: '안내 메세지',
  label: '라벨'
}

export const Ghost = Template.bind({})

Ghost.args = {
  bgType: 'ghost',
  guideMessage: '안내 메세지',
  label: '라벨'
}
