export type ActionType = 'create' | 'update'
export type RequestType = 'upsert' | 'delete'
export type FormErrors = {
    keyword?: string
    synonyms?: string
}