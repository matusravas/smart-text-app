import { SearchBarForm, SearchBarWrapper, SearchButton, SearchInput } from "../../search/styles/searchbar.styles"


interface SearchBarProps {
    searchQuery: string | null
    handleSearchQueryChange: (q: string) => void
}

const SearchBar = ({searchQuery, handleSearchQueryChange }: SearchBarProps) => {

    return (
        <SearchBarWrapper id="searchBar">
            <SearchBarForm id="searchForm" autoComplete="off">
                <SearchInput value={searchQuery !== null ? searchQuery : ''} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            </SearchBarForm>

        </SearchBarWrapper>

    )
}

export default SearchBar