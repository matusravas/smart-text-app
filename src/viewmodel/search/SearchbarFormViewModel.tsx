import { FormEvent, useCallback, useEffect, useState } from "react"
import { DateRange, Operator, SearchData } from "../../model/search/types"
import { TablePaginationDefault } from "../../model/table/types"
import { SearchbarFormProps } from "../../view/search/components/SearchbarForm"

export type FormChangeData = {
    dateRange?: DateRange
    source?: {index: string, alias: string}
    operator?: Operator
    phrase?: string
}

function useFormData(searchData: SearchData) {
    const [data, setData] = useState(searchData)

    function setFormData(...it: Partial<SearchData>[]) {
        setData({ ...data, ...Object.assign({}, ...it) })
    }

    return { formData: data, setFormData }
}

function useSearchbarForm(props: SearchbarFormProps) {
    const { formData, setFormData } = useFormData(props.searchData)
    const [operatorVisible, setOperatorVisible] = useState(false)

    const selectOperatorOptions = [
        { label: 'OR', value: 'OR' }
        , { label: 'AND', value: 'AND' }
    ]

    useEffect(() => {
        formData.source.index && props.onSubmit(formData)
    }, [formData.source.index])

    useEffect(() => {
        setFormData({
            ...props.searchData, keywords: props.keywords
            , searchOperator: props.keywords !== formData.keywords ? 'OR' : formData.searchOperator
        })
        setOperatorVisible(
            searchPhraseLongEnough(props.searchData.searchPhrase)
                || (props.dictionary && props.keywords) ? true : false)
        props.dictionary && props.onSynonyms(true)
    }, [props.searchData, props.dictionary, props.keywords])


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(formData)
        props.onSubmit(formData)
    }
    function searchPhraseLongEnough(phrase: string) {
        return phrase.split(' ').filter(q => q.length > 2).length > 1
    }

    const handleFormDataChange = useCallback((it: FormChangeData) => {
        it.dateRange && setFormData({ dateRange: it.dateRange })
        if (it.source) {
            setFormData({ source: {index: it.source.index, indexAlias: it.source.alias}, pagination: TablePaginationDefault })
        }
        it.operator && setFormData({ searchOperator: it.operator })

        if (it.phrase !== undefined) {
            let keywords = props.keywords
            if (it.phrase !== props.searchData.searchPhrase) {
                props.onSynonyms(false)
                keywords = true
            }
            else props.onSynonyms(true)

            setOperatorVisible(
                (
                    (it.phrase === props.searchData.searchPhrase && props.dictionary && props.keywords)
                    || searchPhraseLongEnough(it.phrase)
                )
                    ? true
                    : false
            )
            setFormData({ keywords, searchPhrase: it.phrase })
        }
    }, [formData, props.searchData.searchPhrase, props.searchData.searchOperator, props.keywords])

    return {
        searchData: formData,
        operatorVisible,
        selectOperatorOptions,
        handleFormDataChange,
        handleSubmit
    }
}

export default useSearchbarForm