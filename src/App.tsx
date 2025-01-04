import { useRef, useState } from "react"
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame"
import { EventBus } from "./game/EventBus"
import { Interaction } from "./game/scenes/ArcyScene/types"
import { InteractionDecisionModal, DebugSidebar } from "./components"

const App = () => {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null)

  const [interaction, setInteraction] = useState<Interaction>()
  const [isInteractionDecisionVisible, setIsInteractionDecisionVisible] =
    useState(false)

  EventBus.on("newInteraction", (newInteraction: Interaction) => {
    setInteraction(newInteraction)
    setIsInteractionDecisionVisible(true)
  })

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
      <DebugSidebar />
      {interaction && (
        <InteractionDecisionModal
          isOpen={isInteractionDecisionVisible}
          interaction={interaction}
          onClose={() => {
            setIsInteractionDecisionVisible(false)
          }}
        />
      )}
    </div>
  )
}

export default App
