import { useEffect } from "react"
import { mapOptions } from "../utils"

export const useKeyboardNavigation = <T extends { fn: () => void }>(
  rawActions: T[],
) => {
  const actions = mapOptions(rawActions)

  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      actions.forEach((a) => {
        if (e.key === a.key) {
          e.preventDefault()
          a.fn()
        }
      })
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [])

  return { actions }
}
