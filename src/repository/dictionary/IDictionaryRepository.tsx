import { Dictionary } from "../../model/dictionary/types"
import { Dashboard, Response, ResponseDelete, ResponseUpsert } from "../../model/types"

export default interface IDictionaryRepository {
    getSynonyms(keyword?: string): Promise<Dashboard<Dictionary[]>>
    upsert(dictionary: Dictionary): Promise<Dashboard<ResponseUpsert<Dictionary>>>
    removeKeyword(keyword: string): Promise<Dashboard<ResponseDelete>>
}