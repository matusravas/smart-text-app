import { FormEvent, useEffect, useState } from "react"
import { Dictionary } from "../../../model/dictionary/types"
import { Date, Operator, Search, SearchData, SearchPaginationDefault } from "../../../model/search/types"
import { SearchBarSynonyms, SearchBarForm, SearchButton, SearchInput, SearchToolBar, SearchToolBarWrapper, SearchBarWrapper } from '../styles/searchbar.styles'
import { Calendar, DatePicker } from "./Calendar"
import { SelectButton } from "./SelectButton"

interface SearchBarProps {
    search: Search,
    date: Date,
    dictionary: Dictionary | null
    lastTimestamp: number | null,
    onRequestDataChange: (requestData: Partial<SearchData>) => void,
}

const SearchBar = ({ search, onRequestDataChange, date, dictionary, lastTimestamp }: SearchBarProps) => {
    const [query, setQuery] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const [dateRange, setDateRange] = useState(date)
    const selectOptions = [
        { label: 'Text', value: 'TEXT' } 
        ,{ label: 'AND', value: 'AND' } 
        ,{ label: 'OR', value: 'OR' }]

    // useEffect(() => {
    //     setDateRange(date)
    // }, [lastTimestamp])

    const hasSearchMultiplePhrases = (searchQuery: string) => {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
        return queryPhrases.length > 1
    }

    const handleSearchQueryChange = (searchQuery: string) => {
        setDisabled(!hasSearchMultiplePhrases(searchQuery))
        setQuery(searchQuery)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onRequestDataChange({
            search: { ...search, phrase: query, operator: operator }
            , date: { ...dateRange }
            , pagination: SearchPaginationDefault
        })
    }


    const handleSearchOperatorChange = (value: Operator) => {
        // if (search.phrase && operator !== value) {
        //     setOperator(value)
        //     onRequestDataChange({ search: { ...search, operator: value }, pagination: SearchPaginationDefault })
        // }
        // else setOperator(value)
        setOperator(value)
    }

    const handleDateChange = (date: Date) => {
        console.log(date)
        setDateRange({ ...dateRange, ...date })
    }

    return (
        <SearchBarWrapper id="searchBar">
            <SearchBarForm id="searchForm" autoComplete="off" onSubmit={handleSubmit}>
                <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
                <SearchToolBarWrapper id="searchToolBarWrapper">
                    <SearchToolBar id="searchToolBar">
                        <Calendar
                            dateRange={dateRange}
                            lastTimestamp={lastTimestamp}
                            onChange={handleDateChange}
                        />
                        <SelectButton
                            disabled={disabled}
                            label="Operator" options={selectOptions}
                            value={operator} onSelected={handleSearchOperatorChange} />
                    </SearchToolBar>

                    <SearchButton />
                </SearchToolBarWrapper>
            </SearchBarForm>

            <SearchBarSynonyms id="synonyms">
                {dictionary && <p>Searched also for: <b>{dictionary.synonyms.join(' • ')}</b></p>}
            </SearchBarSynonyms>

        </SearchBarWrapper>

    )
}

export default SearchBar