import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import { Radio } from './index'
import type { RadioProps } from './index'
import useCheckList from '@offer-ui/hooks/useCheckList'

export default {
  component: Radio,
  title: 'Components/Radio'
} as Meta<RadioProps>

const CheckBox: Story<RadioProps> = () => {
  const checkItems = [
    {
      code: 'option1',
      name: '',
      checked: false,
      element: <div>옵션1입니다.</div>
    },
    {
      code: 'option2',
      name: '',
      checked: false,
      element: <div>옵션2입니다</div>
    },
    {
      code: 'option3',
      name: '',
      checked: false,
      element: <div>옵션3입니다</div>
    }
  ]
  const { onCheckItem, checkList } = useCheckList(checkItems)

  return (
    <>
      <Radio
        componentType="checkbox"
        direction="vertical"
        formName="radiotest"
        items={checkList}
        onChange={(e: ChangeEvent<HTMLFormElement>): void => {
          const { name, value } = e.target
          action('onChange')(name, value)
        }}
        onCheck={onCheckItem}
      />
    </>
  )
}

export const CheckBoxType = CheckBox.bind({})

const Template: Story<RadioProps> = args => {
  return (
    <>
      <Radio {...args} />
    </>
  )
}
export const RadioButton = Template.bind({})
RadioButton.args = {
  formName: 'radiotest',
  items: [
    {
      code: 'option1',
      name: '옵션1',
      checked: true,
      element: <div>.</div>
    },
    {
      code: 'option2',
      name: '옵션2',
      checked: true,
      element: <div>.</div>
    },
    {
      code: 'option3',
      name: '옵션3',
      checked: true,
      element: <div>.</div>
    }
  ],
  componentType: 'radio',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  }
}
