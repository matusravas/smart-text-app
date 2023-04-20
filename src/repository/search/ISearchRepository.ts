import { SearchData, SearchResponse, SourceOption } from "../../model/search/types.domain"
import { Dashboard } from "../../model/types"

export default interface ISearchRepository {
    search(requestData: SearchData, uids: string[]): Promise<Dashboard<SearchResponse>>
    searchExport(requestData: SearchData): Promise<Dashboard<boolean>>
    sourcesWithTimestamps(): Promise<Dashboard<SourceOption[]>>
}