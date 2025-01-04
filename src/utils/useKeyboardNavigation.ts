import { useEffect } from "react"

type Action = {
  key: string
  fn: () => void
}
export const useKeyboardNavigation = (actions: Action[]) => {
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
}
