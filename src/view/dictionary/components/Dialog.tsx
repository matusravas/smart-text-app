import { forwardRef } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { DialogWrapper, DialogContent, ActionButtonsWrapper, ActionButton } from "./styles/dialog.style"

type DialogProps = {
    // isOpen: boolean,
    dictionary: Dictionary
}

function DialogWithRef({ dictionary }: DialogProps, ref: any) {
    return (
        <DialogWrapper>
            <DialogContent ref={ref}>
                <h2>{dictionary.keyword}</h2>
                <h4>{dictionary.definition}</h4>
                <p>{['aaajsajb', 'nsdnsjd', 'jdnsjndjs', 'jdnjsdnsnd', 'nsjdnsdnj'].join(' • ')}</p>
                <ActionButtonsWrapper>
                    {/* <ActionButton>Edit</ActionButton> */}
                    <ActionButton>Edit</ActionButton>
                </ActionButtonsWrapper>
            </DialogContent>
        </DialogWrapper>
    )
}

export const Dialog = forwardRef(DialogWithRef)