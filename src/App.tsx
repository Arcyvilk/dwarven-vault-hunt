import { useRef, useState } from "react"
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame"
import { EventBus, EventEmit } from "./game/events"
import { NPC } from "./game/npcs"
import { Item } from "./game/items"

import {
  InteractionDecisionModal,
  DebugSidebar,
  ItemDialog,
} from "./components"
import { NPCDialog } from "./components/NPCDialog"

const App = () => {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  const {
    isInteractionDecisionVisible,
    itemInteraction,
    npcInteraction,
    onClose,
  } = useEventTriggers()

  EventBus.on(EventEmit.CHANGE_SCENE, (newScene: string) => {
    console.log(newScene)
    phaserRef.current?.scene?.scene.transition({
      target: newScene,
      duration: 1000,
    })
  })

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
      <DebugSidebar />
      {isInteractionDecisionVisible && itemInteraction && (
        <InteractionDecisionModal item={itemInteraction} onClose={onClose} />
      )}
      {isInteractionDecisionVisible && npcInteraction && (
        <InteractionDecisionModal npc={npcInteraction} onClose={onClose} />
      )}

      <NPCDialog />
      <ItemDialog />
    </div>
  )
}

export default App

const useEventTriggers = () => {
  const [isInteractionDecisionVisible, setIsInteractionDecisionVisible] =
    useState(false)

  const [itemInteraction, setItemInteraction] = useState<Item>()
  const [npcInteraction, setNPCInteraction] = useState<NPC>()

  EventBus.on(EventEmit.ITEM_INTERACTION, (interaction: Item) => {
    setItemInteraction(interaction)
    setIsInteractionDecisionVisible(true)
  })

  EventBus.on(EventEmit.NPC_INTERACTION, (interaction: NPC) => {
    setNPCInteraction(interaction)
    setIsInteractionDecisionVisible(true)
  })

  const onClose = () => {
    setIsInteractionDecisionVisible(false)
  }

  return {
    isInteractionDecisionVisible,
    itemInteraction,
    npcInteraction,
    onClose,
  }
}
