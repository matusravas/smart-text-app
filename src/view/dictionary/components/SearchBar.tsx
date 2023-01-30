import { SearchbarForm, SearchbarWrapper, SearchButton, SearchInput } from "../../search/styles/searchbar.styles"


interface SearchBarProps {
    searchQuery: string | null
    handleSearchQueryChange: (q: string) => void
}

const SearchBar = ({searchQuery, handleSearchQueryChange }: SearchBarProps) => {

    return (
        <SearchbarWrapper>
            <SearchbarForm autoComplete="off">
                <SearchInput value={searchQuery !== null ? searchQuery : ''} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            </SearchbarForm>
        </SearchbarWrapper>

    )
}

export default SearchBar