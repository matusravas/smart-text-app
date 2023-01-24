export type Response<T> = {
    ok: boolean,
    data: T,
    message?: string
}

export type StatusTypes = 'info' | 'success' | 'error'

export type Status = {
    error?: boolean,
    type: StatusTypes
    message: string
}

export const StatusDefalt: Status = {type: 'info', message: ''}