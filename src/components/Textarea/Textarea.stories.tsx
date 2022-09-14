import type { Meta, Story } from '@storybook/react'
import { TextArea } from './index'
import type { TextAreaProps } from './index'

export default {
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  },
  component: TextArea,
  title: 'Component/TextArea'
} as Meta<TextAreaProps>

const OverViewTemplate: Story<TextAreaProps> = args => (
  <div>
    <h1>TextArea OverView</h1>
    <br />
    <div style={{ display: 'flex', gap: '30px' }}>
      <div>
        <h2>default</h2>
        <br />
        <TextArea
          {...args}
          BgType="filled"
          label="라벨"
          placeholder="내용을 입력하세요"
        />
      </div>
      <div>
        <h2>hoverd/typing</h2>
        <br />
        <TextArea
          {...args}
          BgType="filled"
          autoFocus
          label="라벨"
          placeholder="내용을 입력하세요"
        />
      </div>
    </div>
    <br />
    <br />
    <div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div>
          <h2>label = X guide message = O</h2>
          <br />
          <TextArea
            {...args}
            BgType="filled"
            guideMessage="안내 메세지"
            placeholder="내용을 입력하세요"
          />
        </div>
        <div>
          <h2>complete</h2>
          <br />
          <TextArea
            {...args}
            BgType="filled"
            guideMessage="안내 메세지"
            placeholder="내용을 입력하세요">
            내용 입력 완료
          </TextArea>
        </div>
      </div>
    </div>
  </div>
)

const Template: Story<TextAreaProps> = args => (
  <div>
    <TextArea {...args} />
  </div>
)

export const OverView = OverViewTemplate.bind({})

export const Default = Template.bind({})

Default.args = {
  BgType: 'filled',
  children: '',
  guideMessage: '',
  label: '라벨'
}
export const NoLabel = Template.bind({})

NoLabel.args = {
  BgType: 'filled',
  children: '',
  guideMessage: '안내 메세지',
  label: ''
}

export const Filled = Template.bind({})

Filled.args = {
  BgType: 'filled',
  children: '',
  guideMessage: '안내 메세지',
  label: '라벨'
}

export const Ghost = Template.bind({})

Ghost.args = {
  BgType: 'ghost',
  children: '',
  guideMessage: '안내 메세지',
  label: '라벨'
}
