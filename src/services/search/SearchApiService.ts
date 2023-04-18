import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { SearchResponseRaw, SourceFileRaw, SourceOptionRaw } from "../../model/search/SearchResponse";
import { SearchData } from "../../model/search/types";
import { ApiResponse } from "../../model/types";
import ApiService from "../ApiService";
import ISearchApiService from "./ISearchApiService";
import { createQueryParamsString } from "./helpers";

class SearchApiService extends ApiService implements ISearchApiService {
    constructor() {
        super()
        this.ucPrefix = 'search'
    }

    async search({ source, searchPhrase, searchOperator, keywords, dateRange, pagination }: SearchData) {
        const sourceQueryString = `source=${source.index}`
        const searchQueryString = `phrase=${searchPhrase}&operator=${searchOperator}${source.searchField ? `&search-field=${source.searchField}` : ''}`
        const keywordQueryString = `use-keywords=${keywords}`
        const paginationQueryString = `page=${pagination.currentPage}&pageSize=${pagination.pageSize}`
        const dateQueryString = dateRange.from && dateRange.to 
            ? `date-from=${dateRange.from?.getTime()}&date-to=${dateRange.to?.getTime()}${source.dateField ? `&date-field=${source.dateField}` : ''}`
            : undefined
        const queryParamsString = createQueryParamsString(sourceQueryString, searchQueryString, dateQueryString
            , paginationQueryString, keywordQueryString)
        return new Promise<ApiResponse<SearchResponseRaw>>((resolve, reject) => axios({
            method: 'POST',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/?${queryParamsString}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                // uids: source.uids
            }
        }).then((res: AxiosResponse) => {
            resolve(this.onResponse<SearchResponseRaw>(res))
        }).catch((err: AxiosError) => {
            reject(this.onError(err))
        })
        )
    }
    searchExport({ source, searchPhrase, searchOperator, keywords, dateRange }: SearchData): Promise<ApiResponse<boolean>> {
        const sourceQueryString = `source=${source.index}`
        const searchQueryString = `phrase=${searchPhrase}&operator=${searchOperator}${source.searchField ? `&search-field=${source.searchField}` : ''}`
        const keywordQueryString = `use-keywords=${keywords}`
        const dateQueryString = dateRange.from && dateRange.to 
            ? `date-from=${dateRange.from?.getTime()}&date-to=${dateRange.to?.getTime()}${source.dateField ? `&date-field=${source.dateField}` : ''}`
            : undefined
        const queryParamsString = createQueryParamsString(sourceQueryString
            , searchQueryString, dateQueryString, keywordQueryString)
        return new Promise<ApiResponse<boolean>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/export?${queryParamsString}`,
            responseType: 'arraybuffer',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            const filename = `${searchPhrase ? `${searchPhrase}_` : ''}${source.alias}_${moment().format('YYYY-MM-DDTHH-mm')}.xlsx`
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/xlsx;' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
            resolve(this.onResponse<boolean>(res))
        }).catch((err: AxiosError) => {
            reject(this.onError(err))
        })
        )
    }
    sourcesWithTimestamps(): Promise<ApiResponse<SourceOptionRaw[]>> {
        return new Promise<ApiResponse<SourceOptionRaw[]>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/indices-timestamps`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            resolve(this.onResponse<SourceOptionRaw[]>(res))
        }).catch((err: AxiosError) => {
            reject(this.onError(err))
        })
        )
    }
    sourceFiles(index: string): Promise<ApiResponse<SourceFileRaw[]>> {
        return new Promise<ApiResponse<SourceFileRaw[]>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/source-files/${index}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            resolve(this.onResponse<SourceFileRaw[]>(res))
        }).catch((err: AxiosError) => {
            reject(this.onError(err))
        })
        )
    }
}

export default SearchApiService