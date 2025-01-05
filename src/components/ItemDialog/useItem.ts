import { useState } from "react"
import { Item } from "../../game/items"
import { EventBus, EventEmit } from "../../game/events"

export const useItem = () => {
  const [activeItem, setActiveItem] = useState<Item>()
  const [isItemViewOpen, setIsItemViewOpen] = useState(false)
  const [isItemOtherOpen, setIsItemOtherOpen] = useState(false)

  EventBus.on(EventEmit.ITEM_VIEW, (item: Item) => {
    setIsItemViewOpen(true)
    setActiveItem(item)
  })

  EventBus.on(EventEmit.ITEM_OTHER, (item: Item) => {
    setIsItemOtherOpen(true)
    setActiveItem(item)
  })

  const onCloseView = () => setIsItemViewOpen(false)
  const onCloseOther = () => setIsItemOtherOpen(false)

  return {
    activeItem,
    isItemViewOpen,
    isItemOtherOpen,
    onCloseView,
    onCloseOther,
  }
}
