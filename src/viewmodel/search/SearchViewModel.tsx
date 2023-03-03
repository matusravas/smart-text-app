import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source, SourceOption } from '../../model/search/types'
import { TablePaginationDefault } from '../../model/table/types'
import { DashboardFail, Status, StatusDefalt } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'
import { MenuButtonOption } from '../../view/search/components/MenuButton'


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

    function fetchSources(_event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<MenuButtonOption[]>((resolve, reject) => {
            repository
                .sourcesWithTimestamps()
                .then((it) => {
                    if (!it.success) {
                        setSearchData(SearchDataDefault)
                        setDictionaryData(null)
                        setSources([])
                        setStatus({ type: 'error', message: 'Unable to obtain sources' })
                        return
                    }
                    const filtered = it.data.filter(it => it.index === searchData.source.index)
                    const source: Source = filtered.length === 1
                        ? filtered[0]
                        : it.data.length > 0
                            ? it.data[0]
                            : { index: '', indexAlias: '' }
                    source.index !== searchData.source.index && setSearchData({
                        ...searchData
                        , source: source
                        , pagination: TablePaginationDefault
                    })
                    setSources(it.data)
                    resolve(it.data.map(it => {
                        return { 'label': it.indexAlias, 'value': it.index }
                    }))
                })
                .catch((err: DashboardFail) => {
                    setSearchData(SearchDataDefault)
                    setDictionaryData(null)
                    setSources([])
                    setStatus({ type: 'error', message: 'Unable to obtain sources' })
                    resolve([])
                });
        })
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
        fetchSources,
        handleError,
        handleSuccess,
        resetStatus
    }
}