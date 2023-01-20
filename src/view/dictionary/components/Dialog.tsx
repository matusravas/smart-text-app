import { forwardRef, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { ActionButton, ActionButtonsWrapper, DialogContentWrapper, DialogForm, DialogHeader, DialogSubHeader, DialogWrapper, Divider } from "./styles/dialog.styles"
import Synonyms from "./Synonyms"

type DialogProps = {
    // isOpen: boolean,
    dictionary: Dictionary,
    handleDictionaryChange: (target: any) => void
}

function DialogWithRef({dictionary, handleDictionaryChange}: DialogProps, ref: any) {
    const [editable, setEditable] = useState(false)
    
    return (
        <DialogWrapper ref={ref}>
            {/* <DialogContentWrapper> */}

                {/* <DialogCancelButton>
                    <IconButton>
                        <Cancel />
                    </IconButton>
                </DialogCancelButton> */}
                <DialogContentWrapper>
                    <DialogForm autoComplete={"off"} editable={editable}>
                        <DialogHeader
                            id="keyword"
                            className="header"
                            type="text"
                            placeholder="Enter keyword"
                            value={dictionary.keyword}
                            // onBlur={() => { }}
                            onChange={(e) => handleDictionaryChange(e.target)}
                        />
                        <DialogSubHeader
                            id="definition"
                            className="sub-header"
                            type="text"
                            placeholder="Enter simple definition (otional)..."
                            value={dictionary.definition}
                            onChange={(e) => handleDictionaryChange(e.target)}
                        />
                        <Divider />
                        <Synonyms editable={editable} synonyms={dictionary.synonyms} />
                    </DialogForm>
                    <ActionButtonsWrapper>
                        <ActionButton onClick={() => setEditable(!editable)}>Edit</ActionButton>
                    </ActionButtonsWrapper>
                </DialogContentWrapper>
            {/* </DialogContentWrapper> */}
        </DialogWrapper>
    )
}

export const Dialog = forwardRef(DialogWithRef)