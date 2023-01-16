export type SearchData = {
    search: Search
    date?: Date
    pagination: Pagination,
    lastTimestamp?: number
}

export type Operator = 'TEXT' | 'AND' | 'OR'

export type Search = {
    phrase: string,
    field: string,
    operator: Operator
}

export type Date = {
    field?: string,
    from?: number
    to?: number
}

export const SearchPaginationDefault = {
    currentPage: 0,
    pageSize: 10,
}

export type Pagination = {
    currentPage: number,
    pageSize: number,
}

export type PaginationRaw = {
    current_page: number,
    page_size: number,
    total_hits: number,
    total_pages: number
}

export type Column = {
    field: string,
    title: string,
    type: 'string' | 'numeric' | 'date' | 'boolean'
}

export type Data = Record<string, string | number>