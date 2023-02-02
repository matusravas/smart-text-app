import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../model/dictionary/types'
import { DictionaryData, SearchData, SearchDataDefault } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    // const [lastTimestamp, setLastTimestamp] = useState<number>()
    const [dictionaryData, setDictionaryData] = useState<DictionaryData | null>(null)
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
    }, [])

    const onLastTimestampObtained = (timestamp: number) => {
        const dateTo = moment.unix(timestamp).valueOf()
        setRequestData({
            ...requestData
            , lastTimestamp: dateTo
            , date: { from: null, to: dateTo }
        })
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchData>) => {
        console.log(newRequestData)
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    const onDictionaryObtained = (dictionary: Dictionary | null) => {
        setDictionaryData(dictionary ? {dictionary: dictionary, useKeywords: true }: null)
        // dictionary && setRequestData({...requestData, search: {...requestData.search, keywords: true}})
    }

    return {
        requestData,
        dictionaryData,
        onDictionaryObtained,
        handleRequestDataChange
    }
}