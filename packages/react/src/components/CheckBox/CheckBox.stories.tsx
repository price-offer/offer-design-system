import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import type { ChangeEvent } from 'react'
import useCheckList from './hooks'
import { CheckBox as CheckBoxComponent } from './index'

type CheckBox = typeof CheckBoxComponent

const meta: Meta<CheckBox> = {
  component: CheckBoxComponent,
  title: 'Components/Checkbox'
}

export default meta

export const Default: StoryObj<CheckBox> = {
  args: {
    formName: 'checkTest',
    onChange: (e: ChangeEvent<HTMLFormElement>): void => {
      const { name, value } = e.target
      action('onChange')(name, value)
    }
  },
  render: args => {
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
            <CheckBoxComponent
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
}
