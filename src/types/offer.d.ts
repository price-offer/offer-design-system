/** SelectBox  */
interface SelectOptions {
  text: string
  value: string | number
}
export declare type SelectOnChangeHandler = (item: SelectOptions) => void

/**  ImageUploader */
export interface ImageInfo {
  isRepresent: boolean
  id: string
  url: string
}
interface ImageUploaderParams {
  eventType: 'upload' | 'remove'
  imageList: ImageInfo[]
}
export declare type UploaderOnChangeHandler = (
  params: ImageUploaderParams
) => void

/** Theme  */
export declare type ThemeOption<T, K> = { [key in T]: K }
export declare type StyledProps<T, K extends keyof T> = Required<Pick<T, K>>
