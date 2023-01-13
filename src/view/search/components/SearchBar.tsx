import moment from "moment"
import { FormEvent, useEffect, useState } from "react"
import { Search, Date as D, SearchRequest, SearchPaginationDefault, Operator, Date } from "../../../model/search/types"
import { Divider, SearchBarWrapper, SearchButton, SearchInput, SearchToolBarWrapper } from '../styles/searchbar.styles'
import { Calendar } from "./DatePicker"
import { SelectButton, SelectButtonOption } from "./Dropdown"

interface SearchBarProps {
    search: Search,
    date: D,
    onRequestDataChange: (requestData: Partial<SearchRequest>) => void,
}

const SearchBar = ({ search, onRequestDataChange, date }: SearchBarProps) => {
    console.log(date)
    const [query, setQuery] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const selectOptions = [{ label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }]


    const hasSearchMultiplePhrases = (searchQuery: string) => {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 1)
        return queryPhrases.length > 1
    }

    const handleSearchQueryChange = (searchQuery: string) => {
        setDisabled(!hasSearchMultiplePhrases(searchQuery))
        setQuery(searchQuery)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onRequestDataChange({ search: { ...search, phrase: query, operator: operator }, pagination: SearchPaginationDefault })
    }


    const handleSearchOperatorChange = (value: Operator) => {
        if (search.phrase && operator !== value) {
            setOperator(value)
            onRequestDataChange({ search: { ...search, operator: value }, pagination: SearchPaginationDefault })
        }
        else setOperator(value)
    }

    const handleDateChange = (date: Date) => {
        console.log(date)
        // onRequestDataChange({search: search, date: {...date}, pagination: SearchPaginationDefault })
    }

    return (
        <SearchBarWrapper autoComplete="off" onSubmit={handleSubmit}>
            {/* <div> */}

            <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            <SearchToolBarWrapper>

                <Calendar date={date} onDateChanged={handleDateChange}
                    />
                <SelectButton
                    disabled={disabled}
                    label="Select operator" options={selectOptions}
                    selected={operator} onSelected={handleSearchOperatorChange} />
            </SearchToolBarWrapper>
            <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'alignContent': 'space-between' }}>
                <SearchButton />
                {/* <SearchButton /> */}
            </div>
        </SearchBarWrapper>
    )
}

export default SearchBar