import type { IconType } from '@offer-ui/components'
import { Icon } from '@offer-ui/components'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { DIRECTION } from './Default'
import { Radio as RadioComponent } from './index'

type Radio = typeof RadioComponent

const meta: Meta<Radio> = {
  component: RadioComponent,
  title: 'Components/Radio',
  argTypes: {
    direction: {
      control: 'radio',
      options: Object.values(DIRECTION)
    }
  }
}

export default meta

const moodList: IconType[] = ['sad', 'meh', 'smile']

export const Default: StoryObj<Radio> = {
  args: {
    formName: 'mood',
    items: moodList.map(mood => ({
      code: mood,
      name: mood
    })),
    onChange: (e: ChangeEvent<HTMLFormElement>): void => {
      const { name, value } = e.target

      action('onChange')(name, value)
    }
  },
  render: args => <RadioComponent {...args} />
}

export const Children: StoryObj<Radio> = {
  args: {
    formName: 'mood',
    onChange: (e: ChangeEvent<HTMLFormElement>): void => {
      const { name, value } = e.target

      action('onChange')(name, value)
    }
  },
  render: args => {
    return (
      <RadioComponent {...args}>
        {moodList.map(mood => (
          <RadioComponent.Label key={mood}>
            <RadioComponent.Input formName={args.formName} value={mood} />
            <Icon type={mood} />
          </RadioComponent.Label>
        ))}
      </RadioComponent>
    )
  }
}
