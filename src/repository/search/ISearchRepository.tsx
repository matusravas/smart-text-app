import { SearchResponse } from "../../model/search/SearchResponse"
import { Search, Date, Pagination, SearchRequest } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchRequest): Promise<SearchResponse>
    searchExport(search: Search, date: Date): any
}