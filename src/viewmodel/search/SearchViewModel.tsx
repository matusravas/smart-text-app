import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SourceOption, SearchData, SearchDataDefault, Source } from '../../model/search/types'
import { Status, StatusDefalt } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [sources, setSources] = useState<SourceOption[]>([])
    const [status, setStatus] = useState<Status>(StatusDefalt)
    const [lastTimestamp, setLastTimestamp] = useState('N/A')
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
                const { data: sources } = it
                const source: Source = sources.length > 0 ? sources[0] : { index: '', indexAlias: '' }
                setSearchData({
                    ...searchData
                    , source: source
                })
                setSources(sources)
            })
            .catch((err: Error) => {
                console.error(err)
            });
    }, [])


    function submitSearchData(newSearchData: Partial<SearchData>) {
        console.log(newSearchData)
        setSearchData(prev => ({ ...prev, ...newSearchData }))
        searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
    }

    function onDictionaryObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
    }

    function onSourceObtained(source: Source) {
        console.log(source)
        setSearchData(prev => (
            {
                ...prev
                , source: {
                    index: source.index,
                    indexAlias: source.indexAlias,
                    searchField: source.searchField,
                    dateField: source.dateField
                }
            })
        )
        setLastTimestamp(source.timestamp ? moment(source.timestamp).format('MMM Do YYYY, HH:mm') : 'N/A')// .format('MMM Do YYYY, HH:mm'): 'N/A')
    }

    function handleError(errMsg: string) {
        setStatus({type: 'error', message: errMsg})
    }
    function handleSuccess(msg: string) {
        setStatus({type: 'success', message: msg})
    }
    function resetStatus() {
        setStatus(StatusDefalt)
    }

    return {
        status,
        searchData,
        sources,
        lastTimestamp,
        dictionaryData,
        onDictionaryObtained,
        onSourceObtained,
        submitSearchData,
        handleError,
        handleSuccess,
        resetStatus
    }
}