import { SearchbarFormWrapper, SearchbarWrapper, SearchButton, SearchInput } from "../../search/styles/searchbar.styles"


interface SearchBarProps {
    searchQuery: string | null
    handleSearchQueryChange: (q: string) => void
}

const SearchBar = ({searchQuery, handleSearchQueryChange }: SearchBarProps) => {

    return (
        <SearchbarWrapper>
            <SearchbarFormWrapper autoComplete="off">
                <SearchInput value={searchQuery !== null ? searchQuery : ''} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            </SearchbarFormWrapper>
        </SearchbarWrapper>

    )
}

export default SearchBar