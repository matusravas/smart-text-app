import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../model/dictionary/types'
import { IndexTimestamp, SearchData, SearchDataDefault, Source } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    // const [lastTimestamp, setLastTimestamp] = useState<number | null>(null)
    const [indicesTimestamps, setIndicesTimestamps] = useState<IndexTimestamp[]>([])
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const repository = SearchRepository.getInstance()

    useEffect(() => {
        repository
            .indicesWithTimestamps()
            .then((it) => {
                // console.log(it)
                const source: Source = it.indicesTimestamps.length > 0 ? it.indicesTimestamps[0] : { index: '' }
                const timestamp = it.indicesTimestamps.length > 0 ? it.indicesTimestamps[0].timestamp : it.maxTimestamp
                const dateTo = moment.unix(timestamp).valueOf()
                setSearchData({
                    ...searchData
                    , source: source
                    // , lastTimestamp: dateTo
                    , dateRange: { from: null, to: dateTo }
                })
                // setLastTimestamp(dateTo)
                setIndicesTimestamps(it.indicesTimestamps)
            })
            .catch((err: Error) => {
                console.error(err)
            });
    }, [])


    function handleSearchDataChange(newSearchData: Partial<SearchData>) {
        console.log(searchData)
        console.log(newSearchData)
        // if (newSearchData.source !== undefined && newSearchData.source?.index !== searchData.source.index){
        //     setSearchData({...SearchDataDefault, source: {index: newSearchData.source?.index}})
        // } else {
        setSearchData(prev => ({ ...prev, ...newSearchData }))
        // }
        searchData.search.phrase !== newSearchData.search?.phrase && setDictionaryData(null)
        // || newSearchData.source?.index !== searchData.source.index 
        // && setDictionaryData(null)
    }

    function onDictionaryObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
    }

    function onSourceObtained(source: Source) {
        setSearchData(prev => ({ ...prev, source: { index: prev.source.index, searchField: source.searchField, dateField: source.dateField } }))
    }

    return {
        searchData,
        indicesTimestamps,
        dictionaryData,
        onDictionaryObtained,
        onSourceObtained,
        handleSearchDataChange,
    }
}