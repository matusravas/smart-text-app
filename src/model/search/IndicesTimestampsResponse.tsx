import { IndexTimestamp } from "./types"

export type IndexTimestampRaw = {
    index: string,
    index_alias: string,
    timestamp: number
    search_field: string,
    date_field: string,
}

export type IndicesTimestampsResponseRaw = {
    indices_timestamps: IndexTimestampRaw[]
    max_timestamp: number
}

export type IndicesTimestampsResponse = {
    indicesTimestamps: IndexTimestamp[]
    maxTimestamp: number
}