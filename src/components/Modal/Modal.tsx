import { PropsWithChildren } from "react"
import styled from "styled-components"

type Props = PropsWithChildren & {
    isOpen: boolean
}
export const Modal = ({ children, isOpen }: Props) => {
    return (
        <StyledDialog open={isOpen}>
            { children }
        </StyledDialog>
    )
}

const StyledDialog = styled.dialog`
    border: 8px ridge #fdc000;
    border-radius: 6px;
    background-color: #000000;
    color: #ffffff;
`