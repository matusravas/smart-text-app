import { useEffect, useState } from 'react'
import { ActionType, Dictionary, Dictionary as DictionaryResult, RequestType } from '../../model/dictionary/types'
import { DashboardFail, Status, StatusDefalt } from '../../model/types'
import DictionaryRepository from '../../repository/dictionary/DictionaryRepository'


export const useDictionaryViewModel = () => {
    const repository = DictionaryRepository.getInstance()
    const [fetch, setFetch] = useState(true)
    const [status, setStatus] = useState<Status>(StatusDefalt)
    const [actionType, setActionType] = useState<ActionType>()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dictionary, setDictionary] = useState<Dictionary>()
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([])
    const [dictionariesFiltered, setDictionariesFiltered] = useState<Dictionary[]>(dictionaries)

    useEffect(() => {
        fetch && repository.getSynonyms()
            .then(res => {
                if (!res.success) {
                    setStatus({type: 'error', message: res.message})
                    return 
                }
                setDictionaries(res.data)
                setDictionariesFiltered(res.data)
            })
            .catch((err: DashboardFail) => {
                console.error(err)
                setStatus({type: 'error', message: err.message})
            }).finally(() => {
                setFetch(false)
            })
    }, [fetch]) // Todo handle when to refetch

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
                const status = actionType === 'create' ? 'created' : 'updated'
                repository.upsert(dict)
                    .then(res => {
                        if (!res.success) {
                            setStatus({ type: 'error', message: res.message })
                            return
                        }
                        setActionType('update') // in order to make delete button visible
                        // setStatus({ type: 'success', message: `Resource ${status}` })
                        setStatus({ type: 'success', message: `Resource ${res.data.result}` })
                    })
                    .catch(err => {
                        // console.error(err)
                        setStatus({ type: 'error', message: `Resource could not be ${status}` })
                        // setStatus({ type: 'error', message: `Resource could not be ${status}` })
                    })
                    .finally(() => {
                        setFetch(true)
                    })
                break
            }
            case 'delete': {
                repository.removeKeyword(dict.keyword)
                    .then(res => {
                        if (!res.success) {
                            setStatus({ type: 'error', message: res.message })
                            return
                        }
                        setStatus({ type: 'success', message: `Resource ${res.data.result}` })
                    })
                    .catch(err => {
                        console.error(err)
                        setStatus({ type: 'error', message: 'Resource could not be deleted' })
                    })
                    .finally(() => {
                        setDialogOpen(false)
                        setFetch(true)
                    })
                break
            }
        }

    }

    function toggleDialog() {
        setDialogOpen(!dialogOpen)
    }

    function resetStatus() {
        setStatus(StatusDefalt)
        // setFetch(true)
    }

    return {
        dictionaries: dictionariesFiltered,
        dictionary,
        searchQuery,
        status,
        dialogOpen,
        actionType,
        toggleDialog,
        handleSearchQueryChange,
        handleClick,
        handleUpsertOrDelete,
        resetStatus
    }
}