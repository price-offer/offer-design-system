import type { ComponentMeta } from '@storybook/react'
import Test from './index'

export default {
  argTypes: {},
  component: Test,
  title: 'Component/Test'
} as ComponentMeta<typeof Test>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Template = () => <Test />

export const TestComponent = Template.bind({})
