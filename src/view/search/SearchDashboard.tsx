import { useSearchViewModel } from "../../viewmodel/SearchViewModel";
import { Table } from "../table/Table";
import Searchbar from "./components/Searchbar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

function SearchDashboard() {
    const { requestData, dictionaryData, onDictionaryObtained, handleRequestDataChange } = useSearchViewModel()
    const {search, date, lastTimestamp} = requestData
    return (
        <SearchDashboardWrapper>
            <Searchbar 
                search={search} date={date}
                dictionaryData={dictionaryData}
                lastTimestamp={lastTimestamp} 
                onRequestDataChange={handleRequestDataChange} />
            {lastTimestamp && <Table 
                requestData={requestData}
                onDictionary={onDictionaryObtained}
                onRequestDataChange={handleRequestDataChange} />
            }
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard