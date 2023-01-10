import { useSearchViewModel } from "../../viewmodel/SearchViewModel"
import { Table } from "../table/table"
import SearchBar from "./components/SearchBar"

const Search = () => {
    const { responseData, requestData, handleRequestDataChange } = useSearchViewModel()
    const {search, date} = requestData
    return (
        <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexDirection': 'column'}}>
            <SearchBar search={search} date={date} onRequestDataChange={handleRequestDataChange}/>
            <Table requestData={requestData} />
        </div>
    )
}

export default Search