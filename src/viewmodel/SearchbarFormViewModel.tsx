import { useState, useEffect, FormEvent } from "react"
import { DateRange, Operator, SearchDataDefault } from "../model/search/types"
import { SearchbarFormProps } from "../view/search/components/SearchbarForm"


function useSearchbarForm(props: SearchbarFormProps) {
    const [operatorDisabled, setOperatorDisabled] = useState(props.operatorDisabled)
    
    useEffect(() => {
        setOperatorDisabled(props.operatorDisabled)
    }, [props.operatorDisabled])

    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]
    const selectSourceOptions = props.sources.map(it => {
        return { 'label': it.indexAlias, 'value': it.index }
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.onSubmit()
    }

    function hasSearchMultiplePhrases(searchQuery: string) {
        const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
        return queryPhrases.length > 1
    }

    function handleSearchQueryChange(searchQuery: string) {
        setOperatorDisabled(!hasSearchMultiplePhrases(searchQuery))
        props.onSearchDataChange({ search: { ...props.searchData.search, phrase: searchQuery } })
    }

    // function allowSubmit() {
    //     if (search.phrase.toLocaleLowerCase() !== query.trim().toLowerCase() ||
    //         search.operator !== operator || useKeywords !== dictionaryData?.useKeywords ||
    //         date.from !== dateRange.from || date.to !== dateRange.to) return true
    //     return false
    // }

    function handleSearchOperatorChange(value: Operator) {
        props.onSearchDataChange({ search: { ...props.searchData.search, operator: value } })
    }

    function handleSourceChange(value: string) {
        props.onSearchDataChange({ ...SearchDataDefault, source: { index: value, indexAlias: props.searchData.source.indexAlias } })
    }

    function handleDateChange(dateRange: DateRange) {
        props.onSearchDataChange({ dateRange: dateRange })
    }

    return {
        searchData: props.searchData,
        operatorDisabled,
        selectSourceOptions,
        selectOperatorOptions,
        handleSearchQueryChange,
        handleSubmit,
        handleSourceChange,
        handleSearchOperatorChange,
        handleDateChange
    }
}

export default useSearchbarForm