import { FormEvent, useCallback, useEffect, useState } from "react"
import { DateRange, Operator, SearchData } from "../../model/search/types"
import { SearchbarFormProps } from "../../view/search/components/SearchbarForm"

export type FormChangeData = {
    dateRange?: DateRange
    index?: string
    operator?: Operator
    phrase?: string
}

function useFormData(searchData: SearchData) {
    const [data, setData] = useState(searchData)

    function setFormData(...it: Partial<SearchData>[]) {
        setData({...data, ...Object.assign({}, ...it) })
        // setData({...data, ...it})
    }
    
    return {formData: data, setFormData}
}

function useSearchbarForm(props: SearchbarFormProps) {
    const {formData, setFormData} = useFormData(props.searchData)
    const [operatorVisible, setOperatorVisible] = useState(false)

    useEffect(() => {
        props.onSubmit(formData)
    }, [formData.source.index])

    useEffect(() => {
        setFormData({...props.searchData, keywords: props.keywords 
            ,searchOperator: props.keywords !== formData.keywords ? 'OR' : formData.searchOperator
        })
        setOperatorVisible(props.dictionary && props.keywords ? true : false)
        props.dictionary && props.onSynonyms(true)
    }, [props.searchData, props.dictionary, props.keywords])

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
        it.dateRange && setFormData({dateRange: it.dateRange })
        it.index && setFormData({ source: { index: it.index, indexAlias: '' } })
        it.operator && setFormData({ searchOperator: it.operator } )
        
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
                    || it.phrase.split(' ').filter(q => q.length > 2).length > 1
                )
                ? true
                : false
            )
            setFormData({ keywords, searchPhrase: it.phrase } )
        }
    }, [formData, props.searchData.searchPhrase, props.searchData.searchOperator, props.keywords])

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