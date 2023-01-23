import type { ReactNode } from 'react'

import { useState } from 'react'

interface CheckItemType {
  code: string
  checked: boolean
  element: ReactNode
}

interface ReturnType {
  checkList: CheckItemType[]
  onCheckItem(code: string): void
}

const useCheckList = (checkList: CheckItemType[]): ReturnType => {
  const [list, setList] = useState<CheckItemType[]>(checkList)

  const onCheckItem = (code: string): void => {
    setList(prevList =>
      prevList.map(item => {
        if (code === item.code) {
          return {
            ...item,
            checked: !item.checked
          }
        }

        return item
      })
    )
  }

  return {
    onCheckItem,
    checkList: list
  }
}

export default useCheckList
