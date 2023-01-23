import { ChangeEvent, forwardRef, useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { DialogType } from "../../../viewmodel/types/dictionary.types"
import { ConfirmDialog } from "../../app/components/ConfirmDialog"
import { ActionButtonsWrapper, ActionButton } from "../../app/components/styles/action.button.styles"
import {
    DialogContent, DialogContentWrapper, ControlledInput, DialogForm, DialogHeader,
    DialogLabel, DialogSubHeader, DialogWrapper
} from "./styles/dialog.styles"
import Synonyms from "./Synonyms"

interface DialogProps {
    // isOpen: boolean,
    type: DialogType,
    dictionary?: Dictionary,
    toggleOpen: () => void,
    handleSave: (dictionary: Dictionary) => void
    // handleDictionaryChange: (target: any) => void
}

type FormErrors = {
    keyword?: string,
    synonyms?: string
}



// function DialogWithRef({ handleSave, toggleOpen, ...props }: DialogProps, ref: any) {
export function Dialog({ handleSave, toggleOpen, ...props }: DialogProps) {
    const dictionaryOriginal = props.dictionary !== undefined ?
        { ...props.dictionary } : { keyword: '', definition: '', synonyms: [] }
    const [dictionary, setDictionary] = useState(dictionaryOriginal)
    const [isChanged, setIsChanged] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [mustConfirm, setMustConfirm] = useState(false)

    useEffect(() => {
        checkIfValuesChanged()
    }, [dictionary])


    function checkIfValuesChanged() {
        let key: keyof typeof dictionary;
        for (key in dictionary) {
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
        if (!dictionary.keyword) {
            setFormErrors({ keyword: 'Keyword must be set...' })
            return
        }
        if (dictionary.synonyms.length === 0) {
            console.log('error synonyms')
            setFormErrors({synonyms: 'At least one synonym must be set...' })
            return
        }
        setFormErrors({})
        handleSave(dictionary)
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
                <DialogContent>
                    <DialogForm autoComplete={"off"} editable={true}>
                        <ControlledInput
                            error={formErrors?.keyword ? true : false}
                            errorText={formErrors?.keyword}
                            disabled={props.type === 'update'? true : false}
                        >
                            <DialogLabel>
                                Keyword:
                            </DialogLabel>
                            <DialogHeader
                                id="keyword"
                                className="header"
                                type="text"
                                placeholder="Enter keyword"
                                value={dictionary.keyword}
                                onChange={(e) => handleDictionaryChange(e.target)}
                            />
                        </ControlledInput>
                        <ControlledInput>

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
                        </ControlledInput>

                        {/* <Divider /> */}
                        <ControlledInput
                            error={formErrors?.synonyms ? true : false}
                            errorText={formErrors?.synonyms}
                        >

                            <DialogLabel>
                                Synonyms:
                            </DialogLabel>
                            <Synonyms synonyms={dictionary.synonyms} onChange={handleSynonymsChange} />
                        </ControlledInput>
                    </DialogForm>

                </DialogContent>

                <ActionButtonsWrapper>
                    <ActionButton
                        disabled={!isChanged}
                        backgroundColor={'#43a047'}
                        // onClick={() => handleSave(dictionary)}>
                        onClick={validateForm}>
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