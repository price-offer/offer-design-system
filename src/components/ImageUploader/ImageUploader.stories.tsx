import type { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ImageUploader } from './index'
import type { ImageUploaderProps } from './index'
import { v4 as uuidV4 } from 'uuid'

export default {
  component: ImageUploader,
  title: 'Components/ImageUploader'
} as Meta<ImageUploaderProps>

const Template: Story<ImageUploaderProps> = args => (
  <div style={{ maxHeight: '304px', maxWidth: '1200px' }}>
    <ImageUploader {...args} />
  </div>
)
export const Default = Template.bind({})
Default.args = {
  imageList: [
    {
      id: uuidV4(),
      isRepresent: true,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      id: uuidV4(),
      isRepresent: false,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ],
  onChange: (params): void => {
    action(JSON.stringify(params))
  }
}
