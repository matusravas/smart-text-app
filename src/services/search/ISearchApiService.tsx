import { SearchResponseRaw, SourceOptionRaw } from "../../model/search/SearchResponse"
import { SearchData } from "../../model/search/types"
import { ApiResponse, Response } from "../../model/types"

export default interface ISearchApiService {
    search(searchData: SearchData): Promise<ApiResponse<SearchResponseRaw>>
    searchExport(searchData: SearchData): Promise<ApiResponse<boolean>>
    sourcesWithTimestamps(): Promise<ApiResponse<SourceOptionRaw[]>>
}