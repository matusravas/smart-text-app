import { SearchResponse } from "../../../model/search/SearchResponse"
import { Search, Date, Pagination } from "../../../model/search/types"

export default interface ISearchRepository {
    search(search: Search, pagination: Pagination, date: Date): Promise<SearchResponse>
    searchExport(search: Search, date: Date): any
}