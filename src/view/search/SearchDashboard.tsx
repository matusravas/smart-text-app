import { useSearchViewModel } from "../../viewmodel/search/SearchViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/Table";
import { MenuButtonCheckbox } from "./components/MenuCheckboxButton";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const {
        status
        ,searchData
        ,uids
        ,dictionaryData
        ,onSearchDataObtained
        ,fetchSources
        ,fetchSourceFiles
        // ,handleSourcesFileObtained
        ,onSourcesObtained
        // ,handleSourceFileChecked
        ,handleSubmitSourceFiles
        ,submitSearch
        ,handleError
        ,handleSuccess
        ,resetStatus
    } = useSearchViewModel()

    return (
        <SearchDashboardWrapper>
            <Searchbar
                searchData={searchData}
                fetchSources={fetchSources}
                onSourcesObtained={onSourcesObtained}
                dictionaryData={dictionaryData}
                submitSearch={submitSearch}
            />
            {searchData.source.index ?
                <Table
                    searchData={searchData}
                    uids={uids}
                    onSearchDataObtained={onSearchDataObtained}
                    submitSearch={submitSearch}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
                    topbar={() => (
                        <MenuButtonCheckbox
                            dynamic
                            titleItem
                            label="Select files"
                            title="file"
                            buttonStyles={{ minWidth: '60px', height: '40px', fontWeight: '300', backgroundColor: '#f7f7f7' }}
                            value={'xyz'}
                            optionsFetcher={fetchSourceFiles}

                            // onOptionsFetched={handleSourcesFileObtained}
                            // onChecked={handleSourceFileChecked}
                            forcedIndices={[0]}
                            onSubmit={handleSubmitSourceFiles}
                        />
                    )}
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