import { DateRange } from "../commons/types"
import { Dictionary } from "../dictionary/types"
import { TablePagination } from "../table/types"
import { Column, Pagination } from "../table/types.domain"

export type Operator = 'OR' | 'AND'
export type SourceOptionType = 'file' | 'db'


export type SearchData = {
    searchPhrase: string
    searchOperator: Operator
    dateRange: DateRange
    source: SourceWithTimestamp
    keywords: boolean
    pagination: Pagination
}

export type FileSource = {
    type: 'file'
    uids: string[] 
}

export type DBSource = {
    type: 'db'
    uids?: never 
}

export type SourceWithTimestamp = {
    index: string
    alias: string
    searchField?: string
    dateField?: string
    timestamp?: Date
} & (FileSource | DBSource)

export type Source = {
    index: string
    alias: string
    searchField?: string
    dateField?: string
    timestamp?: Date
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

export type FileSourceOption = {
    type: 'file'
    uids: string[]
}

export type DBSourceOption = {
    type: 'db'
}

export type SourceOption = {
    index: string
    alias: string
    timestamp: Date
} & (FileSourceOption | DBSourceOption)


export type SearchResponse = {
    columns: Column[]
    pagination: TablePagination
    dictionary: Dictionary | null
    results: Data[]
    source: Source
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