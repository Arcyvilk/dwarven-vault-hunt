import { useState } from "react"
import { Item } from "../../game/items"
import { EventBus, EventEmit } from "../../game/events"
import { Action } from "../../game/scenes/ArcyScene/types"

export const useItem = () => {
  const [activeItem, setActiveItem] = useState<Item>()
  const [activeAction, setActiveAction] = useState<Action<Item>>()

  EventBus.on(EventEmit.ITEM_VIEW, (item: Item, action: Action<Item>) => {
    setActiveAction(action)
    setActiveItem(item)
  })

  EventBus.on(EventEmit.ITEM_OTHER, (item: Item, action: Action<Item>) => {
    setActiveAction(action)
    setActiveItem(item)
  })

  const onClose = () => {
    setActiveAction(undefined)
    setActiveItem(undefined)
  }

  return {
    activeItem,
    activeAction,
    onClose,
  }
}
