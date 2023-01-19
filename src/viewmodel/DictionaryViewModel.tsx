import { useEffect, useState } from 'react'
import { Dictionary, Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    // const [keyword, setKeyword] = useState<string>()
    const [dictionary, setDictionary] = useState<Dictionary>()
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([])

    useEffect(() => {
        repository.getSynonyms()
            .then(res=>{
                const val = res as DictionaryResult[]
                let dicts = [] as DictionaryResult[]
                for(let i=0; i< 50; i++){
                    dicts.push(val[0])
                }
                setDictionaries(dicts)
            })
            .catch(err=>{
                console.error(err)
            })
    }, [])

    function handleDictionaryChange(dict?: Dictionary) {
        setDictionary(dict)
    }

    return {
        dictionaries,
        dictionary,
        handleDictionaryChange
    }
}