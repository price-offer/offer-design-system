export type Radius = typeof radius
export type RadiusKeys = keyof Radius

export const radius = {
  round100: '100px',
  round12: '12px',
  round16: '16px',
  round4: '4px',
  round8: '8px'
} as const
