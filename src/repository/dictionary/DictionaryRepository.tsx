import { Dictionary } from "../../model/dictionary/types";
import { Response, ResponseDelete, ResponseUpsert } from "../../model/types";
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

    async getSynonyms(): Promise<Response<Dictionary[]>> {
        const response = await (this.api.getAllKeywordsWithSynonyms())
        return response
    }
    async upsert(dictionary: Dictionary): Promise<ResponseUpsert<Dictionary>> {
        dictionary.synonyms = dictionary.synonyms.filter((item, index) => {
            return dictionary.synonyms.indexOf(item) === index;
        });
        return await this.api.upsert(dictionary)
    }
    async removeKeyword(keyword: string): Promise<ResponseDelete> {
        return await this.api.removeKeyword(keyword)
    }

}