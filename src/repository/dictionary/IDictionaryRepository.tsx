import { Dictionary } from "../../model/dictionary/types"

export default interface IDictionaryRepository {
    getSynonyms(keyword?: string): Promise<Array<Dictionary>|Dictionary>
    upsert(dictionary: Dictionary): Promise<any>
    upsertSynonymsForKeyword(keyword: string, synonyms: any): Promise<any>
    removeKeyword(keyword: string): Promise<any>
}