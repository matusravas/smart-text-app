import { Dictionary } from "../../model/dictionary/types";
import DictionaryApiService from "../../services/dictionary/DictionaryApiService";
import IDictionaryRepository from "./IDictionaryRepository";

export default class DictionaryRepository implements IDictionaryRepository {
    private static _instance: DictionaryRepository
    private api: DictionaryApiService
    private constructor() {
        this.api = new DictionaryApiService()
    }
    static getInstance(): DictionaryRepository {
        return this._instance || (this._instance = new this());
    }

    async getSynonyms(keyword?: string): Promise<Array<Dictionary> | Dictionary> {
        const response = await (keyword
            ? this.api.getAllSynonymsForKeyword(keyword) 
            : this.api.getAllKeywordsWithSynonyms())
        return response.data
    }
    async upsert(dictionary: Dictionary): Promise<any> {
        dictionary.synonyms = dictionary.synonyms.filter((item, index) => {
            return dictionary.synonyms.indexOf(item) === index;
        });
        return await this.api.upsert(dictionary)
    }
    async upsertSynonymsForKeyword(keyword: string, synonyms: any): Promise<any> {
        return await this.api.upsertSynonymsForKeyword(keyword, synonyms)
    }
    async removeKeyword(keyword: string): Promise<any> {
        return await this.api.removeKeyword(keyword)
    }

}