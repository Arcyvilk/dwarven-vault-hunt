import { useState } from "react"
import { EventBus, EventEmit } from "../../game/events"
import { useQueryParams } from "../../hooks"

export const DebugSidebar = () => {
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 })
  const debug = useQueryParams("debug")
  const isDebug = debug === "true"

  EventBus.on(EventEmit.OBSTACLE_FOUND, (x: number, y: number) => {
    setItemPosition({ x, y })
  })

  if (!isDebug) return null
  return (
    <div>
      <div className="spritePosition">
        <span>Obstacle position:</span>
        <pre>{`{\n  x: ${itemPosition.x}\n  y: ${itemPosition.y}\n}`}</pre>
      </div>
    </div>
  )
}
