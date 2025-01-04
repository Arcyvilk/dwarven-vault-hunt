import { useRef, useState } from "react"
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame"
import { EventBus } from "./game/EventBus"
import { ItemInteraction } from "./game/scenes/ArcyScene/types"
import { InteractionDecisionModal, DebugSidebar } from "./components"
import { NPC } from "./game/npcs"
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

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
      <DebugSidebar />
      {isInteractionDecisionVisible && itemInteraction && (
        <InteractionDecisionModal
          interaction={itemInteraction}
          onClose={onClose}
        />
      )}
      {isInteractionDecisionVisible && npcInteraction && (
        <InteractionDecisionModal npc={npcInteraction} onClose={onClose} />
      )}

      <NPCDialog />
    </div>
  )
}

export default App

const useEventTriggers = () => {
  const [isInteractionDecisionVisible, setIsInteractionDecisionVisible] =
    useState(false)

  const [itemInteraction, setItemInteraction] = useState<ItemInteraction>()
  const [npcInteraction, setNPCInteraction] = useState<NPC>()

  EventBus.on("itemInteraction", (interaction: ItemInteraction) => {
    setItemInteraction(interaction)
    setIsInteractionDecisionVisible(true)
  })

  EventBus.on("npcInteraction", (interaction: NPC) => {
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
