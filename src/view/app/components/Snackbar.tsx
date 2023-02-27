import { useEffect, useState } from "react";
import { StatusTypes } from "../../../model/types";
import { SnackbarText, SnackbarWrapper } from "./styles/snackbar.styles";

interface SnackbarProps {
    text: string
    open: boolean
    type?: StatusTypes
    position?: 'bottom'
    autoHideDuration?: number
    onClose?: () => void
}

export function Snackbar(props: SnackbarProps) {
    const [open, setOpen] = useState(props.open)

    useEffect(() => {
        if (props.open) {
            setOpen(props.open)
            setTimeout(() => {
                setOpen(false)
                props.onClose && props.onClose()
            }, props.autoHideDuration ? props.autoHideDuration : 5000)
        }
        // return () => {
        //     props.autoHideDuration && setTimeout(() => {
        //         setOpen(false)
        //         // props.onClose && props.onClose()
        //     }, props.autoHideDuration)
        // }
    }, [props.open])

    if (!open) {
        return null;
    }

    return (
        // <SnackbarWrapper open={open} position={props.position} type={props.type ? props.type : 'info'}>
        <SnackbarWrapper open={open} position={props.position} type={'info'}>
            <SnackbarText>{props.text}</SnackbarText>
        </SnackbarWrapper>
    )
}