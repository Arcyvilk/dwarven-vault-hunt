import { NPC } from "../../game/npcs"
import { Action } from "../../game/scenes/ArcyScene/types"
import { Modal } from "../Modal"
import { useNPC } from "./useNPC"

export const NPCDialog = () => {
  const { activeNPC, activeAction, onClose } = useNPC()

  if (!activeNPC) return
  if (activeAction?.type === "npc_attack")
    return (
      <NPCAttackModal npc={activeNPC} action={activeAction} onClose={onClose} />
    )
  if (activeAction?.type === "npc_talk")
    return (
      <NPCTalkModal npc={activeNPC} action={activeAction} onClose={onClose} />
    )
  if (activeAction?.type === "npc_view")
    return (
      <NPCViewModal npc={activeNPC} action={activeAction} onClose={onClose} />
    )
}

type NPCActionProps = {
  npc: NPC
  action: Action<NPC>
  onClose: () => void
}

const NPCAttackModal = ({ action, onClose }: NPCActionProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      {action.result}
    </Modal>
  )
}

const NPCTalkModal = ({ action, onClose }: NPCActionProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      {action.result}
    </Modal>
  )
}

const NPCViewModal = ({ action, onClose }: NPCActionProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      {action.result}
    </Modal>
  )
}
