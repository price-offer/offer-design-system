import type { Meta, Story } from '@storybook/react'
import { SelectBox } from './index'
import type { SelectBoxProps } from './index'
import type { SelectOnChangeHandler } from '@offer-ui/types/offer'
import { useState } from 'react'

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

const Template: Story<SelectBoxProps> = args => {
  const [value, setValue] = useState<string>('select1')

  const handleChange: SelectOnChangeHandler<{ code: string; name: string }> = (
    item
  ): void => {
    setValue(item.code)
  }

  return (
    <div>
      <button
        type="button"
        onClick={(): void => {
          setValue('select1')
        }}>
        선택1
      </button>
      <button
        type="button"
        onClick={(): void => {
          setValue('select2')
        }}>
        선택2
      </button>
      <SelectBox {...args} value={value} onChange={handleChange} />
    </div>
  )
}
export const Default = Template.bind({})
Default.args = {
  colorType: 'light',
  items: [
    {
      code: 'select1',
      name: '선택1'
    },
    {
      code: 'select2',
      name: '선택2'
    }
  ],
  size: 'small'
}
