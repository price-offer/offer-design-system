export type ThemeOption<T, K> = { [key in T]: K }
export type StyledProps<T, K extends keyof T> = Required<Pick<T, K>>
