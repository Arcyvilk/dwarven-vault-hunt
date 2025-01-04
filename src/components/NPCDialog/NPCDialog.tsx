import { NPC } from "../../game/npcs"
import { Action } from "../../game/scenes/ArcyScene/types"
import { Modal } from "../Modal"
import { useNPC } from "./useNPC"

export const NPCDialog = () => {
  const {
    activeNPC,
    isNPCAttackOpen,
    isNPCTalkOpen,
    isNPCViewOpen,
    onCloseAttack,
    onCloseTalk,
    onCloseView,
  } = useNPC()

  if (!activeNPC) return
  if (isNPCAttackOpen)
    return <NPCAttackModal npc={activeNPC} onClose={onCloseAttack} />
  if (isNPCTalkOpen)
    return <NPCTalkModal npc={activeNPC} onClose={onCloseTalk} />
  if (isNPCViewOpen)
    return <NPCViewModal npc={activeNPC} onClose={onCloseView} />
}

type NPCActionProps = {
  npc: NPC
  onClose: () => void
}

const NPCAttackModal = ({ npc, onClose }: NPCActionProps) => {
  const result = npc.actions.find(
    (a: Action) => a.type === "npc_attack",
  )?.result
  return (
    <Modal isOpen onClose={onClose}>
      {result}
    </Modal>
  )
}

const NPCTalkModal = ({ npc, onClose }: NPCActionProps) => {
  const result = npc.actions.find((a: Action) => a.type === "npc_talk")?.result
  return (
    <Modal isOpen onClose={onClose}>
      {result}
    </Modal>
  )
}

const NPCViewModal = ({ npc, onClose }: NPCActionProps) => {
  const result = npc.actions.find((a: Action) => a.type === "npc_view")?.result
  return (
    <Modal isOpen onClose={onClose}>
      {result}
    </Modal>
  )
}
