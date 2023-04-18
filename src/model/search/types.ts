export type SearchData = {
    // search: Search
    searchPhrase: string
    searchOperator: Operator
    dateRange: DateRange
    source: Source
    keywords: boolean
    pagination: Pagination
    // lastTimestamp: number | null //! Todo put it elsewhere
}

export type Operator = 'OR' | 'AND'

// export type Search = {
//     phrase: string
//     // field?: string
//     // hasKeywords: boolean
//     operator: Operator
// }

export type Source = {
    index: string
    alias: string
    // uids?: string[]
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
    // search: { phrase: '', operator: 'OR' as Operator }
    searchPhrase: ''
    
    ,searchOperator: 'OR' as Operator
    // search: { phrase: '', operator: 'OR' as Operator, field: 'Kr_text' }
    , source: {index: '', alias: '', uids: []}
    , keywords: true
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

export type SourceBulkStats = {
    nitems: number
    inserts: number
    updates: number
    errors: number
}

export type SourceFile = {
    name: string
    uid: string
    ctime: Date
    rtime: Date
    stats: SourceBulkStats
}

export type SourceOption = {
    index: string
    alias: string
    timestamp: Date
    // uids: string[]
}

// export type SourceOptionFile = {
//     index: string
//     alias: string
//     timestamp: Date
//     files: SourceFile[]
// }

export type Data = Record<string, string | number>