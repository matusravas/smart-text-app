import { useSearchViewModel } from "../../viewmodel/SearchViewModel"
import SearchBar from "./components/SearchBar"

const Search = () => {
    const { data, search, pagination, date, handleSearchChange } = useSearchViewModel()
    data?.results.map((e)=>{console.log(e)})
    return (
        <div>
            <SearchBar searchPhrase={search.phrase} onSearchChange={handleSearchChange}/>
            <div>
                {data?.results.map(e=><p key={e['Hlásenie']}>{e.Kr_text}</p>)}
            </div>
        </div>
    )
}

export default Search