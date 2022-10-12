import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SelectBox } from './index'
import type { SelectBoxProps } from './index'

export default {
  argTypes: {
    colorType: {
      control: 'radio',
      options: ['none', 'light', 'dark']
    },
    size: {
      control: 'radio',
      options: ['small', 'medium']
    }
  },
  component: SelectBox,
  title: 'Components/SelectBox'
} as Meta<SelectBoxProps>

const Template: Story<SelectBoxProps> = args => <SelectBox {...args} />
export const Default = Template.bind({})
Default.args = {
  colorType: 'light',
  items: [
    {
      text: '선택1',
      value: 'select1'
    },
    {
      text: '선택2',
      value: 'select2'
    }
  ],
  onChange: (options): void => {
    action(JSON.stringify(options))
  },
  size: 'small'
}
