import { FormEvent, useState } from "react"
import { Search, Date, SearchRequest } from "../../../model/search/types"
import { StyledSearchBarWrapper, SearchButton, SearchInput, Icon } from '../styles/SearchBar'

interface SearchBarProps {
    search: Search,
    date: Date,
    onRequestDataChange: (requestData: Partial<SearchRequest>) => void,
}

const SearchBar = ({ search, onRequestDataChange}: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onRequestDataChange({search: {...search, phrase: query}})
    }

    return (
        <StyledSearchBarWrapper onSubmit={handleSubmit}>
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
            <SearchButton />
        </StyledSearchBarWrapper>
    )
}

export default SearchBar