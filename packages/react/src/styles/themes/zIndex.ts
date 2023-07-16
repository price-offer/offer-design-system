export type ZIndex = typeof zIndex
export type ZIndexKeys = keyof ZIndex

export const zIndex = {
  modal: 300,
  modalIcon: 400,
  selectbox: 200
} as const
