import { FormEvent, useCallback, useEffect, useState } from "react"
import { Dictionary } from "../../model/dictionary/types"
import { DateRange, Operator, SearchData, SearchDataDefault } from "../../model/search/types"
import { MenuOption } from "../../view/search/components/MenuButton"
import SearchRepository from "../../repository/search/SearchRepository"
import { DashboardFail } from "../../model/types"

export type FormDataOptions = {
    dateRange?: DateRange
    source?: { index: string, alias: string }
    operator?: Operator
    phrase?: string
}

export interface SearchbarViewModelProps {
    searchData: SearchData
    dictionaryData: Dictionary | null
    submitSearch: (searchData: SearchData, reset?: boolean) => void
    onError?: (err: string) => void
}

function useFormData(searchData: SearchData) {
    const [data, setData] = useState(searchData)

    function setFormData(...it: Partial<SearchData>[]) {
        setData({
            ...data
            , pagination: { currentPage: 0, pageSize: data.pagination.pageSize }
            , ...Object.assign({}, ...it)
        })
    }

    return { formData: data, setFormData }
}

function useSearchbarViewModel(props: SearchbarViewModelProps) {
    const [synonymsVisible, setSynonymsVisible] = useState(false)
    const { formData, setFormData } = useFormData(props.searchData)
    const [sourceIndex, setSourceIndex] = useState(formData.source.index)
    const [operatorVisible, setOperatorVisible] = useState(false)
    const searchRepository = SearchRepository.getInstance()

    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    useEffect(() => {
        sourceIndex && searchRepository.source(sourceIndex)
            .then(it => {
                if (!it.success) {
                    props.onError && props.onError(it.message)
                    return
                }
                it.data.index && setFormData({
                    source: it.data
                    , pagination: { currentPage: 0, pageSize: formData.pagination.pageSize }
                })
            })
            .catch((err: DashboardFail) => {
                props.onError && props.onError(err.message)
            })
    }, [sourceIndex])

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


    function fetchSources(_event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<MenuOption[]>((resolve, reject) => {
            searchRepository
                .sourcesWithTimestamps()
                .then((it) => {
                    if (!it.success) {
                        return reject('No available sources')
                    }
                    resolve(it.data.map(it => {
                        return { label: it.alias, value: it.index, subValue: it.uids[0] }
                    }))
                })
                .catch((err) => {
                    return reject('No available sources')
                });
        })
    }

    function onSourcesObtained(options: MenuOption[]) {
        const filtered = options.filter(it => it.value === formData.source.index)
        if (filtered.length === 1) return // if currently selected source is in options
        // Todo need state sources with uids HERE to return uids for fallback source
        if (!options.length) {
            setFormData(SearchDataDefault)
            return
        }
        setSourceIndex(options[0].value)
    }

    function handleKeywordsChange(isKeywords: boolean) {
        setFormData({ keywords: isKeywords })
        searchPhraseLongEnough(formData.searchPhrase) || (isKeywords && props.dictionaryData) ? setOperatorVisible(true) : setOperatorVisible(false)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.submitSearch(formData)
    }

    function handleReset() {
        props.submitSearch({ ...SearchDataDefault, source: props.searchData.source }, true)
    }

    function searchPhraseLongEnough(phrase: string) {
        return phrase.split(' ').filter(q => q.length > 2).length > 1
    }

    const handleFormDataChange = useCallback((it: FormDataOptions) => {
        it.dateRange && setFormData({ dateRange: it.dateRange })
        if (it.source) {
            setSourceIndex(it.source.index)
            // setFormData({ source: { index: it.source.index, alias: it.source.alias, uids: [it.source.latestUID] } })
        }
        it.operator && setFormData({ searchOperator: it.operator })

        if (it.phrase !== undefined) {
            let keywords = formData.keywords

            if (it.phrase !== props.searchData.searchPhrase) {
                setSynonymsVisible(false)
                keywords = true
            }
            else setSynonymsVisible(true)

            setOperatorVisible(
                (
                    (it.phrase === props.searchData.searchPhrase && props.dictionaryData && formData.keywords)
                    || searchPhraseLongEnough(it.phrase)
                )
                    ? true
                    : false
            )
            setFormData({ keywords, searchPhrase: it.phrase })
        }
    }, [formData, props.searchData.searchPhrase, props.searchData.searchOperator])

    return {
        searchData: formData,
        operatorVisible,
        selectOperatorOptions,
        synonymsVisible,
        onSourcesObtained,
        fetchSources,
        handleKeywordsChange,
        handleFormDataChange,
        handleSubmit,
        handleReset
    }
}

export default useSearchbarViewModel