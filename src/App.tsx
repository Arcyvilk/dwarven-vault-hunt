import { useRef, useState } from "react"
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame"
import { EventBus } from "./game/EventBus"
import { ItemInteraction } from "./game/scenes/ArcyScene/types"
import { InteractionDecisionModal, DebugSidebar } from "./components"
import { NPC } from "./game/npcs/NPC"

const App = () => {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  const [itemInteraction, setItemInteraction] = useState<ItemInteraction>()
  const [npcInteraction, setNPCInteraction] = useState<NPC>()
  const [isInteractionDecisionVisible, setIsInteractionDecisionVisible] =
    useState(false)

  const onClose = () => {
    setIsInteractionDecisionVisible(false)
  }

  EventBus.on("itemInteraction", (interaction: ItemInteraction) => {
    setItemInteraction(interaction)
    setIsInteractionDecisionVisible(true)
  })

  EventBus.on("npcInteraction", (interaction: NPC) => {
    setNPCInteraction(interaction)
    setIsInteractionDecisionVisible(true)
  })

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
    </div>
  )
}

export default App
