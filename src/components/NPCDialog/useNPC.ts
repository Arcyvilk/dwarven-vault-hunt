import { useState } from "react"
import { NPC } from "../../game/npcs"
import { EventBus } from "../../game/EventBus"

export const useNPC = () => {
  const [activeNPC, setActiveNPC] = useState<NPC>()
  const [isNPCViewOpen, setIsNPCViewOpen] = useState(false)
  const [isNPCTalkOpen, setIsNPCTalkOpen] = useState(false)
  const [isNPCAttackOpen, setIsNPCAttackOpen] = useState(false)

  EventBus.on("npc_view", (npc: NPC) => {
    setIsNPCViewOpen(true)
    setActiveNPC(npc)
  })

  EventBus.on("npc_talk", (npc: NPC) => {
    setIsNPCTalkOpen(true)
    setActiveNPC(npc)
  })

  EventBus.on("npc_attack", (npc: NPC) => {
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
