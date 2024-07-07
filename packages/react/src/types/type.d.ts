export {}

declare global {
  type KeyOf<T> = keyof T

  type ValueOf<T> = T extends unknown[] | Readonly<unknown[]>
    ? T[number]
    : T[keyof T]
}
