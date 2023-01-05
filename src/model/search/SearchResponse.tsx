import { Pagination, Column } from "./types"

export type SearchResponse = {
    columns: Array<Column>,
    pagination: Pagination
    results: Array<Record<string, string|number>>
}