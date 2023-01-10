import moment from 'moment'
import { useState } from 'react'
import { SearchResponse } from '../model/search/SearchResponse'
import { SearchPaginationDefault, SearchRequest } from '../model/search/types'


export const useSearchViewModel = () => {
    const [requestData, setRequestData] = useState<SearchRequest>({
        search: { phrase: '', operator: 'OR', field: 'Kr_text' },
        // Todo remove subtraction of 10 months this was just for development needs
        date: { from: moment().subtract(10, 'month').unix(), to: moment().unix() }, 
        pagination: { ...SearchPaginationDefault }
    })

    const handleRequestDataChange = (newRequestData: Partial<SearchRequest>) => {
        setRequestData(prev => ({ ...prev, ...newRequestData }))
    }

    return {
        requestData,
        handleRequestDataChange
    }
}