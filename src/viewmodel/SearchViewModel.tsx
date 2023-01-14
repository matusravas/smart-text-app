import moment from 'moment'
import { useState } from 'react'
import { Search, SearchPaginationDefault, SearchRequest } from '../model/search/types'


// interface Props {
//     search: Search
//     date?: Date
//     pagination: Pagination
// }

export const useSearchViewModel = () => {
    const [requestData, setRequestData] = useState<SearchRequest>({
        search: { phrase: '', operator: 'OR', field: 'Kr_text' },
        date: {},
        pagination: { ...SearchPaginationDefault }
    })

    const setLastTimestamp = (timestamp: number) => {
        const dateTo = moment.unix(timestamp).valueOf()
        const dateFrom = moment.unix(timestamp).subtract(1, 'month').valueOf()
        setRequestData({...requestData, date: {...requestData.date, from: dateFrom, to: dateTo}})
    }

    const handleRequestDataChange = (newRequestData: Partial<SearchRequest>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    return {
        requestData,
        setLastTimestamp,
        handleRequestDataChange
    }
}