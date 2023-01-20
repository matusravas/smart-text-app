import { useEffect, useState } from 'react'
import { Dictionary, Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dictionary, setDictionary] = useState<Dictionary>()
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([])
    const [dictionariesFiltered, setDictionariesFiltered] = useState<Dictionary[]>(dictionaries)

    useEffect(() => {
        repository.getSynonyms()
            .then(res => {
                const val = res as DictionaryResult[]
                let dicts = [] as DictionaryResult[]
                for (let i = 0; i < 50; i++) {
                    dicts.push(val[0])
                }
                setDictionaries(dicts)
                setDictionariesFiltered(dicts)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function handleSearchQueryChange(query: string) {
        const queryLower = query.toLowerCase()
        if (query === '') {
            setSearchQuery(query)
            setDictionariesFiltered([...dictionaries])
            return
        }

        const filteredDictionaries = dictionaries.filter(dict => {
            if (dict.keyword.toLowerCase().includes(queryLower)) return dict
            for (let synonym of dict.synonyms) {
                if (synonym.toLowerCase().includes(queryLower)) return dict
            }
        })
        setSearchQuery(query)
        setDictionariesFiltered(filteredDictionaries)

    }

    function handleDictionarySelect(dict?: Dictionary) {
        setDictionary(dict)
    }
    
    function handleDictionaryChange(target: any) {
        setDictionary({...dictionary as Dictionary, [target.id]: target.value})
    }

    return {
        dictionaries: dictionariesFiltered,
        dictionary,
        searchQuery,
        handleSearchQueryChange,
        handleDictionarySelect,
        handleDictionaryChange
    }
}