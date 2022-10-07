export const reformPrice = (value: string): string =>
  value
    .split('')
    .map((num, index, arr) => {
      const needComma = (arr.length - index) % 3 === 0 && index !== 0

      return needComma ? `,${num}` : num
    })
    .join('')

export const validationNumber = (value: string, isPrice: boolean): string => {
  const numberValue = value.replace(/[^0-9]/g, '')

  return isPrice ? reformPrice(numberValue) : numberValue
}
