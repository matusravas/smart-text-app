import { DateRange } from "../commons/types"
import { Dictionary } from "../dictionary/types"
import { TablePagination } from "../table/types"
import { Column, Pagination } from "../table/types.domain"

export type Operator = 'OR' | 'AND'


export type SearchData = {
    searchPhrase: string
    searchOperator: Operator
    dateRange: DateRange
    source: SourceUIDs
    keywords: boolean
    pagination: Pagination
}

type FileSource = {
    type: 'file'
    uids: string[] 
}

type DBSource = {
    type: 'db'
    uids?: never 
}

export type SourceUIDs = {
    index: string
    alias: string
    searchField?: string
    dateField?: string
    timestamp?: Date
} & (FileSource | DBSource)

// export type Source = {
//     index: string
//     alias: string
//     searchField?: string
//     dateField?: string
//     timestamp?: Date
//     type: 'db' | 'file'
// }

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

export type SearchResponse = {
    columns: Column[]
    pagination: TablePagination
    dictionary: Dictionary | null
    results: Data[]
    source: {
        index: string
        alias: string
        searchField?: string
        dateField?: string
        timestamp?: Date
        type: 'db' | 'file'
    }
}

export const SearchDataDefault = {
    searchPhrase: ''
    ,searchOperator: 'OR' as Operator
    , source: {index: '', alias: '', type: 'db' as 'db'}
    , keywords: true
    , pagination: {currentPage: 0, pageSize: 10}
    , dateRange: { from: undefined, to: undefined }
}

export type Data = Record<string, string | number>