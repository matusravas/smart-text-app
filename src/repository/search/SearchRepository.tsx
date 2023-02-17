import { SearchResponse } from "../../model/search/SearchResponse";
import { SearchData, SourceOption } from "../../model/search/types";
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
        const paginationRaw = responseRaw.data.pagination
        const response: SearchResponse = {
            ...responseRaw.data,
            source: {
                index: responseRaw.data.source.index,
                indexAlias: responseRaw.data.source.alias,
                searchField: responseRaw.data.source.search_field,
                dateField: responseRaw.data.source.date_field,
                timestamp:  responseRaw.data.source.timestamp ? new Date(responseRaw.data.source.timestamp*1000) : undefined
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

    async sourcesWithTimestamps() {
        //! Todo catch potenial errors
        const responseRaw = await this.api.sourcesWithTimestamps()
        console.log(responseRaw)
        const response: SourceOption[] = responseRaw.data.map(it=>{
            const source = {
                index: it.index, 
                indexAlias: it.index_alias,
                timestamp: new Date(it.timestamp*1000)
            }
            return source
        })
        return response
    }
}