import type { SelectOnChangeHandler } from '@offer-ui/types/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SelectBox as SelectBoxComponent } from './index'

type SelectBox = typeof SelectBoxComponent

const meta: Meta<SelectBox> = {
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
  component: SelectBoxComponent,
  title: 'Components/SelectBox'
}

export default meta

export const Default: StoryObj<SelectBox> = {
  args: {
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
  },
  render: args => {
    const [value, setValue] = useState<string>('select1')

    const handleChange: SelectOnChangeHandler<{
      code: string
      name: string
    }> = (item): void => {
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
        <SelectBoxComponent {...args} value={value} onChange={handleChange} />
      </div>
    )
  }
}
