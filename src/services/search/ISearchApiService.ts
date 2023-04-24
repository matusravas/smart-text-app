import { SearchResponseRaw, SourceUIDsRaw } from "../../model/search/types.api"
import { SearchData } from "../../model/search/types.domain"
import { ApiResponse } from "../../model/types"

export default interface ISearchApiService {
    search(searchData: SearchData): Promise<ApiResponse<SearchResponseRaw>>
    searchExport(searchData: SearchData): Promise<ApiResponse<boolean>>
    sourcesWithTimestamps(sourceIndex?: string): Promise<ApiResponse<SourceUIDsRaw[]>>
}