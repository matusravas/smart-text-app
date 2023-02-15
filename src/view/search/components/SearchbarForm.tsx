import { FormEvent, useState } from "react"
import { DateRange, IndexTimestamp, Operator, SearchData, SearchDataDefault } from "../../../model/search/types"
import { DateRangePicker } from "../../app/components/DatePicker/DateRangePicker"
import { SearchbarFormWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
// import { Calendar } from "./Calendar"
import { SelectButton } from "./SelectButton"

interface SearchbarFormProps {
    searchData: SearchData
    indicesWithTimestamps: IndexTimestamp[]
    onSearchDataChange: (requestData: Partial<SearchData>, submit?: boolean) => void
    onSubmit: () => void
}

function SearchbarForm({
    onSearchDataChange, onSubmit,
    searchData: { search, source, dateRange: date },
    indicesWithTimestamps
}: SearchbarFormProps) {
    const [disabled, setDisabled] = useState(true)
    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]
    const selectSourceOptions = indicesWithTimestamps.map(it => {
        return { 'label': it.indexAlias, 'value': it.index }
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit()
    }

    function hasSearchMultiplePhrases(searchQuery: string) {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
        return queryPhrases.length > 1
    }

    function handleSearchQueryChange(searchQuery: string) {
        setDisabled(!hasSearchMultiplePhrases(searchQuery))
        onSearchDataChange({ search: { ...search, phrase: searchQuery } })
    }

    // function allowSubmit() {
    //     if (search.phrase.toLocaleLowerCase() !== query.trim().toLowerCase() ||
    //         search.operator !== operator || useKeywords !== dictionaryData?.useKeywords ||
    //         date.from !== dateRange.from || date.to !== dateRange.to) return true
    //     return false
    // }

    function handleSearchOperatorChange(value: Operator) {
        onSearchDataChange({ search: { ...search, operator: value } })
    }
    
    function handleSourceChange(value: string) {
        onSearchDataChange({ ...SearchDataDefault, source: {index: value}}, true)
    }

    function handleDateChange(date: DateRange) {
        onSearchDataChange({ dateRange: date })
    }

    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput value={search.phrase} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            <SearchToolbar>
                {/* <Calendar
                    dateRange={date}
                    lastTimestamp={lastTimestamp}
                    onChange={handleDateChange}
                /> */}
                <DateRangePicker 
                    // title="Select date range"
                    // id="date"
                    selectedDateRange={date}
                    onChange={handleDateChange}
                />
                <SelectButton
                    label="Source" titleItem
                    options={selectSourceOptions}
                    value={source.index} onSelected={handleSourceChange} />
                <SelectButton
                    disabled={disabled} titleItem
                    label="Operator" options={selectOperatorOptions}
                    value={search.operator} onSelected={handleSearchOperatorChange} />
                <SearchButton />
            </SearchToolbar>
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm