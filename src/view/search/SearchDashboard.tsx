import { useSearchViewModel } from "../../viewmodel/search/SearchViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/table";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const {
        status,
        searchData,
        sources,
        dictionaryData,
        onDictionaryObtained,
        onSources,
        submitSearch,
        handleError,
        handleSuccess,
        resetStatus

    } = useSearchViewModel()
    return (
        <SearchDashboardWrapper>
            <Searchbar
                searchData={searchData}
                sources={sources}
                onSources={onSources}
                dictionaryData={dictionaryData}
                submitSearch={submitSearch}
                handleError={handleError}
                handleSuccess={handleSuccess}
            />
            {sources.length > 0 ?
                <Table
                    searchData={searchData}
                    onDictionary={onDictionaryObtained}
                    submitSearch={submitSearch}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
                />
                : null
            }
            <Snackbar
                open={status.message ? true : false}
                type={status.type}
                text={status.message}
                onClose={resetStatus}
            />
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard