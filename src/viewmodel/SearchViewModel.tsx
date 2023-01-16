import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dictionary } from '../model/dictionary/types'
import { SearchPaginationDefault, SearchData } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    // const [lastTimestamp, setLastTimestamp] = useState<number>()
    const [dictionary, setDictionary] = useState<Dictionary | null>(null)
    const [requestData, setRequestData] = useState<SearchData>({
        search: { phrase: '', operator: 'TEXT', field: 'Kr_text' },
        pagination: SearchPaginationDefault
        // , date: {to: moment().valueOf() }
    })
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
            , date: { to: dateTo }
        })
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchData>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    const handleDictionary = (dictionary: Dictionary | null) => {
        setDictionary(dictionary)
    }

    return {
        requestData,
        dictionary,
        handleDictionary,
        handleRequestDataChange
    }
}