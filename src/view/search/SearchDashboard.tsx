import { useSearchViewModel } from "../../viewmodel/search/SearchViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/table";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const {
        status,
        searchData,
        dictionaryData,
        onSearchDataObtained,
        fetchSources,
        submitSearch,
        handleError,
        handleSuccess,
        resetStatus

    } = useSearchViewModel()
    return (
        <SearchDashboardWrapper>
            <Searchbar
                searchData={searchData}
                fetchSources={fetchSources}
                dictionaryData={dictionaryData}
                submitSearch={submitSearch}
            />
            {searchData.source.index ?
                <Table
                    searchData={searchData}
                    onSearchDataObtained={onSearchDataObtained}
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