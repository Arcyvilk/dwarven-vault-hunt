import styled from "styled-components"
import { Modal } from "../Modal"
import { NPC } from "../../game/npcs"
import { Item } from "../../game/items"
import { useKeyboardNavigation } from "../../hooks"

type Props = {
  item?: Item
  npc?: NPC
  onClose: () => void
}
export const InteractionDecisionModal = ({ item, npc, onClose }: Props) => {
  const rawActions = item?.actions ?? npc?.actions ?? []
  const { actions } = useKeyboardNavigation(rawActions)

  return (
    <Modal isOpen onClose={onClose}>
      <Content>
        <Header>
          <div>What do you want to do?</div>
          <ButtonCancel onClick={onClose}>Cancel</ButtonCancel>
        </Header>
        <Section>
          <Icon />
          <Actions>
            {actions.map((action) => (
              <StyledAction>
                <span style={{ color: "#0da50d" }}>{action.key}</span>
                <span>{action.prompt}</span>
              </StyledAction>
            ))}
          </Actions>
        </Section>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 24px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
`

const ButtonCancel = styled.button`
  border: 3px groove #000000;
  background-color: #8a0000;
  color: #ffffff;
  padding: 4px 24px;
  cursor: pointer;
`

const Section = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 48px;
`

const Icon = styled.image`
  width: 64px;
  height: 64px;
  border: 3px double #333333;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const StyledAction = styled.button`
  display: flex;
  gap: 24px;
  background-color: black;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
`
