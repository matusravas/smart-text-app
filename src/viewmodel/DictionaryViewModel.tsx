import { useEffect, useRef, useState } from 'react'
import { Dictionary, Dictionary as DictionaryResult } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'
import { ActionType, RequestType } from './types/dictionary.types'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    // const [saved, setSaved] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState<ActionType>()
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
                setDictionaries(dicts)
                setDictionariesFiltered(dicts)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function handleSearchQueryChange(query: string) {
        query = query.length > 1 ? query : query.trim()
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

    function handleClick(type: ActionType, dict?: Dictionary) {
        setDictionary(dict)
        setDialogOpen(true)
        // setSaved(false)
        setType(type)
    }

    function handleUpsertOrDelete(requestType: RequestType, dict: Dictionary) {
        switch (requestType) {
            case 'upsert': {
                repository.upsert(dict)
                    .then(res => {
                        setType('update') // in order to allow delete button
                        setMessage(res)
                    })
                    .catch(err => {
                        console.error(err)
                        setMessage(err)
                    })
                    .finally(() => {
                    })
                break
            }
            case 'delete': {
                repository.removeKeyword(dict.keyword)
                    .then(res => {
                        setMessage(res)
                    })
                    .catch(err => {
                        console.error(err)
                        setMessage(err)
                    })
                    .finally(() => {
                        setDialogOpen(false)
                    })
                break
            }
        }

    }

    function toggleDialog() {
        setDialogOpen(!dialogOpen)
    }

    return {
        dictionaries: dictionariesFiltered,
        dictionary,
        searchQuery,
        dialogOpen,
        dialogType: type,
        toggleDialog,
        handleSearchQueryChange,
        handleClick,
        handleUpsertOrDelete
    }
}