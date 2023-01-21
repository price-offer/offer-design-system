import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import { Radio } from './index'
import type { RadioProps } from './index'

export default {
  component: Radio,
  title: 'Components/Radio'
} as Meta<RadioProps>

const Template: Story<RadioProps> = args => {
  return <Radio {...args} />
}

export const Default = Template.bind({})
Default.args = {
  formName: 'radiotest',
  items: [
    {
      code: 'option1',
      name: '옵션dddd 1',
      checked: false,
      element: <div>.</div>
    },
    {
      code: 'option2',
      name: '옵션 2',
      checked: true,
      element: <div>.</div>
    },
    {
      code: 'option3',
      name: '옵션 3',
      checked: true,
      element: <div>.</div>
    }
  ],
  componentType: 'checkbox',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  }
}
