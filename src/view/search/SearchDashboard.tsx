import { useSearchViewModel } from "../../viewmodel/SearchViewModel";
import { Table } from "../table/Table";
import Searchbar from "./components/Searchbar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const { 
        searchData, 
        indicesTimestamps,
        dictionaryData, 
        onSourceObtained,
        onDictionaryObtained, 
        handleSearchDataChange, 
        } = useSearchViewModel()
    console.log(searchData)
    return (
        <SearchDashboardWrapper>
            <Searchbar 
                searchData={searchData}
                indicesWithTimestamps={indicesTimestamps}
                dictionaryData={dictionaryData}
                onSearchDataChange={handleSearchDataChange}
                 />
            {indicesTimestamps.length > 0 ? // Todo this is null and exclude it from searchData
                <Table 
                    searchData={searchData}
                    onDictionary={onDictionaryObtained}
                    onSource={onSourceObtained}
                    onSearchDataChange={handleSearchDataChange}
                 />
                 : null
            }
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard