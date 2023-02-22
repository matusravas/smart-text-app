import { useState, useEffect, FormEvent, useCallback } from "react"
import { DateRange, Operator, SearchDataDefault, Source } from "../../model/search/types"
import { SearchbarFormProps } from "../../view/search/components/SearchbarForm"

export type FormChangeData = {
    dateRange?: DateRange
    index?: string
    operator?: Operator
    phrase?: string
}


function useSearchbarForm(props: SearchbarFormProps) {
    const [formData, setFormData] = useState(props.searchData)
    const [operatorVisible, setOperatorVisible] = useState(false)

    useEffect(() => {
        props.onSubmit(formData)
    }, [formData.source.index])

    useEffect(() => {
        setFormData({...props.searchData, keywords: props.keywords})
        props.dictionary && props.onSynonyms(true)
    }, [props.searchData, props.dictionary, props.keywords])

    useEffect(() => {
        setOperatorVisible(props.dictionary && props.keywords ? true : false)
    }, [props.keywords, props.dictionary])

    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    const selectSourceOptions = props.sources.map(it => {
        return { 'label': it.indexAlias, 'value': it.index }
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(formData)
        props.onSubmit(formData)
    }

    // function checkIfOperatorVisible(searchQuery: string | null) {
    //     // console.log(searchQuery)
    //     // console.log(props.searchData.search.phrase)
    //     // console.log(props.dictionary)
    //     // console.log(props.searchData.hasKeywords)
    //     return (!searchQuery && props.dictionary && props.searchData.keywords)
    //         || (searchQuery && searchQuery.split(' ').filter(q => q.length > 2).length > 1)
    //         ? true : false
    // }

    // function hasSearchMultiplePhrases(searchQuery: string) {
    //     const queryPhrases = searchQuery.split(' ').filter(q => q.length > 2)
    //     return queryPhrases.length > 1
    // }

    // function handleSearchQueryChange(searchQuery: string) {
    //     // setOperatorDisabled(!hasSearchMultiplePhrases(searchQuery))
    //     setOperatorVisible(searchQuery.split(' ').filter(q => q.length > 2).length > 1)
    //     // searchQuery !==props.onSynonyms()
    //     // setOperatorVisible(checkIfOperatorVisible(searchQuery))
    //     setFormData({...formData, search: { ...props.searchData.search, phrase: searchQuery } })
    // }

    const handleFormDataChange = useCallback((it: FormChangeData) => {
        it.dateRange && setFormData({ ...formData, dateRange: it.dateRange })
        it.index && setFormData({ ...SearchDataDefault, source: { index: it.index, indexAlias: '' } })
        it.operator && setFormData({ ...formData, search: { ...props.searchData.search, operator: it.operator } })
        
        if (it.phrase !== undefined) {
            let keywords = props.keywords
            if (it.phrase !== props.searchData.search.phrase) { 
                props.onSynonyms(false)
                keywords = true
            }
            else props.onSynonyms(true)
            
            setOperatorVisible(
                (
                    (it.phrase === props.searchData.search.phrase && props.dictionary && props.keywords)
                    || it.phrase.split(' ').filter(q => q.length > 2).length > 1
                )
                ? true
                : false
            )
            setFormData({ ...formData, keywords, search: { ...props.searchData.search, phrase: it.phrase } })
        }
    }, [formData, props.searchData, props.keywords])

    // function handleSearchDataChange(newSearchData: Partial<SearchData>) {
    //     if(newSearchData.source?.index && newSearchData.source.index !== searchData.source.index) {
    //         props.submitSearchData({
    //             ...SearchDataDefault, ...newSearchData
    //         })
    //     }
    //     else {
    //         // newSearchData.search?.phrase && toggleSynonyms(newSearchData.search.phrase)
    //         if (newSearchData.search && newSearchData.search.phrase !== props.searchData.search.phrase) setSynonymsPanelVisible(false)
    //         else setSynonymsPanelVisible(true)
    //         setSearchData(prev => ({ ...prev, ...newSearchData }))
    //     }
    // }

    // function allowSubmit() {
    //     if (search.phrase.toLocaleLowerCase() !== query.trim().toLowerCase() ||
    //         search.operator !== operator || useKeywords !== dictionaryData?.useKeywords ||
    //         date.from !== dateRange.from || date.to !== dateRange.to) return true
    //     return false
    // }

    // function handleSearchOperatorChange(value: Operator) {
    //     props.onSearchDataChange({ search: { ...props.searchData.search, operator: value } })
    // }

    // function handleSourceChange(value: string) {
    //     props.onSearchDataChange({ ...SearchDataDefault, source: { index: value, indexAlias: props.searchData.source.indexAlias } })
    // }

    // function handleDateChange(dateRange: DateRange) {
    //     props.onSearchDataChange({ dateRange: dateRange })
    // }

    return {
        searchData: formData,
        operatorVisible,
        selectSourceOptions,
        selectOperatorOptions,
        // handleSearchQueryChange,
        handleFormDataChange,
        handleSubmit
        // handleSourceChange,
        // handleSearchOperatorChange,
        // handleDateChange
    }
}

export default useSearchbarForm