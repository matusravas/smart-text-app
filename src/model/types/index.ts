export type Response<T> = {
    ok: boolean,
    data: T,
    message?: string
}

// export type Data<T> = {
//     ok: boolean,
//     data: Array<T>|T
// }