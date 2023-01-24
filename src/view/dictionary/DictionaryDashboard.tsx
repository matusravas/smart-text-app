import { Snackbar } from "@material-ui/core"
import { useDictionaryViewModel } from "../../viewmodel/DictionaryViewModel"
import { Card } from "./components/Card"
import { Dialog } from "./components/Dialog"
import SearchBar from "./components/SearchBar"
import { DictionaryWrapper, FAB } from "./components/styles/dictionary.dashboard.styles"

function DictionaryDashboard() {
    const { dictionaries, dictionary, searchQuery, message,
        dialogOpen, actionType, toggleDialog, handleUpsertOrDelete,
        handleClick, handleSearchQueryChange } = useDictionaryViewModel()

    return (
        <DictionaryWrapper size={dictionaries.length}>
            <SearchBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
            {dictionaries.map((item, idx) => (
                <Card key={idx} value={item} searchQuery={searchQuery} onClick={() => handleClick('update', item)} />
            ))}

            {dialogOpen && actionType && <Dialog
                ationType={actionType}
                toggleOpen={toggleDialog}
                dictionary={dictionary}
                onUpsertOrDelete={handleUpsertOrDelete}
            />
            }
            <FAB onClick={() => handleClick('create')} />
            <Snackbar open={message !== undefined} message={message}/>
        </DictionaryWrapper>
    )
}

export default DictionaryDashboard