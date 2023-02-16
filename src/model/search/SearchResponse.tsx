import { Dictionary } from "../dictionary/types"
import { TablePagination } from "../table/types"
import { PaginationRaw, Column, Data, Source } from "./types"

export type SourceRaw = {
    index: string
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
}

export type SearchResponse = {
    columns: Column[]
    pagination: TablePagination
    dictionary: Dictionary | null
    results: Data[]
    source: Source
}