export type SearchRequest = {
    search: Search
    date: Date
    pagination: Pagination
}

export type Search = {
    phrase: string,
    field?: string,
    operator : 'AND' | 'OR'
}

export type Date = {
    field?: string,
    from: number
    to: number
}

export const PaginationDefault = {
    currentPage: 0,
    totalHits: 0,
    totalPages: 0  
}

export type Pagination = {
    start: number,
    step: number,
    currentPage: number,
    totalHits: number,
    totalPages: number
}

export type Column = {
    field: string,
    title: string,
    type: 'string' | 'numeric' | 'date' | 'boolean'
}

export type Data = Record<string, string|number>