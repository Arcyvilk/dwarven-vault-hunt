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
import { ArcyScene } from "./game/scenes/ArcyScene"

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
    if (phaserRef.current?.scene) {
      const scene = phaserRef.current.scene as ArcyScene
      scene.changeScene(newScene)
    }
  })

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
      <DebugSidebar />
      {isInteractionDecisionVisible && itemInteraction && (
        <InteractionDecisionModal entity={itemInteraction} onClose={onClose} />
      )}
      {isInteractionDecisionVisible && npcInteraction && (
        <InteractionDecisionModal entity={npcInteraction} onClose={onClose} />
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
