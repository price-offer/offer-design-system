export const isNumber = (value: string): boolean => {
  const numberReg = /^[0-9]+$/g

  return numberReg.test(value)
}

export const isValidImageUrl = (file: unknown): file is string =>
  typeof file === 'string'
