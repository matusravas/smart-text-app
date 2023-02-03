import { SearchResponse } from "../../model/search/SearchResponse"
import { Date, Search, SearchData, Pagination } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchData): Promise<SearchResponse>
    searchExport(requestData: SearchData): Promise<boolean>
    lastTimestamp(): Promise<number>
}