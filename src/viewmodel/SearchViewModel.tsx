import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../model/dictionary/types'
import { SearchPaginationDefault, SearchData, SearchDataDefault } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    // const [lastTimestamp, setLastTimestamp] = useState<number>()
    const [dictionary, setDictionary] = useState<Dictionary | null>(null)
    const [requestData, setRequestData] = useState<SearchData>(SearchDataDefault)
    const repository = SearchRepository.getInstance()

    useEffect(() => {
        repository
            .lastTimestamp()
            .then((timestamp) => {
                onLastTimestampObtained(timestamp)
            })
            .catch((err: Error) => {
                console.error(err)
            });
    },[])

    const onLastTimestampObtained = (timestamp: number) => {
        const dateTo = moment.unix(timestamp).valueOf()
        setRequestData({
            ...requestData
            , lastTimestamp: dateTo
            , date: {from: null, to: dateTo }
        })
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchData>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    const onDictionaryObtained = (dictionary: Dictionary | null) => {
        setDictionary(dictionary)
    }

    return {
        requestData,
        dictionary,
        onDictionaryObtained,
        handleRequestDataChange
    }
}