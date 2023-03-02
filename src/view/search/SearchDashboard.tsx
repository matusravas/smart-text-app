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
        // lastTimestamp,
        dictionaryData,
        // onSourceObtained,
        onDictionaryObtained,
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
                dictionaryData={dictionaryData}
                submitSearch={submitSearch}
            />
            {sources.length > 0 ?
                <Table
                    searchData={searchData}
                    // lastTimestamp={lastTimestamp}
                    onDictionary={onDictionaryObtained}
                    // onSource={onSourceObtained}
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