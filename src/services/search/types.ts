import { SearchData } from "../../model/search/types.domain"

export type SearchRequestData = {
    uids: string[]
} & SearchData