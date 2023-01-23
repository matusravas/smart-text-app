import { DialogContent, DialogContentWrapper, DialogHeader, DialogText, DialogWrapper } from "./styles/confirm.dialog.styles";
import { ActionButton, ActionButtonsWrapper } from "./styles/dialog.styles";

interface ConfirmDialogProps {
    onConfirm: () => void,
    onCancel: () => void
}

export function ConfirmDialog(props: ConfirmDialogProps) {
    return (
        <DialogWrapper >
            <DialogContentWrapper>
                <DialogContent >
                    <DialogHeader>Confirmation</DialogHeader>
                    <DialogText>Would you like the cancel the unsaved process?</DialogText>
                    <ActionButtonsWrapper>
                        <ActionButton backgroundColor={'#de4848'} onClick={props.onConfirm}>Yes</ActionButton>
                        <ActionButton onClick={props.onCancel}>No</ActionButton>
                    </ActionButtonsWrapper>
                </DialogContent>
            </DialogContentWrapper>
        </DialogWrapper>
    )
}