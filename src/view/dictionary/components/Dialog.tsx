import { ChangeEvent, forwardRef, useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { ConfirmDialog } from "./ConfirmDialog"
import {
    ActionButton, ActionButtonsWrapper,
    DialogContent, DialogContentWrapper, DialogForm, DialogHeader,
    DialogLabel, DialogSubHeader, DialogWrapper
} from "./styles/dialog.styles"
import Synonyms from "./Synonyms"

type DialogProps = {
    // isOpen: boolean,
    dictionary?: Dictionary,
    toggleOpen: () => void,
    handleSave: (dictionary: Dictionary) => void
    // handleDictionaryChange: (target: any) => void
}

// function DialogWithRef({ handleSave, toggleOpen, ...props }: DialogProps, ref: any) {
export function Dialog({ handleSave, toggleOpen, ...props }: DialogProps) {
    const dictionaryOriginal = props.dictionary !== undefined ?
        { ...props.dictionary } : { keyword: '', definition: '', synonyms: [] }
    const [dictionary, setDictionary] = useState(dictionaryOriginal)
    const [isChanged, setIsChanged] = useState(false)
    const [mustConfirm, setMustConfirm] = useState(false)

    useEffect(() => {
        checkIfValuesChanged()
    }, [dictionary])


    function checkIfValuesChanged() {
        let key: keyof typeof dictionary;
        for (key in dictionary) {
            console.log(key)
            if (key !== 'synonyms') {
                if (dictionary[key] !== dictionaryOriginal[key]) {
                    setIsChanged(true)
                    return
                }
            }
            console.log(dictionary.synonyms)
            for (let synonym of dictionary.synonyms) {
                if (dictionaryOriginal.synonyms.indexOf(synonym) === -1) {
                    setIsChanged(true)
                    return
                }
            }
        }
        setIsChanged(false)
    }

    function handleDictionaryChange(target: any) {
        setDictionary({ ...dictionary as Dictionary, [target.id]: target.value })
    }

    const handleSynonymsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const existingItem = index <= dictionary.synonyms.length - 1
        let synonyms = [...dictionary.synonyms]
        if (existingItem && e.target.value === '') {
            synonyms.splice(index, 1)
        }
        else {
            if (existingItem) {
                synonyms[index] = e.target.value
            }
            else {

                synonyms.push(e.target.value)
            }
        }
        setDictionary({ ...dictionary, synonyms: [...synonyms] })
    };

    function validateForm() {

    }

    function closeDialog() {
        if (!isChanged) {
            toggleOpen()
            return
        }
        setMustConfirm(true)
    }

    return (
        <DialogWrapper>
            <DialogContentWrapper>

                {/* <DialogCancelButton>
                    <IconButton>
                        <Cancel />
                    </IconButton>
                </DialogCancelButton> */}
                <DialogContent>
                    <DialogForm autoComplete={"off"} editable={true}>
                        <DialogLabel>
                            Keyword:
                        </DialogLabel>

                        <DialogHeader
                            id="keyword"
                            className="header"
                            type="text"
                            // autoFocus={editable}
                            placeholder="Enter keyword"
                            value={dictionary.keyword}
                            // onBlur={() => { }}
                            onChange={(e) => handleDictionaryChange(e.target)}
                        />

                        <DialogLabel>
                            Description:
                        </DialogLabel>
                        <DialogSubHeader
                            id="definition"
                            className="sub-header"
                            type="text"
                            placeholder="Enter simple definition (otional)..."
                            value={dictionary.definition}
                            onChange={(e) => handleDictionaryChange(e.target)}
                        />
                        {/* <Divider /> */}
                        <DialogLabel>
                            Synonyms:
                        </DialogLabel>
                        <Synonyms synonyms={dictionary.synonyms} onChange={handleSynonymsChange} />
                    </DialogForm>

                </DialogContent>

                <ActionButtonsWrapper>
                    <ActionButton
                        disabled={!isChanged}
                        backgroundColor={'#43a047'}
                        onClick={() => handleSave(dictionary)}>
                        Save
                    </ActionButton>

                    <ActionButton
                        onClick={closeDialog}>
                        Cancel
                    </ActionButton>
                </ActionButtonsWrapper>
            </DialogContentWrapper>

            {mustConfirm && <ConfirmDialog onConfirm={toggleOpen} onCancel={() => setMustConfirm(false)} />}
            
        </DialogWrapper>
    )
}

// export const Dialog = forwardRef(DialogWithRef)