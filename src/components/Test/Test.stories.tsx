import type { ComponentMeta, ComponentStory } from '@storybook/react'
import Test from './index'

export default {
  argTypes: {},
  component: Test,
  title: 'Component/Test'
} as ComponentMeta<typeof Test>

const Template: ComponentStory<typeof Test> = () => <Test />

export const TestComponent = Template.bind({})
