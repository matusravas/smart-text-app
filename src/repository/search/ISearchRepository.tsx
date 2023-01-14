import { SearchResponse } from "../../model/search/SearchResponse"
import { Date, Search, SearchRequest } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchRequest): Promise<SearchResponse>
    searchExport(search: Search, date: Date): Promise<boolean>
    lastTimestamp(): Promise<number>
}