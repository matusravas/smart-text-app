export type Response<T> = {
    ok: boolean
    data: T
    message?: string
}

// export type ResponseStatus = 'success' | 'fail'

// export enum ResponseStatus { Success, Fail}

export type ApiResponseSuccess<T> = {
    success: true
    data: T
    message?: string
} 

export type ApiResponseFail = {
    success: false
    message: string
} 

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseFail

export type DashboardSuccess<T> = {
    success: true
    data: T
} 

export type DashboardFail = {
    success: false
    message: string
} 

export type Dashboard<T> = DashboardSuccess<T> | DashboardFail

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