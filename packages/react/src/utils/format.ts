import { isNumber } from './validation'

export const toLocaleCurrency = (value: number): string => {
  return value.toLocaleString('kr')
}

export const convertToNumber = (value: string): number => {
  const numberReg = /[^0-9]/g
  const numberValue = isNumber(value) ? value : value.replace(numberReg, '')

  return Number(numberValue)
}

export const convertFirstAlphabetToUppercase = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
