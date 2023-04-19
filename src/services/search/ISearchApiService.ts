import { SearchResponseRaw, SourceOptionRaw } from "../../model/search/SearchResponse"
import { SearchData } from "../../model/search/types"
import { ApiResponse } from "../../model/types"

export default interface ISearchApiService {
    search(searchData: SearchData): Promise<ApiResponse<SearchResponseRaw>>
    searchExport(searchData: SearchData): Promise<ApiResponse<boolean>>
    sourcesWithTimestamps(sourceIndex?: string): Promise<ApiResponse<SourceOptionRaw[]>>
}