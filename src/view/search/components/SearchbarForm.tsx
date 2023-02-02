import { FormEvent, useEffect, useState } from "react"
import { Date, Operator, Search, SearchData, SearchPaginationDefault } from "../../../model/search/types"
import { SearchbarFormWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'
import { SearchToolbar } from "../styles/searchbar.toolbar.styles"
import { Calendar } from "./Calendar"
import { SelectButton } from "./SelectButton"

interface SearchbarFormProps {
    search: Search
    isKeywords: boolean
    date: Date
    lastTimestamp: number | null
    onRequestDataChange: (requestData: Partial<SearchData>) => void,
}

function SearchbarForm({ search, date, isKeywords: useKeywords, lastTimestamp, onRequestDataChange }: SearchbarFormProps) {
    const [query, setQuery] = useState(search.phrase)
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const [dateRange, setDateRange] = useState(date)
    const selectOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    useEffect(() => {
        setQuery(search.phrase)
    }, [search.phrase])

    function hasSearchMultiplePhrases(searchQuery: string) {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
        return queryPhrases.length > 1
    }

    function handleSearchQueryChange(searchQuery: string) {
        setDisabled(!hasSearchMultiplePhrases(searchQuery))
        setQuery(searchQuery)
    }

    // function allowSubmit() {
    //     if (search.phrase.toLocaleLowerCase() !== query.trim().toLowerCase() ||
    //         search.operator !== operator || useKeywords !== dictionaryData?.useKeywords ||
    //         date.from !== dateRange.from || date.to !== dateRange.to) return true
    //     return false
    // }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // if (!allowSubmit()) return
        onRequestDataChange({
            search: {
                ...search, phrase: query.trim(), operator: operator
                , isKeywords: search.phrase.toLowerCase() !== query.trim().toLowerCase() ? true : useKeywords
            }
            , date: { ...dateRange }
            , pagination: SearchPaginationDefault
        })
    }

    function handleSearchOperatorChange(value: Operator) {
        setOperator(value)
    }

    function handleDateChange(date: Date) {
        setDateRange({ ...dateRange, ...date })
    }

    return (
        <SearchbarFormWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            {/* <SearchToolbarWrapper> */}
                <SearchToolbar>
                    <Calendar
                        dateRange={dateRange}
                        lastTimestamp={lastTimestamp}
                        onChange={handleDateChange}
                    />
                    <SelectButton
                        disabled={disabled}
                        label="Operator" options={selectOptions}
                        value={operator} onSelected={handleSearchOperatorChange} />
                <SearchButton />
                </SearchToolbar>
            {/* </SearchToolbarWrapper> */}
        </SearchbarFormWrapper>
    )
}

export default SearchbarForm