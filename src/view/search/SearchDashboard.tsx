import { useSearchViewModel } from "../../viewmodel/search/SearchDashboardViewModel";
import { Snackbar } from "../app/components/Snackbar";
import { Table } from "../table/Table";
import { MenuButtonCheckbox } from "./components/MenuCheckboxButton";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const {
        status
        ,searchData
        ,dictionaryData
        ,onSearchDataObtained
        ,fetchSourceFiles
        ,submitSearch
        ,handleError
        ,handleSuccess
        ,resetStatus
    } = useSearchViewModel()

    return (
        <SearchDashboardWrapper>
            <Searchbar
                searchData={searchData}
                onError={handleError}
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
                    topbar={() => (
                        <MenuButtonCheckbox
                            dynamic
                            titleItem
                            label="Select files"
                            title="file"
                            buttonStyles={{ minWidth: '60px', height: '40px', fontWeight: '300', backgroundColor: '#f7f7f7' }}
                            optionsFetcher={fetchSourceFiles}
                            forcedIndices={[0]}
                            onSubmit={(options) => {
                                const checkedUIDs = options.filter(it => it.checked).map(it=>it.value)
                                submitSearch({source: {...searchData.source, uids: checkedUIDs}})
                            }}
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