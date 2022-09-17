import type { Meta, Story } from '@storybook/react'
import { ImageUploader } from './index'
import type { ImageUploaderProps } from './index'
import { v4 as uuidv4 } from 'uuid'

export default {
  argTypes: {},
  component: ImageUploader,
  title: 'Components/ImageUploader'
} as Meta<ImageUploaderProps>

const Template: Story<ImageUploaderProps> = args => <ImageUploader {...args} />
export const Primary = Template.bind({})
Primary.args = {
  fileList: [
    {
      id: uuidv4(),
      isRepresent: false,
      name: '테스트 이미지1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidv4(),
      isRepresent: true,
      name: '테스트 이미지2',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ],
  onChange: ({ eventType, fileList }): void => {
    console.log(eventType, fileList)
  }
}
