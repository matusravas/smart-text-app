import { SearchResponseRaw, SourceOptionRaw } from "../../model/search/SearchResponse"
import { SearchData } from "../../model/search/types"
import { Response } from "../../model/types"

export default interface ISearchApiService {
    search(searchData: SearchData): Promise<Response<SearchResponseRaw>>
    searchExport(searchData: SearchData): Promise<boolean>
    sourcesWithTimestamps(): Promise<Response<SourceOptionRaw[]>>
}