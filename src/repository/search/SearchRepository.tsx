import { Search, Pagination, Date } from "../../model/search/types";
import SearchApiService from "../../services/search/SearchApiService";
import ISearchRepository from "./model/ISearchRepository";

export default class SearchRepository implements ISearchRepository {
    private static _instance: SearchRepository
    private api: SearchApiService
    private constructor() {
        this.api = new SearchApiService()
    }
    static getInstance(): SearchRepository {
        return this._instance || (this._instance = new this());
    }

    async search(search: Search, pagination: Pagination, date: Date) {
        const response = await this.api.search(search, pagination, date)
        return response.data
    }
    async searchExport(search: Search, date: Date) {
        return await this.api.searchExport(search, date)
    }

}