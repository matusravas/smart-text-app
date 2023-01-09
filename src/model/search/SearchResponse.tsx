import { Pagination, Column, Data } from "./types"

export type SearchResponse = {
    columns: Column[],
    pagination: Pagination
    results: Data[]
}