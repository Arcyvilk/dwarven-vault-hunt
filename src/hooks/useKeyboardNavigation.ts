import { useEffect } from "react"
import { mapOptions } from "../utils"
import { Action } from "../game/scenes/ArcyScene/types"

export const useKeyboardNavigation = (
  actions: Action[],
  onClose: () => void,
) => {
  const mappedActions = mapOptions(actions)

  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      mappedActions.forEach((a: Action) => {
        if (e.key === a.key) {
          e.preventDefault()
          a.fn(a)
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
