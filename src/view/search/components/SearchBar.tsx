import { FormEvent, useState } from "react"
import { Search, Date, SearchRequest, SearchPaginationDefault } from "../../../model/search/types"
import { StyledSearchBarWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'

interface SearchBarProps {
    search: Search,
    date: Date,
    onRequestDataChange: (requestData: Partial<SearchRequest>) => void,
}

const SearchBar = ({ search, onRequestDataChange}: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onRequestDataChange({search: {...search, phrase: query}, pagination: SearchPaginationDefault})
    }

    return (
        <StyledSearchBarWrapper onSubmit={handleSubmit}>
            {/* <div> */}

            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
            <SearchButton />
            {/* </div> */}
        </StyledSearchBarWrapper>
    )
}

export default SearchBar