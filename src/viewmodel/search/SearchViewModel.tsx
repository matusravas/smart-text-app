import { useEffect, useState } from 'react'
import { Dictionary } from '../../model/dictionary/types'
import { SearchData, SearchDataDefault, Source } from '../../model/search/types'
import { DashboardFail, Status, StatusDefault } from '../../model/types'
import SearchRepository from '../../repository/search/SearchRepository'
import { MenuCheckboxOption, MenuOption } from '../../view/search/components/MenuButton'
import moment from 'moment'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [shouldFetchSources, setShouldFetchSources] = useState(true)
    const [status, setStatus] = useState<Status>(StatusDefault)
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const [uids, setUids] = useState<string[]>([])
    const repository = SearchRepository.getInstance()

    useEffect(() => {
        shouldFetchSources && !searchData.source.index && repository
            .sourcesWithTimestamps()
            .then((it) => {
                if (!it.success) {
                    setStatus({ type: 'error', message: it.message })
                    return
                }
                console.log(it)
                const source: Source = it.data.length > 0
                    ? { ...it.data[0] }
                    : { index: '', alias: '' }
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
        newSearchData.source?.index !== searchData.source.index && setUids([])
        newSearchData.searchPhrase !== undefined && searchData.searchPhrase !== newSearchData.searchPhrase && setDictionaryData(null)
    }

    function onNoSources() {
        setSearchData(SearchDataDefault)
        setDictionaryData(null)
        setStatus({ type: 'error', message: 'Unable to obtain sources' })
    }

    function fetchSources(_event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<MenuOption[]>((resolve, reject) => {
            repository
                .sourcesWithTimestamps()
                .then((it) => {
                    if (!it.success) {
                        onNoSources()
                        return reject('No available sources')
                    }
                    resolve(it.data.map(it => {
                        return { label: it.alias, value: it.index }
                    }))
                })
                .catch((err: DashboardFail) => {
                    onNoSources()
                    return reject('No available sources')
                });
        })
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
                    resolve(it.data.map((it, idx) => {
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

    function onSearchDataObtained(dictionary: Dictionary | null, source: Source) {
        setDictionaryData(dictionary)
        setSearchData({ ...searchData, source })
    }

    function handleError(errMsg: string) {
        setStatus({ type: 'error', message: errMsg })
    }
    function handleSuccess(msg: string) {
        setStatus({ type: 'success', message: msg })
    }
    function resetStatus() {
        setStatus(StatusDefault)
    }

    function handleSourcesObtained(options: MenuOption[]) {
        const filtered = options.filter(it => it.value === searchData.source.index)
        const source: Source = filtered.length === 1
            ? { ...searchData.source }
            : options.length > 0
                ? { index: options[0].value, alias: options[0].label }
                : { index: '', alias: '' }

        source.index !== searchData.source.index && setSearchData({
            ...searchData
            , source: source
            , pagination: { currentPage: 0, pageSize: searchData.pagination.pageSize }
        })
    }

    function handleSourcesFileObtained(options: MenuCheckboxOption[]) {
        setUids(options.filter(it => it.checked).map(it => it.value))
    }

    function handleSourceFileChecked(option: MenuCheckboxOption) {
        console.log(option)
        let checkedItems = [...uids]
        if (!option.checked) {
            console.log('Checked', option.label, option.value)
            checkedItems.push(option.value)
            console.log(checkedItems)
        } else {
            const index = checkedItems.indexOf(option.value)
            if (index !== -1) checkedItems.splice(index)
        }
        setUids(checkedItems)
    }
    
    
    function handleSubmitSourceFiles(options: MenuCheckboxOption[]) {
        console.log(options)
        console.log(uids)
    }

    return {
        status
        ,searchData
        ,dictionaryData
        ,onSearchDataObtained
        ,submitSearch
        ,fetchSources
        ,handleSourcesObtained
        ,fetchSourceFiles
        ,handleSourceFileChecked
        ,handleSourcesFileObtained
        ,handleSubmitSourceFiles
        ,handleError
        ,handleSuccess
        ,resetStatus
    }
}