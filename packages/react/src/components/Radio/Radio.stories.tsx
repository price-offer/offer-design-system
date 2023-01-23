import type { ChangeEvent, ReactNode } from 'react'
import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Radio } from './index'
import type { RadioProps } from './index'

export default {
  component: Radio,
  title: 'Components/Radio'
} as Meta<RadioProps>

const Template: Story<RadioProps> = args => {
  return (
    <>
      <Radio {...args} />
    </>
  )
}
export const Default = Template.bind({})
Default.args = {
  formName: 'radiotest',
  items: [
    {
      code: 'option1',
      name: '옵션1'
    },
    {
      code: 'option2',
      name: '옵션2'
    },
    {
      code: 'option3',
      name: '옵션3'
    }
  ],
  componentType: 'radio',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  },
  render: (name: string): ReactNode => {
    return <div>name:{name}</div>
  }
}
