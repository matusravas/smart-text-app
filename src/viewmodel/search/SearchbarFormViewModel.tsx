import { FormEvent, useCallback, useEffect, useState } from "react"
import { DateRange, Operator, SearchDataDefault } from "../../model/search/types"
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
        setFormData({...props.searchData, 
            keywords: props.keywords, 
            // ...(props.keywords && {search: {...formData.search, operator: 'OR'}})
        })
        props.dictionary && props.onSynonyms(true)
    }, [props.searchData, props.dictionary, props.keywords])

    useEffect(() => {
        setOperatorVisible(props.dictionary && props.keywords ? true : false)
        setFormData({...formData, search: {...formData.search, operator: 'OR'}})
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

    const handleFormDataChange = useCallback((it: FormChangeData) => {
        it.dateRange && setFormData({ ...formData, dateRange: it.dateRange })
        it.index && setFormData({ ...formData, source: { index: it.index, indexAlias: '' } })
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
    }, [formData, props.searchData.search, props.keywords])

    return {
        searchData: formData,
        operatorVisible,
        selectSourceOptions,
        selectOperatorOptions,
        handleFormDataChange,
        handleSubmit
    }
}

export default useSearchbarForm