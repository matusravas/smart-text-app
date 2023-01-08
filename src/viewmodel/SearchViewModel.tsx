import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMountedEffect } from '../hooks/commons'
import { SearchResponse } from '../model/search/SearchResponse'
import { Date, Pagination, PaginationDefault, Search } from '../model/search/types'
import SearchRepository from '../repository/search/SearchRepository'


export const useSearchBarViewModel = (phrase: string, handleSearchOuterChange: (search: Partial<Search>) => void) => {
    const [search, setSearch] = useState('')

    // useMountedEffect(() => {
    //     if (search && search !== phrase) {
    //         const token = setTimeout(() => handleSearchOuterChange({ phrase: search }), 3000)
    //         return () => clearTimeout(token)
    //     }
    // }, [search])

    return {
        query: search,
        handleChange: setSearch
    }
}

export const useSearchViewModel = () => {
    const repository = SearchRepository.getInstance()
    const [search, setSearch] = useState<Search>({ phrase: '', operator: 'AND' })
    const [date, setDate] = useState<Date>({ from: moment().subtract(10, 'month').unix(), to: moment().unix() })
    const [pagination, setPagination] = useState<Pagination>({ ...PaginationDefault, start: 0, step: 10 })

    const [message, setMessage] = useState<string>()
    const [data, setData] = useState<SearchResponse>()

    useEffect(() => {
        console.log('useEffect')
        search.phrase && searchResults()
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
        if (!searchResults) setMessage('Search failed')
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