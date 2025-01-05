import { useEffect } from "react"
import { mapOptions } from "../utils"
import { Action } from "../game/scenes/ArcyScene/types"
import { Item } from "../game/items"
import { NPC } from "../game/npcs"

export const useKeyboardNavigation = (
  entity: Item | NPC,
  onClose: () => void,
) => {
  const actions = entity?.actions
  const mappedActions = mapOptions(actions)

  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      mappedActions.forEach((a: Action<Item | NPC>) => {
        if (e.key === a.key) {
          e.preventDefault()
          a.fn(a, entity)
          onClose()
        }
      })
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [])

  return { actions: mappedActions }
}
