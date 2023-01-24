import { useEffect, useState } from "react";
import { StatusTypes } from "../../../model/types";
import { SnackbarText, SnackbarWrapper } from "./styles/snackbar.styles";

interface SnackbarProps {
    text: string
    open: boolean
    type?: StatusTypes
    position?: 'bottom'
    autoCloseAfter?: number
    onClose?: () => void
}

export function Snackbar(props: SnackbarProps) {
    const [open, setOpen] = useState(props.open)

    useEffect(() => {
        setOpen(props.open)
        return () => {
            props.autoCloseAfter && setTimeout(() => {
                setOpen(false)
                // props.onClose && props.onClose()
            }, props.autoCloseAfter)
        }
    }, [props.open])

    return (
        <SnackbarWrapper open={open} position={props.position} type={props.type ? props.type : 'info'}>
            <SnackbarText>{props.text}</SnackbarText>
        </SnackbarWrapper>
    )
}