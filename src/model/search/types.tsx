export type SearchData = {
    search: Search
    dateRange: DateRange
    source: Source
    isKeywords: boolean
    pagination: Pagination,
    // lastTimestamp: number | null //! Todo put it elsewhere
}

export type Operator = 'OR' | 'AND'

export type Search = {
    phrase: string
    // field?: string
    // isKeywords: boolean
    operator: Operator
}

export type Source = {
    index: string
    searchField?: string
    dateField?: string
    timestamp?: number 
}

export type DateRange = {
    // field?: string,
    from: number | null
    to: number | null
}

export const SearchPaginationDefault = {
    currentPage: 0,
    pageSize: 10,
}


export const SearchDataDefault = {
    search: { phrase: '', operator: 'OR' as Operator }
    // search: { phrase: '', operator: 'OR' as Operator, field: 'Kr_text' }
    , source: {index: ''}
    , isKeywords: false
    , pagination: SearchPaginationDefault
    , dateRange: { from: null, to: null }
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
    field: string
    title: string
    type: 'string' | 'numeric' | 'date' | 'boolean'
}


export type SourceOptionRaw = {
    index: string,
    index_alias: string,
    timestamp: number
}

export type SourceOption = {
    index: string
    indexAlias: string
    timestamp: number
}

export type Data = Record<string, string | number>