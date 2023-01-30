import { FormEvent, useEffect, useState } from "react"
import { Date, DictionaryData, Operator, Search, SearchData, SearchPaginationDefault } from "../../../model/search/types"
import { SearchbarForm, SearchbarWrapper, SearchButton, SearchInput } from '../styles/searchbar.styles'
import { SearchBarSynonyms, SwitchWrapper, SynonymParagraph, SynonymsWrapper } from "../styles/searchbar.synonyms.styles"
import { SearchToolBar, SearchToolBarWrapper } from "../styles/searchbar.toolbar"
import { Calendar } from "./Calendar"
import { SelectButton } from "./SelectButton"
import { SwitchButton } from "./SwitchButton"

interface SearchbarProps {
    search: Search
    date: Date
    dictionaryData: DictionaryData| null
    lastTimestamp: number | null
    onRequestDataChange: (requestData: Partial<SearchData>) => void,
}

function Searchbar({ search, date, dictionaryData, lastTimestamp, onRequestDataChange }: SearchbarProps) {
    const [query, setQuery] = useState(search.phrase)
    const [useKeywords, setUseKeywords] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [operator, setOperator] = useState(search.operator)
    const [dateRange, setDateRange] = useState(date)
    const selectOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    useEffect(() => {
        dictionaryData && setUseKeywords(dictionaryData.useKeywords)
    }, [dictionaryData?.useKeywords])

    function hasSearchMultiplePhrases(searchQuery: string) {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
        return queryPhrases.length > 1
    }

    function handleSearchQueryChange(searchQuery: string) {
        setDisabled(!hasSearchMultiplePhrases(searchQuery))
        setQuery(searchQuery)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onRequestDataChange({
            search: {
                ...search, phrase: query.trim(), operator: operator
                , keywords: search.phrase.toLowerCase() !== query.trim().toLowerCase() ? true : useKeywords
            }
            , date: { ...dateRange }
            , pagination: SearchPaginationDefault
        })
    }

    function handleSearchOperatorChange(value: Operator) {
        setOperator(value)
    }

    function handleDateChange(date: Date) {
        console.log(date)
        setDateRange({ ...dateRange, ...date })
    }

    function handleUseKeywordsChange() {
        setUseKeywords(!useKeywords)
    }

    return (
        <SearchbarWrapper>
            <img style={{ height: '60px', 'marginBottom': '32px', 'marginTop': '16px' }} src='/img/bekaert-logo.svg' alt='PDS' />
            <SearchbarForm autoComplete="off" onSubmit={handleSubmit}>
                <SearchInput value={query} onChange={(e) => handleSearchQueryChange(e.target.value)} />
                <SearchToolBarWrapper>
                    <SearchToolBar>
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
            </SearchbarForm>

            <SearchBarSynonyms>
                {dictionaryData &&
                    <>
                        <SwitchWrapper>
                            <SwitchButton toggled={useKeywords} onChange={handleUseKeywordsChange} />
                        </SwitchWrapper>
                        {
                            <SynonymsWrapper>
                                <p>Searched also for:</p>
                                {dictionaryData.dictionary.synonyms.map((synonym, idx) => (
                                    <SynonymParagraph key={idx} use={useKeywords}>{synonym}</SynonymParagraph>
                                ))}
                            </SynonymsWrapper>
                        }
                    </>
                }
            </SearchBarSynonyms>

        </SearchbarWrapper>

    )
}

export default Searchbar