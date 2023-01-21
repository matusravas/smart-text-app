import { useEffect, useState } from 'react'
import { Dictionary, Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dictionary, setDictionary] = useState<Dictionary>()
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([])
    const [dictionariesFiltered, setDictionariesFiltered] = useState<Dictionary[]>(dictionaries)
    
    useEffect(() => {
        repository.getSynonyms()
            .then(res => {
                console.log(res)
                const dicts = res as DictionaryResult[]
                // const val = res as DictionaryResult[]
                // let dicts = [] as DictionaryResult[]
                // for (let i = 0; i < 50; i++) {
                //     dicts.push(val[0])
                // }
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

    function handleClick(dict?: Dictionary) {
        setDictionary(dict)
        setDialogOpen(true)
    }
    
    function handleSave(dict: Dictionary) {
        console.log(dict)
        repository.upsert(dict)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.error(err)
            })
    }
    // function handleDictionaryChange(target: any) {
    //     setDictionary({...dictionary as Dictionary, [target.id]: target.value})
    // }
    
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
        // handleDictionaryChange
    }
}