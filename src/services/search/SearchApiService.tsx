import axios from "axios";
import moment from "moment";
import { SearchResponseRaw } from "../../model/search/SearchResponse";
import { Search, Date, Pagination } from "../../model/search/types";
import { Response } from "../../model/types";
import ApiService from "../ApiService";
import ISearchApiService from "./ISearchApiService";

class SearchApiService extends ApiService implements ISearchApiService {
    constructor() {
        super()
        this.ucPrefix = 'search'
        console.log(this)
    }
    search(search: Search, pagination: Pagination, date: Date): Promise<Response<SearchResponseRaw>> {
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${search.field ? `&search-field=${search.field}` : ''}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${date.field ? `&date-field=${date.field}` : ''}`
        const paginationQueryString = `page=${pagination.currentPage}&pageSize=${pagination.pageSize}`
        const queryString = `${searchQueryString}&${dateQueryString}&${paginationQueryString}`
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
    searchExport(search: Search, date: Date): Promise<boolean> {
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${search.field ? `&search-field=${search.field}` : ''}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${date.field ? `&date-field=${date.field}` : ''}`
        const queryString = `${searchQueryString}&${dateQueryString}`
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
            const filename = `${search.phrase?`${search.phrase}_`:''}export_${moment().format('YYYY-MM-DDTHH-mm')}.xlsx`
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
    lastTimestamp(): Promise<Response<number>> {
        return new Promise<Response<number>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/timestamp`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            resolve({ok: true, data: res.data.data.timestamp})
        }).catch(err => {
            console.error(err)
            reject({ok: false, message: 'Unable to obtain last timestamp'})
        })
        )
    }
}

export default SearchApiService