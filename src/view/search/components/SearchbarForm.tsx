import { SourceOption, SearchData } from "../../../model/search/types"
import useSearchbarForm from "../../../viewmodel/SearchbarFormViewModel"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { SelectButton } from "./SelectButton"

export interface SearchbarFormProps {
    searchData: SearchData
    operatorDisabled: boolean
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
            <SearchInput value={searchData.search.phrase} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            <SearchToolbar>
                <SelectButton
                    label="Source" titleItem
                    options={selectSourceOptions}
                    value={searchData.source.index} onSelected={handleSourceChange} />

                <DateRangePicker
                    // title="Select date range"
                    // id="date"
                    selectedDateRange={searchData.dateRange}
                    onChange={handleDateChange}
                />
                
                <SelectButton
                    disabled={operatorDisabled} titleItem
                    label="Operator" options={selectOperatorOptions}
                    value={searchData.search.operator} onSelected={handleSearchOperatorChange} />
                <SearchButton />
            </SearchToolbar>
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm