import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../model/dictionary/types'
import { SearchData, SearchDataDefault } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    const [dictionaryData, setDictionaryData] = useState<Dictionary | null>(null)
    const [searchData, setSearchData] = useState<SearchData>(SearchDataDefault)
    const repository = SearchRepository.getInstance()

    useEffect(() => {
        repository
            .lastTimestamp()
            .then((timestamp) => {
                const dateTo = moment.unix(timestamp).valueOf()
                setSearchData({
                    ...searchData
                    , lastTimestamp: dateTo
                    , date: { from: null, to: dateTo }
                })
            })
            .catch((err: Error) => {
                console.error(err)
            });
    }, [])


    function handleSearchDataChange(newSearchData: Partial<SearchData>) {
        console.log(newSearchData)
        setSearchData(prev => ({ ...prev, ...newSearchData}))
    }

    function onDictionaryObtained(dictionary: Dictionary | null) {
        setDictionaryData(dictionary)
        //! Todo reset isKeywords
        // dictionary && handleSearchDataChange({...requestData, search: {...requestData.search, keywords: true}})
    }

    return {
        searchData,
        dictionaryData,
        onDictionaryObtained,
        handleSearchDataChange,
    }
}