import { SearchResponse } from "../../model/search/SearchResponse"
import { SearchData, SourceOption } from "../../model/search/types"
import { ApiResponse, Dashboard } from "../../model/types"

export default interface ISearchRepository {
    search(requestData: SearchData): Promise<Dashboard<SearchResponse>>
    searchExport(requestData: SearchData): Promise<Dashboard<boolean>>
    sourcesWithTimestamps(): Promise<Dashboard<SourceOption[]>>
}