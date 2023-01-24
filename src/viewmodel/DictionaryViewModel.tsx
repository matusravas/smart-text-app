import { useEffect, useState } from 'react'
import { ActionType, Dictionary, Dictionary as DictionaryResult, RequestType } from '../model/dictionary/types'
import DictionaryRepository from '../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [message, setMessage] = useState<string>()
    const [actionType, setActionType] = useState<ActionType>()
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
        setActionType(type)
    }

    function handleUpsertOrDelete(requestType: RequestType, dict: Dictionary) {
        switch (requestType) {
            case 'upsert': {
                const status = actionType === 'create'? 'created' : 'updated'
                repository.upsert(dict)
                    .then(res => {
                        setActionType('update') // in order to make delete button visible
                        setMessage(`Resource ${status}`)
                    })
                    .catch(err => {
                        console.error(err)
                        setMessage(`Resource could not be ${status}`)
                    })
                    .finally(() => {
                    })
                break
            }
            case 'delete': {
                repository.removeKeyword(dict.keyword)
                    .then(res => {
                        setMessage('Resource deleted')
                    })
                    .catch(err => {
                        console.error(err)
                        setMessage('Resource could not be deleted')
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
        message,
        dialogOpen,
        actionType,
        toggleDialog,
        handleSearchQueryChange,
        handleClick,
        handleUpsertOrDelete
    }
}