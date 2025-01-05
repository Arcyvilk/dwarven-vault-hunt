import styled from "styled-components"
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
      <Content>
        <Header>
          <Image>
            <img src="https://dwarffortresswiki.org/images/7/70/Statue_covered_sprite.png" />
          </Image>
          <Details>
            <Name>{item.data.name}</Name>
            <Weight>Weight: {item.data.weight}Γ</Weight>
          </Details>
        </Header>
        <Description>
          <span>
            This is a {item.data.quality} {item.data.rawName}.
          </span>{" "}
          {item.data.decoration && (
            <span>The item is an image of {item.data.decoration}.</span>
          )}
        </Description>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  aspect-ratio: 2/3;
  gap: 42px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-end;
`
const Image = styled.div`
  height: 64px;
  aspect-ratio: 1;
  border: 3px solid #333333;
  padding: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
`
const Name = styled.span``
const Weight = styled.span`
  color: #fdf900;
`
const Description = styled.p`
  margin: 0;
`
