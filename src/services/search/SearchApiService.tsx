import axios from "axios";
import { SearchResponse, SearchResponseRaw } from "../../model/search/SearchResponse";
import { Search, Date, Pagination } from "../../model/search/types";
import { Response } from "../../model/types";
import ApiService from "../ApiService";
import ISearchApiService from "./model/ISearchApiService";

class SearchApiService extends ApiService implements ISearchApiService {
    constructor() {
        super()
        this.ucPrefix = 'search'
        console.log(this)
    }
    search(search: Search, pagination: Pagination, date: Date): Promise<Response<SearchResponseRaw>> {
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${search.field ? `&search-field=${search.field}` : ''}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${date.field ? `&date-field=${date.field}` : ''}`
        const paginationQueryString = `page=${pagination.currentPage}&step=${pagination.pageSize}`
        const queryString = `${searchQueryString}&${dateQueryString}&${paginationQueryString}`
        return new Promise<Response<any>>((resolve, reject) => axios({
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
            reject('Unable to fetch data')
        })
        )
    }
    searchExport(search: Search, date: Date): Promise<Response<any>> {
        const searchQueryString = `phrase=${search.phrase}&operator=${search.operator}${search.field ? `&search-field=${search.field}` : ''}`
        const dateQueryString = `date-from=${date.from}&date-to=${date.to}${date.field ? `&date-field=${date.field}` : ''}`
        const queryString = `${searchQueryString}&${dateQueryString}`
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}?${queryString}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data)
            resolve({ ok: res.data.ok, data: res.data.data })
        }).catch(err => {
            console.error(err)
            reject('Unable to fetch data')
        })
        )
    }

}

export default SearchApiService