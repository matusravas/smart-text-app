export type Pagination = {
    currentPage: number,
    pageSize: number,
}

export type Column = {
    field: string
    title: string
    type: 'string' | 'numeric' | 'date' | 'boolean'
}