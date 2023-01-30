import { useState } from "react";
import { Switch, SwitchWrapper } from "../styles/switch.styles";

interface SwitchButtonProps {
    toggled: boolean
    onChange: () => void
}

export function SwitchButton(props: SwitchButtonProps) {
    return (
        <SwitchWrapper onClick={props.onChange}>
            <Switch toggle={props.toggled} />
        </SwitchWrapper>
    )
}