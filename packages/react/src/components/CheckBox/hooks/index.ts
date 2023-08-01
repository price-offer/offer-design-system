import type { ReactNode } from 'react'

import { useState } from 'react'

type CheckItemType = {
  code: any
  checked: boolean
  element: Exclude<ReactNode, undefined | null>
}

type ReturnType = {
  checkList: CheckItemType[]
  onCheckItem(code: any): void
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
