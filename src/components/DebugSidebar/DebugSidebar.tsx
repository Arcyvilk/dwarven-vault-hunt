import { useState } from "react"
import { EventBus } from "../../game/EventBus"
import { Interaction } from "../../game/scenes/ArcyScene/types"
import { InteractionDecisionModal } from ".."

export const DebugSidebar = () => {
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 })

  EventBus.on("obstacleFound", (x: number, y: number) => {
    setItemPosition({ x, y })
  })

  return (
    <div>
      <div className="spritePosition">
        <span>Obstacle position:</span>
        <pre>{`{\n  x: ${itemPosition.x}\n  y: ${itemPosition.y}\n}`}</pre>
      </div>
    </div>
  )
}
