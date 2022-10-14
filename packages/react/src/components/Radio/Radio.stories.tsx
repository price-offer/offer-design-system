import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import { Radio } from './index'
import type { RadioProps } from './index'

export default {
  component: Radio,
  title: 'Components/Radio'
} as Meta<RadioProps>

const Template: Story<RadioProps> = args => <Radio {...args} />

export const Default = Template.bind({})
Default.args = {
  formName: 'radiotest',
  items: [
    {
      code: 'option1',
      name: '옵션 1'
    },
    {
      code: 'option1',
      name: '옵션 2'
    },
    {
      code: 'option1',
      name: '옵션 3'
    }
  ],
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  }
}
