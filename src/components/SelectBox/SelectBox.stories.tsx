import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SelectBox } from './index'
import type { SelectBoxProps } from './index'

export default {
  argTypes: {
    colorScheme: {
      control: 'radio',
      options: ['none', 'light', 'dark']
    }
  },
  component: SelectBox,
  title: 'Components/SelectBox'
} as Meta<SelectBoxProps>

const Template: Story<SelectBoxProps> = args => <SelectBox {...args} />
export const Primary = Template.bind({})
Primary.args = {
  colorScheme: 'light',
  onChange: (options): void => {
    action(JSON.stringify(options))
  },
  options: [
    {
      text: '선택1',
      value: 'select1'
    },
    {
      text: '선택2',
      value: 'select2'
    }
  ],
  value: 'select1'
}
