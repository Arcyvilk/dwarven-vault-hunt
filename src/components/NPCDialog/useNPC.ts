import { useState } from "react"
import { NPC } from "../../game/npcs"
import { EventBus, EventEmit } from "../../game/events"

export const useNPC = () => {
  const [activeNPC, setActiveNPC] = useState<NPC>()
  const [isNPCViewOpen, setIsNPCViewOpen] = useState(false)
  const [isNPCTalkOpen, setIsNPCTalkOpen] = useState(false)
  const [isNPCAttackOpen, setIsNPCAttackOpen] = useState(false)

  EventBus.on(EventEmit.NPC_VIEW, (npc: NPC) => {
    setIsNPCViewOpen(true)
    setActiveNPC(npc)
  })

  EventBus.on(EventEmit.NPC_TALK, (npc: NPC) => {
    setIsNPCTalkOpen(true)
    setActiveNPC(npc)
  })

  EventBus.on(EventEmit.NPC_ATTACK, (npc: NPC) => {
    setIsNPCAttackOpen(true)
    setActiveNPC(npc)
  })

  const onCloseAttack = () => setIsNPCAttackOpen(false)
  const onCloseTalk = () => setIsNPCTalkOpen(false)
  const onCloseView = () => setIsNPCViewOpen(false)

  return {
    activeNPC,
    isNPCAttackOpen,
    onCloseAttack,
    isNPCTalkOpen,
    onCloseTalk,
    isNPCViewOpen,
    onCloseView,
  }
}
