import moment from 'moment'
import { useEffect, useState } from 'react'
import { SearchPaginationDefault, SearchRequest } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    const [lastTimestamp, setLastTimestamp] = useState<number>()
    const [requestData, setRequestData] = useState<SearchRequest>({
        search: { phrase: '', operator: 'OR', field: 'Kr_text' },
        pagination: SearchPaginationDefault
        , date: { from: moment().subtract(3, 'months').valueOf(), to: moment().valueOf() }
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
    }, [])

    const onLastTimestampObtained = (timestamp: number) => {
        const dateTo = moment.unix(timestamp).valueOf()
        const dateFrom = moment.unix(timestamp).subtract(3, 'month').valueOf()
        setRequestData({
            ...requestData
            , date: { from: dateFrom, to: dateTo }
        })
        setLastTimestamp(dateTo)
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchRequest>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    return {
        requestData,
        lastTimestamp,
        handleRequestDataChange
    }
}