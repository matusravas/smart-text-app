import { TablePagination } from "../table/types"
import { PaginationRaw, Column, Data } from "./types"

export type SearchResponseRaw = {
    columns: Column[],
    pagination: PaginationRaw
    results: Data[]
}

export type SearchResponse = {
    columns: Column[],
    pagination: TablePagination
    results: Data[]
}