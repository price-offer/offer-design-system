import type { IconType } from '@offer-ui/components'
import { Icon } from '@offer-ui/components'
import { action } from '@storybook/addon-actions'
import type { Meta, Story } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { DIRECTION } from './Default'
import type { RadioProps } from './index'
import { Radio } from './index'

export default {
  component: Radio,
  title: 'Components/Radio',
  argTypes: {
    direction: {
      control: 'radio',
      options: Object.values(DIRECTION)
    }
  }
} as Meta<RadioProps>

const moodList: IconType[] = ['sad', 'meh', 'smile']

const DefaultTemplate: Story<RadioProps> = args => {
  return <Radio {...args} />
}

export const Default = DefaultTemplate.bind({})
Default.args = {
  formName: 'mood',
  items: moodList.map(mood => ({
    code: mood,
    name: mood
  })),
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target

    action('onChange')(name, value)
  }
}

const ChildrenTemplate: Story<RadioProps> = args => {
  return (
    <Radio {...args}>
      {moodList.map(mood => (
        <Radio.Label key={mood}>
          <Radio.Input formName={args.formName} value={mood} />
          <Icon type={mood} />
        </Radio.Label>
      ))}
    </Radio>
  )
}

export const Children = ChildrenTemplate.bind({})
Children.args = {
  formName: 'mood',
  onChange: (e: ChangeEvent<HTMLFormElement>): void => {
    const { name, value } = e.target

    action('onChange')(name, value)
  }
}
