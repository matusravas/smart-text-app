import { Pagination, PaginationRaw, Column, Data } from "./types"

export type SearchResponseRaw = {
    columns: Column[],
    pagination: PaginationRaw
    results: Data[]
}

export type SearchResponse = {
    columns: Column[],
    pagination: Pagination
    results: Data[]
}