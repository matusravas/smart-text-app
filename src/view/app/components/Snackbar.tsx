import { useEffect, useState } from "react";
import { SnackbarText, SnackbarWrapper } from "./styles/snackbar.styles";

function SnackbarContent(props: any) {
    return <div style={{ height: '60px', background: '#398a20' }}>
        This is a success message!
    </div>;
}

interface SnackbarProps {
    text: string
    open: boolean
    type?: 'info' | 'success' | 'error'
    position?: 'bottom'
    timeout?: number
}
export function Snackbar(props: SnackbarProps) {
    const [open, setOpen] = useState(props.open)
    useEffect(() => {
        props.timeout && setTimeout(() => {
            setOpen(false)
        }, props.timeout)
    }, [props.open, props.timeout, open])

    return (
        <SnackbarWrapper open={open} position={props.position} type={props.type? props.type: 'info'}>
            <SnackbarText>{props.text}</SnackbarText>
        </SnackbarWrapper>
    )
}