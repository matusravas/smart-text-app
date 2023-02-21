import { SearchData, SourceOption } from "../../../model/search/types"
import useSearchbarForm from "../../../viewmodel/search/SearchbarFormViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton, SearchInputIconWrapper, SearchInputWrapper } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { MenuButton } from "./MenuButton"
import { SearchInput } from "./SearchInput"

export interface SearchbarFormProps {
    searchData: SearchData
    // operatorDisabled: boolean
    sources: SourceOption[]
    onSearchDataChange: (requestData: Partial<SearchData>) => void
    onSubmit: () => void
}

function SearchbarForm(props: SearchbarFormProps) {
    const {
        searchData,
        operatorDisabled,
        selectSourceOptions,
        selectOperatorOptions,
        handleSubmit,
        handleSearchQueryChange,
        handleDateChange,
        handleSourceChange,
        handleSearchOperatorChange } = useSearchbarForm(props)
    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput
                value={searchData.search.phrase}
                onChange={handleSearchQueryChange}
                endAdornment={(styles) =>
                    <MenuButton
                        visible={operatorDisabled}
                        titleItem
                        title="Operator"
                        buttonStyles={{
                            ...styles, height: '50px',
                            minWidth: '60px', fontWeight: '300',
                        }}
                        value={searchData.search.operator}
                        options={selectOperatorOptions}
                        onSelected={handleSearchOperatorChange} />}

            />
            {props.sources.length > 0 ?
                <SearchToolbar>
                    <MenuButton
                        titleItem
                        title="Source"
                        buttonStyles={{ minWidth: '125px', backgroundColor: '#f7f7f7' }}
                        value={searchData.source.indexAlias}
                        options={selectSourceOptions}
                        onSelected={handleSourceChange} />

                    <DateRangePicker
                        selectedDateRange={searchData.dateRange}
                        onChange={handleDateChange}
                        onSubmit={(e, dateRange) => {
                            handleSubmit(e)
                        }}
                    />

                    <SearchButton />
                </SearchToolbar> : null}
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm