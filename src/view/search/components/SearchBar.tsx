import { FormEvent } from "react"
import { Search } from "../../../model/search/types"
import { useSearchBarViewModel } from "../../../viewmodel/SearchViewModel"
import { StyledSearchBarWrapper, SearchButton, SearchInput, Icon } from '../styles/SearchBar'

interface SearchBarProps {
    searchPhrase: string,
    onSearchChange: (search: Partial<Search>) => void,
}

const SearchBar = ({ searchPhrase, onSearchChange: onSearchChange }: SearchBarProps) => {
    const { query, handleChange } = useSearchBarViewModel(searchPhrase, onSearchChange)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSearchChange({ phrase: query })
    }

    return (
        <StyledSearchBarWrapper onSubmit={handleSubmit}>
            <SearchInput value={query} onChange={(e) => handleChange(e.target.value)} />
            <SearchButton />
        </StyledSearchBarWrapper>
    )
}

export default SearchBar