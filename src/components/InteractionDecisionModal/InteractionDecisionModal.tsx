import styled from "styled-components"
import { Interaction } from "../../game/scenes/ArcyScene/types"
import { Modal } from "../Modal"

type Props = {
  interaction: Interaction
  isOpen: boolean
  onClose: () => void
}
export const InteractionDecisionModal = ({
  interaction,
  isOpen,
  onClose,
}: Props) => {
  return (
    <Modal isOpen={isOpen}>
      <Content>
        <Header>
          <div>What do you want to do?</div>
          <ButtonCancel onClick={onClose}>Cancel</ButtonCancel>
        </Header>
        <Section>
          <Icon />
          <Actions>
            {interaction.actions.map((action) => (
              <StyledAction>
                <button>{action.description}</button>
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
  gap: 64px;
`

const Icon = styled.image`
  width: 64px;
  height: 64px;
  border: 3px double #333333;
`

const Actions = styled.ul`
  list-style-type: lower-latin;
  margin: 0;
  padding: 0;
`

const StyledAction = styled.li`
  margin: 24px 0;

  button {
    background-color: black;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
  }
`
