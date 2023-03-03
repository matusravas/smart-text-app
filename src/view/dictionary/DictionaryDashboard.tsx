import { useDictionaryViewModel } from "../../viewmodel/dictionary/DictionaryViewModel"
import { Snackbar } from "../app/components/Snackbar"
import { Card } from "./components/Card"
import { Dialog } from "./components/Dialog"
import SearchBar from "./components/SearchBar"
import { DictionaryCardsWrapper, DictionaryDashboardWrapper, FAB } from "./components/styles/dictionary.dashboard.styles"

function DictionaryDashboard() {
    const { dictionaries, dictionary, searchQuery, status,
        dialogOpen, actionType, toggleDialog, handleUpsertOrDelete,
        handleClick, handleSearchQueryChange, resetStatus } = useDictionaryViewModel()

    return (
        <DictionaryDashboardWrapper>
            <SearchBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />

            <DictionaryCardsWrapper>
                {dictionaries.map((item, idx) => (
                    <Card key={idx} value={item} searchQuery={searchQuery} onClick={() => handleClick('update', item)} />
                ))}
            </DictionaryCardsWrapper>

            {dialogOpen && actionType && <Dialog
                ationType={actionType}
                toggleOpen={toggleDialog}
                dictionary={dictionary}
                onUpsertOrDelete={handleUpsertOrDelete}
            />
            }
            <FAB onClick={() => handleClick('create')} />
            <Snackbar
                open={status.message ? true : false}
                type={status.type}
                text={status.message}
                onClose={resetStatus}
            />
        </DictionaryDashboardWrapper>
    )
}

export default DictionaryDashboard