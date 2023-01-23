import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import type { ChangeEvent } from 'react'
import { CheckBox } from './index'
import type { CheckBoxProps } from './index'
import useCheckList from '@offer-ui/hooks/useCheckList'

export default {
  component: CheckBox,
  title: 'Components/Checkbox'
} as Meta<CheckBoxProps>

const Template: Story<CheckBoxProps> = args => {
  const checkItems = [
    {
      code: 'option1',
      checked: true,
      element: <div>옵션1입니다</div>
    }
  ]
  const { onCheckItem, checkList } = useCheckList(checkItems)

  return (
    <>
      <CheckBox
        {...args}
        checked={checkList[0]?.checked}
        code={checkList[0]?.code}
        element={checkList[0]?.element}
        onCheck={onCheckItem}
      />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  formName: 'checkTest',
  direction: 'horizontal',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target
    action('onChange')(name, value)
  }
}
