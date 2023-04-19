import { SearchResponse } from "../../model/search/SearchResponse"
import { SearchData, SourceOption } from "../../model/search/types"
import { Dashboard } from "../../model/types"

export default interface ISearchRepository {
    search(requestData: SearchData, uids: string[]): Promise<Dashboard<SearchResponse>>
    searchExport(requestData: SearchData): Promise<Dashboard<boolean>>
    sourcesWithTimestamps(): Promise<Dashboard<SourceOption[]>>
}