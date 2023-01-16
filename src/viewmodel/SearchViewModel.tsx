import moment from 'moment'
import { useEffect, useState } from 'react'
import { SearchPaginationDefault, SearchData } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchViewModel = () => {
    // const [lastTimestamp, setLastTimestamp] = useState<number>()
    const [requestData, setRequestData] = useState<SearchData>({
        search: { phrase: '', operator: 'TEXT', field: 'Kr_text' },
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
            , lastTimestamp: dateTo
            , date: { from: dateFrom, to: dateTo }
        })
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchData>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    return {
        requestData,
        handleRequestDataChange
    }
}