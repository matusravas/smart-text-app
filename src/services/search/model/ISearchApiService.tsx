import { SearchResponse } from "../../../model/search/SearchResponse"
import { Search, Date, Pagination } from "../../../model/search/types"
import { Response } from "../../../model/types"

export default interface ISearchApiService {
    search(search: Search, pagination: Pagination, date: Date): Promise<Response<SearchResponse>>
    searchExport(search: Search, date: Date): Promise<Response<any>>
}