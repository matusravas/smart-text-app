import { Dictionary } from "../dictionary/types"
import { TablePagination } from "../table/types"
import { PaginationRaw, Column, Data } from "./types"

export type SearchResponseRaw = {
    columns: Column[]
    pagination: PaginationRaw
    dictionary: Dictionary|null
    results: Data[]
}

export type SearchResponse = {
    columns: Column[]
    pagination: TablePagination
    dictionary: Dictionary|null
    results: Data[]
}