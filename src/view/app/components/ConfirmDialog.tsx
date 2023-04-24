import { ActionButton, ActionButtonsWrapper } from "./styles/action-button.styles";
import { DialogContent, DialogContentWrapper, DialogHeader, DialogText, DialogWrapper } from "./styles/confirm-dialog.styles";


interface ConfirmDialogProps {
    visible?: boolean
    headerText?: string,
    text?: string,
    // onConfirm: (callback: () => void) => void,
    onConfirm?: () => void,
    onCancel?: () => void
}

export function ConfirmDialog({ headerText, text, ...props }: ConfirmDialogProps) {
    
    function onConfirmClicked() {
        props.onConfirm && props.onConfirm()
        props.onCancel && props.onCancel()
    }
    
    return (
        <DialogWrapper style={{...(props.visible !== true && {display: 'none'})}}>
            <DialogContentWrapper>
                <DialogContent >
                    <DialogHeader>
                        {headerText ? headerText : 'Confirmation'}
                    </DialogHeader>
                    <DialogText>
                        {text ? text : 'Would you like the cancel the unsaved process?'}
                    </DialogText>
                    <ActionButtonsWrapper>
                        <ActionButton backgroundColor={'#de4848'} onClick={onConfirmClicked}>Yes</ActionButton>
                        <ActionButton onClick={props.onCancel}>No</ActionButton>
                    </ActionButtonsWrapper>
                </DialogContent>
            </DialogContentWrapper>
        </DialogWrapper>
    )
}