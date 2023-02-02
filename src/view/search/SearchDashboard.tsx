import { useSearchViewModel } from "../../viewmodel/SearchViewModel";
import { Table } from "../table/Table";
import Searchbar from "./components/Searchbar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const { 
        searchData, 
        dictionaryData, 
        onDictionaryObtained, 
        handleSearchDataChange, 
        } = useSearchViewModel()
    return (
        <SearchDashboardWrapper>
            <Searchbar 
                searchData={searchData}
                dictionaryData={dictionaryData}
                onSearchDataChange={handleSearchDataChange}
                 />
            {searchData.lastTimestamp ? 
                <Table 
                    searchData={searchData}
                    onDictionary={onDictionaryObtained}
                    onSearchDataChange={handleSearchDataChange}
                 />
                 : null
            }
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard