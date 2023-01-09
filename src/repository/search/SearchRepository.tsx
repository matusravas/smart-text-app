import { Search, Pagination, Date, SearchRequest } from "../../model/search/types";
import SearchApiService from "../../services/search/SearchApiService";
import ISearchRepository from "./ISearchRepository";

export default class SearchRepository implements ISearchRepository {
    private static _instance: SearchRepository
    private api: SearchApiService
    private constructor() {
        this.api = new SearchApiService()
    }
    static getInstance(): SearchRepository {
        return this._instance || (this._instance = new this());
    }

    async search({search, pagination, date}: SearchRequest) {
        const response = await this.api.search(search, pagination, date)
        console.log(response.data)
        return response.data
    }
    async searchExport(search: Search, date: Date) {
        return await this.api.searchExport(search, date)
    }
}