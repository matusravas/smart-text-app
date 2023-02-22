import { useSearchViewModel } from "../../viewmodel/search/SearchViewModel";
import { Table } from "../table/table";
import Searchbar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const { 
        searchData, 
        sources,
        lastTimestamp,
        dictionaryData, 
        onSourceObtained,
        onDictionaryObtained, 
        submitSearchData, 
        } = useSearchViewModel()
    return (
        <SearchDashboardWrapper>
            <Searchbar 
                searchData={searchData}
                sources={sources}
                dictionaryData={dictionaryData}
                submitSearchData={submitSearchData}
                 />
            {sources.length > 0 ?
                <Table 
                    searchData={searchData}
                    lastTimestamp={lastTimestamp}
                    onDictionary={onDictionaryObtained}
                    onSource={onSourceObtained}
                    submitSearchData={submitSearchData}
                    />
                 : null
            }
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard