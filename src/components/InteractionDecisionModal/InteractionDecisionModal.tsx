import styled from "styled-components"
import { ItemInteraction } from "../../game/scenes/ArcyScene/types"
import { Modal } from "../Modal"
import { mapOptions } from "../../utils"
import { NPC } from "../../game/npcs/NPC"

type Props = {
  interaction?: ItemInteraction
  npc?: NPC
  isOpen: boolean
  onClose: () => void
}
export const InteractionDecisionModal = ({
  interaction,
  npc,
  isOpen,
  onClose,
}: Props) => {
  const getActions = () => {
    if (interaction) return mapOptions(interaction.actions)
    if (npc) return mapOptions(npc.actions)
    return []
  }
  const actions = getActions()

  if (!isOpen) return null
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
                <span style={{ color: "#0da50d" }}>{action.letter}</span>
                <span>{action.description}</span>
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
