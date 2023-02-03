import { SearchResponse } from "../../model/search/SearchResponse";
import { Search, Date, SearchData, Pagination } from "../../model/search/types";
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

    async search(searchData: SearchData) {
        //! Todo catch potenial errors
        const responseRaw = await this.api.search(searchData)
        console.log(responseRaw.data)
        const paginationRaw = responseRaw.data.pagination
        const response: SearchResponse = {...responseRaw.data, 
            pagination: {
                pageSize: paginationRaw.page_size, 
                currentPage: paginationRaw.current_page,
                totalHits: paginationRaw.total_hits,
                totalPages: paginationRaw.total_pages
            }}
        return response
    }
    async searchExport(searchData: SearchData) {
        //! Todo catch potenial errors
        const result = await this.api.searchExport(searchData)
        return result
    }
    async lastTimestamp() {
            //! Todo catch potenial errors
        const response = await this.api.lastTimestamp()
        return response.data
    }
}