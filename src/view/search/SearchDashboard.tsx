import { useSearchViewModel } from "../../viewmodel/SearchViewModel"
import { Table } from "../table/table"
import SearchBar from "./components/SearchBar"

const Search = () => {
    const { requestData, handleRequestDataChange } = useSearchViewModel()
    const {search, date} = requestData
    console.log(requestData)
    return (
        // <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexDirection': 'column'}}>
        <div style={{'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column'}}>
            <SearchBar search={search} date={date} onRequestDataChange={handleRequestDataChange}/>
            <Table requestData={requestData} onRequestDataChange={handleRequestDataChange}/>
        </div>
    )
}

export default Search