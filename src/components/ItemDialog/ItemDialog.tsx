import { Item } from "../../game/items"
import { Action } from "../../game/scenes/ArcyScene/types"
import { Modal } from "../Modal"
import { useItem } from "./useItem"

export const ItemDialog = () => {
  const { activeItem, isItemViewOpen, onCloseView } = useItem()

  if (!activeItem) return

  if (isItemViewOpen)
    return <ItemViewModal item={activeItem} onClose={onCloseView} />
}

type ItemActionProps = {
  item: Item
  onClose: () => void
}

const ItemViewModal = ({ item, onClose }: ItemActionProps) => {
  const result = item.actions.find(
    (a: Action) => a.type === "item_view",
  )?.result
  return (
    <Modal isOpen onClose={onClose}>
      {result}
    </Modal>
  )
}
