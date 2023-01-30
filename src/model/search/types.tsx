import { Dictionary } from "../dictionary/types"

export type SearchData = {
    search: Search
    date: Date
    pagination: Pagination,
    lastTimestamp: number | null
}

export type DictionaryData = {
    useKeywords: boolean,
    dictionary: Dictionary
}

export type Operator = 'OR' | 'AND'

export type Search = {
    phrase: string
    field: string
    keywords: boolean
    operator: Operator
}

export type Date = {
    field?: string,
    from: number | null
    to: number | null
}

export const SearchPaginationDefault = {
    currentPage: 0,
    pageSize: 10,
}


export const SearchDataDefault = {
    search: { phrase: '', operator: 'OR' as Operator, field: 'Kr_text', keywords: true }
    , pagination: SearchPaginationDefault
    , date: { from: null, to: null }
    , lastTimestamp: null
}

export type Pagination = {
    currentPage: number,
    pageSize: number,
}

export type PaginationRaw = {
    current_page: number,
    page_size: number,
    total_hits: number,
    total_pages: number
}

export type Column = {
    field: string,
    title: string,
    type: 'string' | 'numeric' | 'date' | 'boolean'
}

export type Data = Record<string, string | number>