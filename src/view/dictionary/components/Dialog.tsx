import { IconButton } from "@material-ui/core"
import Close from "@material-ui/icons/Close"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import { ChangeEvent, useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { ActionType, FormErrors, RequestType } from "../../../viewmodel/types/dictionary.types"
import { ConfirmDialog } from "../../app/components/ConfirmDialog"
import { ActionButton, ActionButtonsWrapper } from "../../app/components/styles/action.button.styles"
import { FormControlledInput, FormHeader, FormLabel, FormSubHeader } from "../../app/components/styles/form.styles"
import { DialogContent, DialogContentWrapper, DialogForm, DialogTopBar, DialogWrapper } from "./styles/dialog.styles"
import Synonyms from "./Synonyms"

interface DialogProps {
    type: ActionType,
    dictionary?: Dictionary,
    toggleOpen: () => void,
    onUpsertOrDelete: (requestType: RequestType, dictionary: Dictionary) => void
}

type ConfirmPrompt = {
    type?: 'cancel' | 'delete'
    headerText?: string
    text?: string
}

export function Dialog(props: DialogProps) {
    const dictionaryOriginal = props.dictionary !== undefined ?
        { ...props.dictionary } : { keyword: '', definition: '', synonyms: [] }
    const [dictionary, setDictionary] = useState(dictionaryOriginal)
    const [isChanged, setIsChanged] = useState(false)
    const [formErrors, setFormErrors] = useState<FormErrors>({ keyword: '', synonyms: '' })
    const [confirmation, setConfirmation] = useState<ConfirmPrompt>({})

    useEffect(() => {
        let key: keyof typeof dictionary;
        let changeFlag = false
        for (key in dictionary) {
            if (key !== 'synonyms') {
                if (dictionary[key] !== dictionaryOriginal[key]) {
                    changeFlag = true
                    setFormErrors({...formErrors, keyword: ''})
                }
            }
            if (!dictionary.synonyms.length) changeFlag = true
            else {
                for (let synonym of dictionary.synonyms) {
                    if (dictionaryOriginal.synonyms.indexOf(synonym) === -1) {
                        changeFlag = true
                        setFormErrors({...formErrors, synonyms: ''})
                    }
                }
            }
        }
        setIsChanged(changeFlag)

    }, [dictionary])

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
    }

    function handleSave() {
        if (!dictionary.keyword) {
            setFormErrors({ keyword: 'Keyword must be set...' })
            return
        }
        if (dictionary.synonyms.length === 0) {
            setFormErrors({ synonyms: 'At least one synonym must be set...' })
            return
        }
        props.onUpsertOrDelete('upsert', dictionary)
    }

    function handleDelete() {
        setConfirmation({type: 'delete',
            headerText: 'Delete confirmation',
            text: 'Are you sure you want to delete this item?'})
    }

    function tryDialogClose() {
        if (!isChanged) {
            props.toggleOpen()
            return
        }
        setConfirmation({type: 'cancel'})
    }

    function handleConfirmationDialog(){
        switch(confirmation.type) {
            case 'cancel': {
                props.toggleOpen(); break
            }
            case 'delete': {
                props.onUpsertOrDelete('delete', dictionary)
                break
            }
        }
    }

    return (
        <DialogWrapper>
            <DialogContentWrapper>
                <DialogTopBar>
                    <IconButton disabled={props.type === 'create'} onClick={handleDelete}>
                        <DeleteOutline />
                    </IconButton>
                    <IconButton onClick={tryDialogClose}>
                        <Close />
                    </IconButton>
                </DialogTopBar>
                <DialogContent>
                    <DialogForm autoComplete={"off"} editable={true}>
                        <FormControlledInput
                            error={formErrors.keyword ? true : false}
                            errorText={formErrors.keyword}
                            required={true}
                        >
                            <FormLabel>
                                Keyword:
                            </FormLabel>
                            <FormHeader
                                id="keyword"
                                className="header"
                                type="text"
                                disabled={props.type === 'update' ? true : false}
                                placeholder="Enter keyword"
                                value={dictionary.keyword}
                                onChange={(e) => handleDictionaryChange(e.target)}
                            />
                        </FormControlledInput>
                        <FormControlledInput>

                            <FormLabel>
                                Description:
                            </FormLabel>
                            <FormSubHeader
                                id="definition"
                                className="sub-header"
                                type="text"
                                placeholder="Enter simple definition (optional)..."
                                value={dictionary.definition}
                                onChange={(e) => handleDictionaryChange(e.target)}
                            />
                        </FormControlledInput>

                        {console.log(formErrors.synonyms ? true : false)}
                        <FormControlledInput
                            error={formErrors.synonyms ? true : false}
                            errorText={formErrors.synonyms}
                            required={true}
                        >
                            <FormLabel>
                                Synonyms*:
                            </FormLabel>
                            <Synonyms synonyms={dictionary.synonyms} onChange={handleSynonymsChange} />
                        </FormControlledInput>
                    </DialogForm>

                </DialogContent>

                <ActionButtonsWrapper>
                    <ActionButton
                        disabled={!isChanged}
                        backgroundColor={'#43a047'}
                        onClick={handleSave}>
                        Save
                    </ActionButton>
                </ActionButtonsWrapper>
            </DialogContentWrapper>

            {confirmation.type && 
                <ConfirmDialog
                    headerText={confirmation.headerText} 
                    text={confirmation.text} 
                    onConfirm={handleConfirmationDialog} 
                    onCancel={() => setConfirmation({})} />}
        </DialogWrapper>
    )
}