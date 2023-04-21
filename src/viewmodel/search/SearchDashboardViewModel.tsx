import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source, SourceWithTimestamp } from '../../model/search/types.domain'
import { DashboardFail, Status, StatusDefault } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'
import { MenuCheckboxOption } from '../../view/search/components/MenuCheckboxButton'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [shouldFetchSources, setShouldFetchSources] = useState(true)
    const [status, setStatus] = useState<Status>(StatusDefault)
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const searchRepository = SearchRepository.getInstance()

    useEffect(() => {
        shouldFetchSources && !searchData.source.index && searchRepository
            .sourcesWithTimestamps()
            .then((it) => {
                if (!it.success) {
                    setStatus({ type: 'error', message: it.message })
                    return
                }
                let source: SourceWithTimestamp = { type: 'db', index: '', alias: '' }

                if (it.data.length) {
                    const fetchedSource = it.data[0]
                    console.log(it.data)
                    switch (fetchedSource.type) {
                        case "file": {
                            source = {
                                type: fetchedSource.type,
                                index: fetchedSource.index,
                                alias: fetchedSource.alias,
                                timestamp: fetchedSource.timestamp,
                                uids: fetchedSource.uids
                            }
                            break

                        }
                        case "db": {
                            source = {
                                type: fetchedSource.type,
                                index: fetchedSource.index,
                                alias: fetchedSource.alias,
                                timestamp: fetchedSource.timestamp,
                            }
                            break
                        }
                    }
                }
                console.log(source)
                setSearchData({
                    ...searchData
                    , source: source
                })
            })
            .catch((err: DashboardFail) => {
                console.error(err)
                setStatus({ type: 'error', message: err.message })
            })
            .finally(() => {
                setShouldFetchSources(false)
            });
    }, [shouldFetchSources])

    function submitSearch(newSearchData: Partial<SearchData>, reset?: boolean) {
        // Todo can only re-fetch sources if newSearchData !== current state of searchData
        reset && setShouldFetchSources(true)
        setSearchData(prev => ({ ...prev, ...newSearchData }))
        // newSearchData.source?.index !== searchData.source.index && setUids([])
        // newSearchData.searchPhrase !== undefined && searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
        if (!newSearchData.searchPhrase || (searchData.searchPhrase !== newSearchData.searchPhrase)) {
            setDictionaryData(null)
        }
    }

    // woould never be called if searchData.source.type === 'db
    function fetchSourceFiles(_event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<MenuCheckboxOption[]>((resolve, reject) => {
            searchRepository
                .sourceFiles(searchData.source.index)
                .then((it) => {
                    if (!it.success) {
                        setStatus({ type: 'error', message: 'Unable to obtain source files' })
                        return reject('No available source files')
                    }
                    if (searchData.source.type === 'db') {
                        resolve([])
                        return
                    }
                    const { uids } = searchData.source
                    resolve(it.data.map((it, idx) => {
                        // Todo pass callback here to some object with data and in resolve where it is called, call the callback
                        const ctime = moment(it.ctime).format('MMM Do YYYY, HH:mm')
                        const checkedIdx = uids.indexOf(it.uid)
                        return {
                            label: it.name
                            , value: it.uid
                            , subLabel: `${ctime} (${it.stats.nitems} rows)`
                            // , checked: !uids.length && !idx ? true : checkedIdx !== -1 ? true : false
                            , checked: checkedIdx !== -1 ? true : false
                        }
                    }))
                })
                .catch((err: DashboardFail) => {
                    setStatus({ type: 'error', message: 'Unable to obtain source files' })
                    return reject('No available source files')
                });
        })
    }

    async function handleDeleteSource(source: Source) {
        searchRepository
            .deleteSource(source.index)
            .then((it) => {
                if (!it.success || !it.data) return null
                return searchRepository.sourcesWithTimestamps()
            })
            .then(it => {
                if (it && it.success) {
                    console.log(it.data)
                    if (!it.data.length) {
                        submitSearch(SearchDataDefault)
                        return
                    }
                    submitSearch({ source: it.data[0] })
                    setStatus({ type: 'success', message: `Source ${source.alias} successfully deleted` })
                } 
                else setStatus({ type: 'error', message: `Unable to delete source ${source.alias}` })
            })
            .catch((err) => {
                setStatus({ type: 'error', message: `Unable to delete source ${source.alias}` })
            });
    }

    function onSearchDataObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
        setSearchData({ ...searchData })
    }


    function handleError(err: string) {
        setStatus({ type: 'error', message: err })
    }
    function handleSuccess(msg: string) {
        setStatus({ type: 'success', message: msg })
    }
    function resetStatus() {
        setStatus(StatusDefault)
    }

    const lastTimestamp = searchData.source.timestamp
        ? moment(searchData.source.timestamp).format('MMM Do YYYY, HH:mm')
        : null

    return {
        status
        , searchData
        , dictionaryData
        , onSearchDataObtained
        , submitSearch
        , fetchSourceFiles
        , handleError
        , handleSuccess
        , handleDeleteSource
        , resetStatus
        , lastTimestamp
    }
}