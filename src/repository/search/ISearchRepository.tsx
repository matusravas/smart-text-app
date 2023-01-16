import { SearchResponse } from "../../model/search/SearchResponse"
import { Date, Search, SearchData } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchData): Promise<SearchResponse>
    searchExport(search: Search, date: Date): Promise<boolean>
    lastTimestamp(): Promise<number>
}