import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source } from '../../model/search/types'
import { DashboardFail, Status, StatusDefault } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'
import { MenuCheckboxOption } from '../../view/search/components/MenuCheckboxButton'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [shouldFetchSources, setShouldFetchSources] = useState(true)
    const [status, setStatus] = useState<Status>(StatusDefault)
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const repository = SearchRepository.getInstance()

    useEffect(() => {
        shouldFetchSources && !searchData.source.index && repository
            .sourcesWithTimestamps()
            .then((it) => {
                if (!it.success) {
                    setStatus({ type: 'error', message: it.message })
                    return
                }
                const source: Source = 
                    it.data.length > 0 && it.data[0].index && it.data[0].uids
                        ? { ...it.data[0] }
                        : { index: '', alias: '', uids: [] }
                
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
        if(!newSearchData.searchPhrase || (searchData.searchPhrase !== newSearchData.searchPhrase)) {
            setDictionaryData(null)
        } 
    }

    function fetchSourceFiles(_event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<MenuCheckboxOption[]>((resolve, reject) => {
            repository
                .sourceFiles(searchData.source.index)
                .then((it) => {
                    if (!it.success) {
                        setStatus({ type: 'error', message: 'Unable to obtain source files' })
                        return reject('No available source files')
                    }
                    const {uids} = searchData.source
                    resolve(it.data.map((it, idx) => {
                        // Todo pass callback here to some object with data and in resolve where it is called, call the callback
                        const ctime = moment(it.ctime).format('MMM Do YYYY, HH:mm')
                        const checkedIdx = uids.indexOf(it.uid)
                        return {
                            label: it.name
                            , value: it.uid
                            , subLabel: `${ctime} (${it.stats.nitems} rows)`
                            , checked: !uids.length && !idx ? true : checkedIdx !== -1 ? true : false
                        }
                    }))
                })
                .catch((err: DashboardFail) => {
                    setStatus({ type: 'error', message: 'Unable to obtain source files' })
                    return reject('No available source files')
                });
        })
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

    return {
        status
        ,searchData
        ,dictionaryData
        ,onSearchDataObtained
        ,submitSearch
        ,fetchSourceFiles
        ,handleError
        ,handleSuccess
        ,resetStatus
    }
}