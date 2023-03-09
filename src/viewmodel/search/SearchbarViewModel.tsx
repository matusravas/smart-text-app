import { FormEvent, useCallback, useEffect, useState } from "react"
import { Dictionary } from "../../model/dictionary/types"
import { DateRange, Operator, SearchData, SearchDataDefault } from "../../model/search/types"
import { TablePaginationDefault } from "../../model/table/types"
import { MenuOption } from "../../view/search/components/MenuButton"

export type FormChangeData = {
    dateRange?: DateRange
    source?: { index: string, alias: string }
    operator?: Operator
    phrase?: string
}

export interface SearchbarViewModelProps {
    searchData: SearchData
    dictionaryData: Dictionary | null
    fetchSources: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
    submitSearch: (searchData: SearchData) => void
}

function useFormData(searchData: SearchData) {
    const [data, setData] = useState(searchData)

    function setFormData(...it: Partial<SearchData>[]) {
        setData({ ...data, pagination: TablePaginationDefault, ...Object.assign({}, ...it) })
    }

    return { formData: data, setFormData }
}

function useSearchbarViewModel(props: SearchbarViewModelProps) {
    const [synonymsVisible, setSynonymsVisible] = useState(false)
    const { formData, setFormData } = useFormData(props.searchData)
    const [operatorVisible, setOperatorVisible] = useState(false)

    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    useEffect(() => {
        formData.source.index && props.submitSearch(formData)
    }, [formData.source.index])

    useEffect(() => {
        setFormData({
            ...props.searchData
            // , searchOperator: props.searchData.keywords !== formData.keywords ? 'OR' : formData.searchOperator
        })
        setOperatorVisible(
            searchPhraseLongEnough(props.searchData.searchPhrase)
                ||
                (props.dictionaryData && props.searchData.keywords) ? true : false)

        props.dictionaryData && setSynonymsVisible(true)
    }, [props.searchData, props.dictionaryData])


    function handleKeywordsChange(isKeywords: boolean) {
        setFormData({ keywords: isKeywords })
        searchPhraseLongEnough(formData.searchPhrase) || (isKeywords && props.dictionaryData) ? setOperatorVisible(true) : setOperatorVisible(false)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.submitSearch(formData)
    }

    function handleReset() {
        props.submitSearch({ ...SearchDataDefault, source: props.searchData.source })
    }

    function searchPhraseLongEnough(phrase: string) {
        return phrase.split(' ').filter(q => q.length > 2).length > 1
    }

    const handleFormDataChange = useCallback((it: FormChangeData) => {
        it.dateRange && setFormData({ dateRange: it.dateRange })
        if (it.source) {
            setFormData({ source: { index: it.source.index, indexAlias: it.source.alias } })
        }
        it.operator && setFormData({ searchOperator: it.operator })

        if (it.phrase !== undefined) {
            const searchPhrase = it.phrase.trim()
            let keywords = formData.keywords
            let pagination = { ...props.searchData.pagination }
            
            if (!searchPhrase.includes(props.searchData.searchPhrase)) {
                setSynonymsVisible(false)
                keywords = true
                pagination = { ...TablePaginationDefault }
            }
            else setSynonymsVisible(true)

            setOperatorVisible(
                (
                    (searchPhrase.includes(props.searchData.searchPhrase) && props.dictionaryData && formData.keywords)
                    || searchPhraseLongEnough(searchPhrase)
                )
                    ? true
                    : false
            )
            setFormData({ keywords, searchPhrase: searchPhrase, pagination })
        }
    }, [formData, props.searchData.searchPhrase, props.searchData.searchOperator])

    return {
        searchData: formData,
        operatorVisible,
        selectOperatorOptions,
        synonymsVisible,
        fetchSources: props.fetchSources,
        handleKeywordsChange,
        handleFormDataChange,
        handleSubmit,
        handleReset
    }
}

export default useSearchbarViewModel