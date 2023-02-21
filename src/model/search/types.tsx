export type SearchData = {
    search: Search
    dateRange: DateRange
    source: Source
    hasKeywords: boolean
    pagination: Pagination,
    // lastTimestamp: number | null //! Todo put it elsewhere
}

export type Operator = 'OR' | 'AND'

export type Search = {
    phrase: string
    // field?: string
    // hasKeywords: boolean
    operator: Operator
}

export type Source = {
    index: string
    indexAlias: string
    searchField?: string
    dateField?: string
    timestamp?: Date 
}

export type DateRange = {
    // field?: string,
    from: Date | undefined
    to?: Date
}

export const SearchDataDefault = {
    search: { phrase: '', operator: 'OR' as Operator }
    // search: { phrase: '', operator: 'OR' as Operator, field: 'Kr_text' }
    , source: {index: '', indexAlias: ''}
    , hasKeywords: false
    , pagination: {currentPage: 0, pageSize: 10}
    , dateRange: { from: undefined, to: undefined }
    // , lastTimestamp: null
}

export type Pagination = {
    currentPage: number,
    pageSize: number,
}

export type Column = {
    field: string
    title: string
    type: 'string' | 'numeric' | 'date' | 'boolean'
}

export type SourceOption = {
    index: string
    indexAlias: string
    timestamp: Date
}

export type Data = Record<string, string | number>