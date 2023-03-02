import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source, SourceOption } from '../../model/search/types'
import { DashboardFail, Status, StatusDefalt } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [sources, setSources] = useState<SourceOption[]>([])
    const [status, setStatus] = useState<Status>(StatusDefalt)
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const repository = SearchRepository.getInstance()
    
    useEffect(() => {
        repository
            .sourcesWithTimestamps()
            .then((it) => {
                if (!it.success) {
                    setStatus({ type: 'error', message: it.message })
                    return
                }
                console.log(it)
                const source: Source = it.data.length > 0 ? it.data[0] : { index: '', indexAlias: '' }
                console.log(source)
                setSearchData({
                    ...searchData
                    , source: source
                })
                setSources(it.data)
            })
            .catch((err: DashboardFail) => {
                console.error(err)
                setStatus({ type: 'error', message: err.message })
            });

        // return () => {
        //     fetchSources.current = false
        // }
    }, [])

    function submitSearch(newSearchData: Partial<SearchData>) {
        // if (!fetchSources) {
        //     setSearchData(prev => ({ ...prev, ...newSearchData }))
        //     searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
        //     return
        // }
        repository
            .sourcesWithTimestamps()
            .then((it) => {
                if (!it.success) {
                    setStatus({ type: 'error', message: it.message })
                    return
                }
                console.log(it.data)
                setSources(it.data)
            })
            .catch((err: DashboardFail) => {
                console.error(err)
                setStatus({ type: 'error', message: err.message })
            })
            .finally(() => {
                console.log(newSearchData)
                setSearchData(prev => ({ ...prev, ...newSearchData }))
                searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
            })
    }

    function onDictionaryObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
    }

    // function onSourceObtained(source: Source) {
    //     console.log(source)
    //     setSearchData(prev => (
    //         {
    //             ...prev
    //             , source: {
    //                 index: source.index,
    //                 indexAlias: source.indexAlias,
    //                 searchField: source.searchField,
    //                 dateField: source.dateField
    //             }
    //         })
    //     )
    //     setLastTimestamp(source.timestamp ? moment(source.timestamp).format('MMM Do YYYY, HH:mm') : 'N/A')// .format('MMM Do YYYY, HH:mm'): 'N/A')
    // }

    function handleError(errMsg: string) {
        setStatus({ type: 'error', message: errMsg })
    }
    function handleSuccess(msg: string) {
        setStatus({ type: 'success', message: msg })
    }
    function resetStatus() {
        setStatus(StatusDefalt)
    }

    return {
        status,
        searchData,
        sources,
        // lastTimestamp,
        dictionaryData,
        onDictionaryObtained,
        // onSourceObtained,
        submitSearch,
        handleError,
        handleSuccess,
        resetStatus
    }
}