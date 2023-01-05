import { Dictionary } from "../../../model/dictionary/types"
import { Response } from "../../../model/types"

export default interface IDictionaryApiService {
    getAllKeywordsWithSynonyms(): Promise<Response<Array<Dictionary>>>
    getAllSynonymsForKeyword(keyword: string): Promise<Response<Dictionary>>
    upsertSynonymsForKeyword(keyword: string, synonyms: Array<string>): Promise<Response<any>>
    removeKeyword(keyword: string): Promise<Response<any>>
}