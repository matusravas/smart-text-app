import { useEffect, useState } from 'react'
import SearchRepository from '../repository/search/SearchRepository'
import { Search, Date, Pagination, PaginationDefault } from '../model/search/types'
import moment from 'moment'
import { SearchResponse } from '../model/search/SearchResponse'


export const useSearchViewModel = () => {
    const repository = SearchRepository.getInstance()
    const [search, setSearch] = useState<Search>({ phrase: null, operator: 'AND' })
    const [date, setDate] = useState<Date>({ from: moment().subtract(10, 'month').unix(), to: moment().unix() })
    const [pagination, setPagination] = useState<Pagination>({ ...PaginationDefault, start: 0, step: 10 })

    const [message, setMessage] = useState<string>()
    const [data, setData] = useState<SearchResponse>()

    useEffect(() => {
        console.log('useEffect')
        searchResults()
    }, [search, date, pagination])

    const handleSearchChange = (newSearch: Partial<Search>) => {
        setSearch(prev => ({ ...prev, ...newSearch }))

    }
    const handleDateChange = (newDate: Partial<Date>) => {
        setDate(prev => ({ ...prev, ...newDate }))
    }
    const handlePaginationChange = (newPagination: Partial<Pagination>) => {
        setPagination(prev => ({ ...prev, ...newPagination }))
    }

    const searchResults = async () => {
        const searchResults = await repository.search(search, pagination, date)
        if(!searchResults) setMessage('Search failed')
        setData(searchResults)
    }

    return {
        data,
        search,
        date,
        pagination,
        // searchResults,
        handleSearchChange
    }
}