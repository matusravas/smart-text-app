import { useSearchViewModel } from "../../viewmodel/SearchViewModel";
import { Table } from "../table/Table";
import SearchBar from "./components/SearchBar";

import { SearchDashboardWrapper } from "./styles/searchbar.styles";

const SearchDashboard = () => {
    const { requestData, setLastTimestamp, handleRequestDataChange } = useSearchViewModel()
    const { search, date } = requestData
    return (
        <SearchDashboardWrapper>
            <SearchBar search={search} date={date} onRequestDataChange={handleRequestDataChange} />
            <Table requestData={requestData} 
                onLastTimestampObtained={setLastTimestamp}
                onRequestDataChange={handleRequestDataChange} />
        </SearchDashboardWrapper>
    )
}

export default SearchDashboard