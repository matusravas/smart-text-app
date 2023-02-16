import axios from "axios";
import moment from "moment";
import { SearchResponseRaw } from "../../model/search/SearchResponse";
import { SearchData, SourceOptionRaw } from "../../model/search/types";
import { Response } from "../../model/types";
import ApiService from "../ApiService";
import ISearchApiService from "./ISearchApiService";

class SearchApiService extends ApiService implements ISearchApiService {
    constructor() {
        super()
        this.ucPrefix = 'search'
        console.log(this)
    }
    search({source, search, isKeywords, dateRange: date, pagination}: SearchData): Promise<Response<SearchResponseRaw>> {
        const sourceQueryString = `source=${source.index}`
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${source.searchField ? `&search-field=${source.searchField}` : ''}`
        const keywordQueryString = `use-keywords=${isKeywords}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${source.dateField ? `&date-field=${source.dateField}` : ''}`
        const paginationQueryString = `page=${pagination.currentPage}&pageSize=${pagination.pageSize}`
        const queryString = `${sourceQueryString}&${searchQueryString}&${dateQueryString}&${paginationQueryString}&${keywordQueryString}`
        return new Promise<Response<SearchResponseRaw>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/?${queryString}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            resolve({ ok: res.data.ok, data: res.data.data })
        }).catch(err => {
            console.error(err)
            reject({ok: false, message: 'Unable to fetch data'})
        })
        )
    }
    searchExport({source, search, isKeywords, dateRange: date}: SearchData): Promise<boolean> {
        const sourceQueryString = `source=${source.index}`
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${source.searchField ? `&search-field=${source.searchField}` : ''}`
        const keywordQueryString = `use-keywords=${isKeywords}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${source.dateField ? `&date-field=${source.dateField}` : ''}`
        const queryString = `${sourceQueryString}&${searchQueryString}&${dateQueryString}&${keywordQueryString}`
        return new Promise<boolean>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/export?${queryString}`,
            responseType: 'arraybuffer',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const filename = `${search.phrase ? `${search.phrase}_` : ''}${source.indexAlias}_${moment().format('YYYY-MM-DDTHH-mm')}.xlsx`
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/xlsx;' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
            resolve(true)
        }).catch(err => {
            console.error(err)
            reject(false)
        })
        )
    }
    sourcesWithTimestamps(): Promise<Response<SourceOptionRaw[]>> {
        return new Promise<Response<SourceOptionRaw[]>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/indices-timestamps`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            resolve({ok: true, data: res.data.data})
        }).catch(err => {
            console.error(err)
            reject({ok: false, message: 'Unable to obtain last timestamp'})
        })
        )
    }
}

export default SearchApiService