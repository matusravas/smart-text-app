import { Dictionary } from "../../model/dictionary/types"
import { Response, ResponseDelete, ResponseUpsert } from "../../model/types"

export default interface IDictionaryApiService {
    getAllKeywordsWithSynonyms(): Promise<Response<Dictionary[]>>
    upsert(dictionary: Dictionary): Promise<ResponseUpsert<Dictionary>>
    removeKeyword(keyword: string): Promise<ResponseDelete>
}