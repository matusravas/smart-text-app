import { SearchResponse } from "../../model/search/SearchResponse"
import { SearchData, SourceOption } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchData): Promise<SearchResponse>
    searchExport(requestData: SearchData): Promise<boolean>
    sourcesWithTimestamps(): Promise<SourceOption[]>
}