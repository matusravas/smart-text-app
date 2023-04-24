import { Dictionary } from "../dictionary/types"
import { Column } from "../table/types.domain"
import { Data, SourceBulkStats } from "./types.domain"

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

export type SourceUIDsRaw = {
    index: string,
    alias: string,
    timestamp: number
    type: 'file' | 'db'
    files: SourceFileRaw[]
}

export type SourceRaw = {
    index: string
    alias: string
    search_field?: string
    date_field?: string
    timestamp?: number
    type: 'file' | 'db'
}

export type SearchResponseRaw = {
    columns: Column[]
    pagination: PaginationRaw
    dictionary: Dictionary | null
    results: Data[]
    source: SourceRaw
}