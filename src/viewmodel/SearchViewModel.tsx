import moment from 'moment'
import { useState } from 'react'
import { SearchResponse } from '../model/search/SearchResponse'
import { PaginationDefault, SearchRequest } from '../model/search/types'


export const useSearchViewModel = () => {
    // const repository = SearchRepository.getInstance()
    // const [search, setSearch] = useState<Search>({ phrase: '', operator: 'AND' })
    // const [date, setDate] = useState<Date>({ from: moment().subtract(10, 'month').unix(), to: moment().unix() })
    // const [pagination, setPagination] = useState<Pagination>({ ...PaginationDefault, start: 0, step: 10 })
    const [requestData, setRequestData] = useState<SearchRequest>({
        search: { phrase: '', operator: 'OR', field: 'Kr_text' },
        // Todo remove subtraction of 10 months this was just for development needs
        date: { from: moment().subtract(10, 'month').unix(), to: moment().unix() }, 
        pagination: { ...PaginationDefault, start: 0, step: 10 }
    })

    const [message, setMessage] = useState<string>()
    const [responseData, setResponseData] = useState<SearchResponse>()

    // useEffect(() => {
    //     console.log('useEffect')
    //     requestData.search.phrase && searchResults()
    // }, [requestData])

    const handleRequestDataChange = (newRequest: Partial<SearchRequest>) => {
        setRequestData(prev => ({ ...prev, ...newRequest }))
    }

    // const searchResults = async () => {
    //     const searchResults = await repository.search(requestData)
    //     if (!searchResults) setMessage('Search failed')
    //     setResponseData(searchResults)
    // }

    return {
        responseData,
        requestData,
        handleRequestDataChange
    }
}