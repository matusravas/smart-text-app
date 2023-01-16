import { makeStyles } from "@material-ui/core"
import { FormEvent, useEffect, useState } from "react"
import { Date, Search, SearchData, SearchPaginationDefault } from "../../../model/search/types"
import { SearchBarWrapper, SearchButton, SearchInput, SearchToolBarWrapper } from '../styles/searchbar.styles'
import { Calendar } from "./Calendar"
import { SelectButton } from "./SelectButton"

interface SearchBarProps {
    search: Search,
    date: Date,
    lastTimestamp?: number,
    onRequestDataChange: (requestData: Partial<SearchData>) => void,
}

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: theme.typography.body1.fontSize,
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.palette.text.primary
    },
}));

const SearchBar = ({ search, onRequestDataChange, date, lastTimestamp }: SearchBarProps) => {
    const classes = useStyles();
    const [query, setQuery] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const [dateRange, setDateRange] = useState(date)
    const selectOptions = [{ label: 'Text', value: 'TEXT' }, { label: 'AND', value: 'AND' }, { label: 'OR', value: 'OR' }]

    useEffect(() => {
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
        if (dateRange.from > dateRange.to) {
            alert('Error')
            return
        }
        onRequestDataChange({
            search: { ...search, phrase: query, operator: operator }
            , date: { ...dateRange }
            , pagination: SearchPaginationDefault
        })
    }


    // const handleSearchOperatorChange = (value: Operator) => {
    //     // if (search.phrase && operator !== value) {
    //     //     setOperator(value)
    //     //     onRequestDataChange({ search: { ...search, operator: value }, pagination: SearchPaginationDefault })
    //     // }
    //     // else setOperator(value)
    //     setOperator(value)
    // }

    const handleDateChange = (date: Date) => {
        console.log(date)
        setDateRange({ ...dateRange, ...date })
    }

    return (
        <SearchBarWrapper autoComplete="off" onSubmit={handleSubmit}>
            <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            {lastTimestamp &&
                <SearchToolBarWrapper>
                    <Calendar
                        date={dateRange}
                        lastTimestamp={lastTimestamp}
                        onDateChanged={handleDateChange} />
                    <SelectButton
                        disabled={disabled}
                        label="Operator" options={selectOptions}
                        value={operator} onSelected={setOperator} />
                    <SearchButton />
                </SearchToolBarWrapper>
            }
        </SearchBarWrapper>
    )
}

export default SearchBar