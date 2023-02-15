import { IndicesTimestampsResponse } from "../../model/search/IndicesTimestampsResponse";
import { SearchResponse } from "../../model/search/SearchResponse";
import { SearchData } from "../../model/search/types";
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
        // console.log(responseRaw.data)
        const paginationRaw = responseRaw.data.pagination
        const response: SearchResponse = {
            ...responseRaw.data,
            source: {
                index: responseRaw.data.source.index,
                searchField: responseRaw.data.source.search_field,
                dateField: responseRaw.data.source.date_field
            },
            pagination: {
                pageSize: paginationRaw.page_size,
                currentPage: paginationRaw.current_page,
                totalHits: paginationRaw.total_hits,
                totalPages: paginationRaw.total_pages
            }
        }
        return response
    }
    async searchExport(searchData: SearchData) {
        //! Todo catch potenial errors
        const result = await this.api.searchExport(searchData)
        return result
    }
    async indicesWithTimestamps() {
        //! Todo catch potenial errors
        const responseRaw = await this.api.indicesWithTimestamps()
        const response: IndicesTimestampsResponse = {
            maxTimestamp: responseRaw.data.max_timestamp,
            indicesTimestamps: responseRaw.data.indices_timestamps.map(it => {
                return { index: it.index, indexAlias: it.index_alias, timestamp: it.timestamp,
                searchField: it.search_field, dateField: it.date_field }
            })
        }
        return response
    }
}