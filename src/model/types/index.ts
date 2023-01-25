export type Response<T> = {
    ok: boolean
    data: T
    message?: string
}

export type ResponseUpsert<T> = {
    ok: boolean
    result: string
    data?: T
    id?: string | number
    version?: number
}

export type ResponseDelete = {
    ok: boolean
    id: string | number
    result: string
}

export type StatusTypes = 'info' | 'success' | 'error'

export type Status = {
    error?: boolean,
    type: StatusTypes
    message: string
}

export const StatusDefalt: Status = {type: 'info', message: ''}