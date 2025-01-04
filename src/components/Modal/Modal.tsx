import { PropsWithChildren, useEffect } from "react"
import styled from "styled-components"

type Props = PropsWithChildren & { isOpen: boolean; onClose: () => void }
export const Modal = ({ children, isOpen, onClose }: Props) => {
  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      console.log(e.key)
      if (isOpen && e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [])

  return <StyledDialog open={isOpen}>{children}</StyledDialog>
}

const StyledDialog = styled.dialog`
  border: 8px ridge #fdc000;
  border-radius: 6px;
  background-color: #000000;
  color: #ffffff;
`
