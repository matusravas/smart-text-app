import { FormEvent, useEffect, useState } from "react"
import { Date, Operator, Search, SearchPaginationDefault, SearchRequest } from "../../../model/search/types"
import { SearchBarWrapper, SearchButton, SearchInput, SearchToolBarWrapper } from '../styles/searchbar.styles'
import { Calendar } from "./Calendar"
import { SelectButton } from "./Dropdown"

interface SearchBarProps {
    search: Search,
    date: Date,
    lastTimestamp?: number,
    onRequestDataChange: (requestData: Partial<SearchRequest>) => void,
}

const SearchBar = ({ search, onRequestDataChange, date, lastTimestamp }: SearchBarProps) => {
    const [query, setQuery] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const [dateRange, setDateRange] = useState(date)
    const selectOptions = [{ label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }]

    useEffect(()=>{
        setDateRange(date)
    }, [lastTimestamp])

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
            , date: {...dateRange}
            , pagination: SearchPaginationDefault })
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
        setDateRange({...date, ...dateRange})
    }

    return (
        <SearchBarWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            {dateRange && lastTimestamp &&
                <SearchToolBarWrapper>
                    <Calendar 
                        date={dateRange} 
                        lastTimestamp={lastTimestamp} 
                        onDateChanged={handleDateChange} />
                    <SelectButton
                        disabled={disabled}
                        label="Operator" options={selectOptions}
                        value={operator} onSelected={handleSearchOperatorChange} />
                    <SearchButton />
                </SearchToolBarWrapper>
            }    
        </SearchBarWrapper>
    )
}

export default SearchBar