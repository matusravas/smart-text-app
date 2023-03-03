import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source, SourceOption } from '../../model/search/types'
import { TablePaginationDefault } from '../../model/table/types'
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
    }, [])

    function submitSearch(newSearchData: Partial<SearchData>) {
        console.log(newSearchData)
        setSearchData(prev => ({ ...prev, ...newSearchData }))
        searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
    }

    function onSources(sources: SourceOption[]) {
        if (!sources.length) {
            setSearchData(SearchDataDefault)
            setDictionaryData(null)
            return
        }
        const filtered = sources.filter(it => it.index === searchData.source.index)
        const source: Source = filtered.length === 1 
            ? filtered[0] 
            : sources.length > 0 
            ? sources[0] 
            : { index: '', indexAlias: '' }
        source.index !== searchData.source.index && setSearchData({
            ...searchData
            , source: source
            ,pagination: TablePaginationDefault
        })
        setSources(sources)
    }

    function onDictionaryObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
    }

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
        dictionaryData,
        onDictionaryObtained,
        submitSearch,
        onSources,
        handleError,
        handleSuccess,
        resetStatus
    }
}