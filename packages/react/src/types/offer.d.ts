export type Option = {
  code: any
  name: any
}
export declare type SelectOnChangeHandler<T = any> = (item: T) => void

/**  ImageUploader */
export type ImageInfo = {
  id: string
  file?: File
  isRepresent?: boolean
  url: string
}
type ImageUploaderParams = {
  eventType: 'upload' | 'remove'
  images: ImageInfo[]
}
export declare type UploaderOnChangeHandler = (
  params: ImageUploaderParams
) => void

/** Theme  */
export declare type StyledProps<T, K extends keyof T> = Required<Pick<T, K>>
