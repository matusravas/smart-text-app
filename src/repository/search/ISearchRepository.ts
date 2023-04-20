import { SearchData, SearchResponse, SourceFile, SourceOption } from "../../model/search/types.domain"
import { Dashboard } from "../../model/types"

export default interface ISearchRepository {
    search(requestData: SearchData, uids: string[]): Promise<Dashboard<SearchResponse>>
    searchExport(requestData: SearchData): Promise<Dashboard<boolean>>
    sourcesWithTimestamps(): Promise<Dashboard<SourceOption[]>>
    sourceFiles(sourceIndex: string): Promise<Dashboard<SourceFile[]>>
    source(sourceIndex: string): Promise<Dashboard<SourceOption>>
}