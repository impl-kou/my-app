import { useState } from "react"

export const useMutableArray = <T>(defalutValue?: T[]) => {
  const [items, setItems] = useState<T[]>(defalutValue ?? [])

  const updateNthItem = (n: number) => (newItem: T) => {
    setItems((prev) => {
      const next = [...prev]
      next[n] = newItem
      return next
    })
  }
  const deleteNthItem = (n: number) => {
    setItems((prev) => {
      const next = [...prev]
      next.splice(n, 1)
      return next
    })
  }

  const addItem = (item: T) => {
    setItems((prev) => [...prev, item])
  }

  return {
    items,
    updateNthItem,
    deleteNthItem,
    addItem,
  }
}
