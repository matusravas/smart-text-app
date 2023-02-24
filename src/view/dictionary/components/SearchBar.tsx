import { SearchInput } from "../../search/components/SearchInput"

interface SearchBarProps {
    searchQuery: string | null
    handleSearchQueryChange: (q: string) => void
}

const SearchBar = ({ searchQuery, handleSearchQueryChange }: SearchBarProps) => {

    return (
        <SearchInput
            style={{ width: '40%' }}
            value={searchQuery !== null ? searchQuery : ''}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
        />
    )
}

export default SearchBar