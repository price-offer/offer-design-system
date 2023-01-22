/** SelectBox  */
export interface SelectItem<T = string> {
  code: T
  name: string
}
export declare type SelectOnChangeHandler<T = string> = (
  item: SelectItem<T>
) => void

/**  ImageUploader */
export interface ImageInfo {
  isRepresent: boolean
  id: string
  url: string
}
interface ImageUploaderParams {
  eventType: 'upload' | 'remove'
  images: ImageInfo[]
}
export declare type UploaderOnChangeHandler = (
  params: ImageUploaderParams
) => void

/** Theme  */
export declare type StyledProps<T, K extends keyof T> = Required<Pick<T, K>>
