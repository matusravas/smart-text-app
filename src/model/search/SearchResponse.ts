import { Dictionary } from "../dictionary/types"
import { TablePagination } from "../table/types"
import { Column, Data, Source, SourceBulkStats } from "./types"

export type PaginationRaw = {
    current_page: number,
    page_size: number,
    total_hits: number,
    total_pages: number
}

export type SourceFileRaw = {
    name: string
    uid: string
    ctime: number
    rtime: number
    stats: SourceBulkStats
}

export type SourceOptionRaw = {
    index: string,
    alias: string,
    timestamp: number
    // uid: string
    files: SourceFileRaw[]
}

export type SourceRaw = {
    index: string
    alias: string
    search_field?: string
    date_field?: string
    timestamp?: number
}

export type SearchResponseRaw = {
    columns: Column[]
    pagination: PaginationRaw
    dictionary: Dictionary | null
    results: Data[]
    source: SourceRaw
    uids: string[]
}

export type SearchResponse = {
    columns: Column[]
    pagination: TablePagination
    dictionary: Dictionary | null
    results: Data[]
    source: Source
    uids: string[]
}