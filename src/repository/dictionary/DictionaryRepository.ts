import { Dictionary } from "../../model/dictionary/types";
import { Dashboard, ResponseDelete, ResponseUpsert } from "../../model/types";
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

    async getSynonyms(): Promise<Dashboard<Dictionary[]>> {
        const response = await this.api.getAllKeywordsWithSynonyms()
        return response
        // try {
        //     const response = await this.api.getAllKeywordsWithSynonyms()
        //     return response
        // } catch (err) {
        //     return err as DashboardFail
        // }
    }
    async upsert(dictionary: Dictionary): Promise<Dashboard<ResponseUpsert<Dictionary>>> {
        // removing duplicates
        dictionary.synonyms = dictionary.synonyms.filter((item, index) => {
            return dictionary.synonyms.indexOf(item) === index;
        });
        const response = await this.api.upsert(dictionary)
        return response
        // try {
        //     const response = await this.api.upsert(dictionary)
        //     return response
        // } catch (err) {
        //     return err as DashboardFail
        // }
    }
    async removeKeyword(keyword: string): Promise<Dashboard<ResponseDelete>> {
        return await this.api.removeKeyword(keyword)
        // try {
        //     const response = await this.api.removeKeyword(keyword)
        //     return response
        // } catch (err) {
        //     return err as DashboardFail
        // }
    }

}