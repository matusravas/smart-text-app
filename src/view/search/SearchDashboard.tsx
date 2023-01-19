import { useSearchViewModel } from "../../viewmodel/SearchViewModel";
import { Table } from "../table/Table";
import SearchBar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const { requestData, dictionary, handleDictionary, handleRequestDataChange } = useSearchViewModel()
    const {search, date, lastTimestamp} = requestData
    return (
        <SearchDashboardWrapper>
            <SearchBar 
                search={search} date={date}
                dictionary={dictionary}
                lastTimestamp={lastTimestamp} 
                onRequestDataChange={handleRequestDataChange} />
            {lastTimestamp && <Table 
                requestData={requestData}
                onDictionary={handleDictionary}
                onRequestDataChange={handleRequestDataChange} />
            }
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard