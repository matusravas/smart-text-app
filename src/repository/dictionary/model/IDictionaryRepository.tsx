import { Dictionary } from "../../../model/dictionary/types"


export default interface IDictionaryRepository {
    getSynonyms(keyword?: string): Promise<Array<Dictionary>|Dictionary>
    upsertSynonymsForKeyword(keyword: string, synonyms: any): Promise<any>
    removeKeyword(keyword: string): Promise<any>
}