export type Border = typeof border
export type BorderKeys = keyof Border

export const border = {
  bold: '8px',
  regular: '1px'
} as const
