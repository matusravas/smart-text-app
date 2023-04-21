import { SearchData, SearchResponse, SourceFile, SourceOption } from "../../model/search/types.domain";
import { Dashboard, DashboardFail } from "../../model/types";
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
                    // uids: searchData.source.uids,
                    index: response.data.source.index,
                    alias: response.data.source.alias,
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
            console.log({ ...response, data })
            return { 
                ...response
                , data 
            }
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
                switch(it.type) {
                    case "file": {
                        const source: SourceOption = {
                            type: it.type,
                            index: it.index,
                            alias: it.alias,
                            timestamp: new Date(it.timestamp * 1000),
                            uids: it.files.length > 0 ? [it.files[0].uid] : []
                        }
                        return source
                    }
                    case "db": {
                        const source: SourceOption = {
                            type: it.type,
                            index: it.index,
                            alias: it.alias,
                            timestamp: new Date(it.timestamp * 1000),
                        }
                        return source
                    }
                }
            })
            return { 
                ...response
                , data: sourceOptions
             }
        } catch (err) {
            console.log(err)
            return err as DashboardFail
        }
    }

    async sourceFiles(sourceIndex: string): Promise<Dashboard<SourceFile[]>> {
        try {
            const response = await this.api.sourcesWithTimestamps(sourceIndex)
            if (!response.success) return response
            const sourceFiles: SourceFile[] = response.data[0].files.map(it => {
                const sourceFile: SourceFile = {
                    ...it
                    ,ctime: new Date(it.ctime * 1000)
                    ,rtime: new Date(it.rtime * 1000)
                }
                return sourceFile
            })
            
            return { 
                ...response
                , data: sourceFiles 
            }
        } catch (err) {
            console.log(err)
            return err as DashboardFail
        }
    }
    
    async source(index: string): Promise<Dashboard<SourceOption>> {
        try {
            const response = await this.api.sourcesWithTimestamps(index)
            console.log(response)
            if (!response.success) return response

            const {files, ...source} = response.data[0]
            const uids: string[] = files.map(it => {
                return it.uid
            })
            return { 
                ...response
                , data: {
                        ...source
                        , timestamp: new Date(source.timestamp * 1000)
                        , uids: [uids[0]]
                    } 
            }
        } catch (err) {
            console.log(err)
            return err as DashboardFail
        }
    }

    async deleteSource(sourceIndex: string): Promise<Dashboard<boolean>> {
        try {
            const result = await this.api.deleteSource(sourceIndex)
            if (!result.success) return result
            return {data: result.data, success: true}
        } catch (err) {
            return err as DashboardFail
        }
    }
}