import { useEffect, useState } from 'react'
import { Dictionary, Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [saved, setSaved] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dictionary, setDictionary] = useState<Dictionary>()
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([])
    const [dictionariesFiltered, setDictionariesFiltered] = useState<Dictionary[]>(dictionaries)
    
    useEffect(() => {
        repository.getSynonyms()
            .then(res => {
                const dicts = res as DictionaryResult[]
                setDictionaries(dicts)
                setDictionariesFiltered(dicts)
            })
            .catch(err => {
                console.error(err)
            })
    }, [saved])

    function handleSearchQueryChange(query: string) {
        query = query.length > 1? query : query.trim()
        const queryLower = query.toLowerCase()
        if (searchQuery.toLowerCase() === queryLower) return
        if (queryLower === '') {
            setSearchQuery(query)
            setDictionariesFiltered([...dictionaries])
            return
        }

        const filteredDictionaries = dictionaries.filter(dict => {
            if (dict.keyword.toLowerCase().includes(queryLower) ||
                    dict.definition.toLowerCase().includes(queryLower)) return dict
            for (let synonym of dict.synonyms) {
                if (synonym.toLowerCase().includes(queryLower)) return dict
            }
        })
        setSearchQuery(query)
        setDictionariesFiltered(filteredDictionaries)

    }

    function handleClick(dict?: Dictionary) {
        setDictionary(dict)
        setDialogOpen(true)
        setSaved(false)
    }
    
    function handleSave(dict: Dictionary) {
        repository.upsert(dict)
            .then(res=>{
                setSaved(true)
            })
            .catch(err=>{
                console.error(err)
            })
            .finally(()=>{
                setDialogOpen(false)
            })
    }
    
    function toggleDialog() {
        setDialogOpen(!dialogOpen)
    }

    return {
        dictionaries: dictionariesFiltered,
        dictionary,
        searchQuery,
        dialogOpen,
        toggleDialog,
        handleSearchQueryChange,
        handleClick,
        handleSave
    }
}