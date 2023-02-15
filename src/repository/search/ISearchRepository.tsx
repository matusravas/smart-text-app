import { IndicesTimestampsResponse } from "../../model/search/IndicesTimestampsResponse"
import { SearchResponse } from "../../model/search/SearchResponse"
import { SearchData } from "../../model/search/types"

export default interface ISearchRepository {
    search(requestData: SearchData): Promise<SearchResponse>
    searchExport(requestData: SearchData): Promise<boolean>
    indicesWithTimestamps(): Promise<IndicesTimestampsResponse>
}