import { useSearchViewModel } from "../../viewmodel/SearchViewModel"

const Search = () => {
    const { data, search, pagination, date, handleSearchChange } = useSearchViewModel()
    console.log(data)
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        handleSearchChange({phrase: 'dancer'})
    };

    
    return (
        <p>Hello world</p>
        // <form onSubmit={handleSubmit}>
        //     <label htmlFor="name">Name:</label>
        //     <input type="text" id="name" value={search.phrase??''} />
        //     <input type="submit" value="Submit" />
        // </form>
    )
}

export default Search