import { SearchResponse } from "../../model/search/SearchResponse";
import { Search, Date, SearchRequest } from "../../model/search/types";
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
        const responseRaw = await this.api.search(search, pagination, date)
        console.log(responseRaw.data)
        const paginationRaw = responseRaw.data.pagination
        const response: SearchResponse = {...responseRaw.data, 
            pagination: {...paginationRaw, 
                currentPage: paginationRaw.current_page,
                totalHits: paginationRaw.total_hits,
                totalPages: paginationRaw.total_pages
            }}
        return response
    }
    async searchExport(search: Search, date: Date) {
        return await this.api.searchExport(search, date)
    }
}