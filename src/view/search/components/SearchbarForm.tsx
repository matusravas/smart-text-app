import { FormEvent, useState } from "react"
import { Date, Operator, SearchData } from "../../../model/search/types"
import { SearchbarFormWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { Calendar } from "./Calendar"
import { SelectButton } from "./SelectButton"

interface SearchbarFormProps {
    searchData: SearchData
    onSearchDataChange: (requestData: Partial<SearchData>) => void
    onSubmit: () => void
}

function SearchbarForm({ 
        onSearchDataChange, onSubmit, 
        searchData: { search, date, lastTimestamp } 
    }: SearchbarFormProps) {
    const [disabled, setDisabled] = useState(true)
    const selectOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

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

    function handleDateChange(date: Date) {
        onSearchDataChange({ date })
    }

    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput value={search.phrase} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            <SearchToolbar>
                <Calendar
                    dateRange={date}
                    lastTimestamp={lastTimestamp}
                    onChange={handleDateChange}
                />
                <SelectButton
                    disabled={disabled}
                    label="Operator" options={selectOptions}
                    value={search.operator} onSelected={handleSearchOperatorChange} />
                <SearchButton />
            </SearchToolbar>
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm