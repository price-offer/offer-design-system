import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import type { CheckBoxProps } from './index'
import { Radio } from './index'
import useCheckList from '@offer-ui/hooks/useCheckList'

export default {
  component: Radio,
  title: 'Components/Checkbox'
} as Meta<CheckBoxProps>

const CheckBox: Story<CheckBoxProps> = () => {
  const checkItems = [
    {
      code: 'option1',
      checked: false,
      element: <div>옵션1입니다.</div>
    },
    {
      code: 'option2',
      checked: false,
      element: <div>옵션2입니다</div>
    },
    {
      code: 'option3',
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
