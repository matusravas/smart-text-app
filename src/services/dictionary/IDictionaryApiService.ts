import { Dictionary } from "../../model/dictionary/types"
import { ApiResponse, ResponseDelete, ResponseUpsert } from "../../model/types"

export default interface IDictionaryApiService {
    getAllKeywordsWithSynonyms(): Promise<ApiResponse<Dictionary[]>>
    upsert(dictionary: Dictionary): Promise<ApiResponse<ResponseUpsert<Dictionary>>>
    removeKeyword(keyword: string): Promise<ApiResponse<ResponseDelete>>
}