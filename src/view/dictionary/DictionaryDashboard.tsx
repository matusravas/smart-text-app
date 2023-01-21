import { createRef, useEffect } from "react"
import { useDictionaryViewModel } from "../../viewmodel/DictionaryViewModel"
import { Card } from "./components/Card"
import { Dialog } from "./components/Dialog"
import SearchBar from "./components/SearchBar"
import { DictionaryWrapper, FAB } from "./components/styles/dictionary.dashboard.styles"

function DictionaryDashboard() {
    const { dictionaries, dictionary, searchQuery,
        dialogOpen, toggleDialog, handleSave,
        handleClick, handleSearchQueryChange } = useDictionaryViewModel()
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!dialogOpen) return
        function handleClickOutsideDialog(event: MouseEvent) {
            // console.log(ref)
            // console.log(event.target)
            if (ref.current && ref.current === event.target as Node) {
                // setDialogOpen(false)
                toggleDialog()
            }
        }
        document.body.style.overflow = 'hidden'
        document.addEventListener('mousedown', handleClickOutsideDialog)
        return () => {
            document.body.style.overflow = 'auto'
            document.removeEventListener('mousedown', handleClickOutsideDialog)
        }
    }, [dialogOpen])

    return (
        <DictionaryWrapper size={dictionaries.length}>
            <SearchBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
            {dictionaries.map((item, idx) => (
                <Card key={idx} value={item} onClick={() => handleClick(item)} />
            ))}
            
            {dialogOpen && <Dialog 
                ref={ref} 
                // isOpen={dialogOpen} 
                dictionary={dictionary} 
                handleSave={handleSave}
                // handleDictionaryChange={handleDictionaryChange}
                 />
            }
            
            <FAB onClick={()=>handleClick()}/>
        </DictionaryWrapper>
    )
}

export default DictionaryDashboard