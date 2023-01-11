import { useSearchViewModel } from "../../viewmodel/SearchViewModel"
import { Table } from "../table/table"
import SearchBar from "./components/SearchBar"
import { SearchDashboardWrapper } from "./styles/searchbar.styles"

const Search = () => {
    const { requestData, handleRequestDataChange } = useSearchViewModel()
    const {search, date} = requestData
    console.log(requestData)
    return (
        <SearchDashboardWrapper>
            <SearchBar search={search} date={date} onRequestDataChange={handleRequestDataChange}/>
            <Table requestData={requestData} onRequestDataChange={handleRequestDataChange}/>
        </SearchDashboardWrapper>
    )
}

export default Search