import { useState } from "react"
import { NPC } from "../../game/npcs"
import { EventBus, EventEmit } from "../../game/events"
import { Action } from "../../game/scenes/ArcyScene/types"

export const useNPC = () => {
  const [activeNPC, setActiveNPC] = useState<NPC>()
  const [activeAction, setActiveAction] = useState<Action<NPC>>()

  EventBus.on(EventEmit.NPC_VIEW, (npc: NPC, action: Action<NPC>) => {
    setActiveAction(action)
    setActiveNPC(npc)
  })

  EventBus.on(EventEmit.NPC_TALK, (npc: NPC, action: Action<NPC>) => {
    setActiveAction(action)
    setActiveNPC(npc)
  })

  EventBus.on(EventEmit.NPC_ATTACK, (npc: NPC, action: Action<NPC>) => {
    setActiveAction(action)
    setActiveNPC(npc)
  })

  const onClose = () => {
    setActiveAction(undefined)
    setActiveNPC(undefined)
  }

  return {
    activeNPC,
    activeAction,
    onClose,
  }
}
