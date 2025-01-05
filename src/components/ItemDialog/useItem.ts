import { useState } from "react"
import { Item } from "../../game/items"
import { EventBus, EventEmit } from "../../game/events"

export const useItem = () => {
  const [activeItem, setActiveItem] = useState<Item>()
  const [isItemViewOpen, setIsItemViewOpen] = useState(false)

  EventBus.on(EventEmit.ITEM_VIEW, (item: Item) => {
    setIsItemViewOpen(true)
    setActiveItem(item)
  })

  const onCloseView = () => setIsItemViewOpen(false)

  return {
    activeItem,
    isItemViewOpen,
    onCloseView,
  }
}
