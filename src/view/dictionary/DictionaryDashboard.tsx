import { useState, useEffect, createRef } from "react"
import { Outlet } from "react-router-dom"
import { Dictionary } from "../../model/dictionary/types"
import { useDictionaryViewModel } from "../../viewmodel/DictionaryViewModel"
import { Card } from "./components/Card"
import { Dialog } from "./components/Dialog"
import { DictionaryWrapper } from "./components/styles/dictionary.dashbaord.styles"

function DictionaryDashboard() {
    const { dictionaries, dictionary, handleDictionaryChange } = useDictionaryViewModel()
    // const [dialogOpen, setDialogOpen] = useState(false)
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        if (!dictionary) return
        function handleClickOutsideDialog(event: MouseEvent) {
            console.log(ref)
            console.log(event.target)
            if (ref.current && ref.current !== event.target as Node) {
                // setDialogOpen(false)
                handleDictionaryChange()
            }
        }
        document.addEventListener('mousedown', handleClickOutsideDialog)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDialog)
        }
    }, [dictionary])



    function handleClick(item: Dictionary) {
        handleDictionaryChange(item)
        // setDialogOpen(true)
    }

    return (
        <DictionaryWrapper size={dictionaries.length}>
            {dictionaries.map((q, idx) => (
                <Card key={idx} value={q} onClick={() => handleClick(q)} />
            ))}
            {dictionary && <Dialog dictionary={dictionary} ref={ref} />}
        </DictionaryWrapper>
    )
}

export default DictionaryDashboard