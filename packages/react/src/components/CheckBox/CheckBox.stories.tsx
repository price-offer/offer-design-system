import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import { CheckBox } from './index'
import type { CheckBoxProps } from './index'
import useCheckList from './hooks'

export default {
  component: CheckBox,
  title: 'Components/Checkbox'
} as Meta<CheckBoxProps>

const Template: Story<CheckBoxProps> = args => {
  const checkItems = [
    {
      code: 'option1',
      checked: true,
      element: <div>옵션1입니다.</div>
    },
    {
      code: 'option2',
      checked: false,
      element: <div>옵션2입니다.</div>
    }
  ]
  const { onCheckItem, checkList } = useCheckList(checkItems)

  return (
    <>
      {checkList.map(checkItem => {
        return (
          <CheckBox
            key={checkItem.code}
            {...args}
            checked={checkItem.checked}
            code={checkItem.code}
            element={checkItem.element}
            onCheck={onCheckItem}
          />
        )
      })}
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  formName: 'checkTest',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  }
}
