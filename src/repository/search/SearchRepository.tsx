import { SearchResponse } from "../../model/search/SearchResponse";
import { SearchData, SourceOption } from "../../model/search/types";
import { Dashboard, DashboardFail, DashboardSuccess } from "../../model/types";
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

    // async search(searchData: SearchData): Promise<DashboardSuccess<SearchResponse> | DashboardFail> {
    async search(searchData: SearchData): Promise<Dashboard<SearchResponse>> {
        try {
            const response = await this.api.search(searchData)
            if (!response.success) return response //{success: false, message: response.message}

            const paginationRaw = response.data.pagination
            const data: SearchResponse = {
                ...response.data,
                source: {
                    index: response.data.source.index,
                    indexAlias: response.data.source.alias,
                    searchField: response.data.source.search_field,
                    dateField: response.data.source.date_field,
                    timestamp: response.data.source.timestamp ? new Date(response.data.source.timestamp * 1000) : undefined
                },
                pagination: {
                    pageSize: paginationRaw.page_size,
                    currentPage: paginationRaw.current_page,
                    totalHits: paginationRaw.total_hits,
                    totalPages: paginationRaw.total_pages
                }
            }
            return { ...response, data }
        } catch (err) {
            console.log(err)
            return err as DashboardFail //{success: false, message: 'abc'}
        }
    }

    async searchExport(searchData: SearchData) {
        try {
            const result = await this.api.searchExport(searchData)
            if (!result.success) return result
            return result
        } catch (err) {
            return err as DashboardFail
        }
    }

    async sourcesWithTimestamps(): Promise<Dashboard<SourceOption[]>> {
        try {
            const response = await this.api.sourcesWithTimestamps()
            if (!response.success) return response

            const sourceOptions: SourceOption[] = response.data.map(it => {
                const source = {
                    index: it.index,
                    indexAlias: it.index_alias,
                    timestamp: new Date(it.timestamp * 1000)
                }
                return source
            })
            return { ...response, data: sourceOptions }
        } catch (err) {
            console.log(err)
            return err as DashboardFail
        }
    }
}