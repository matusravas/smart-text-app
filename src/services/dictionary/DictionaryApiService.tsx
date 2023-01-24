import axios from "axios";
import { Dictionary } from "../../model/dictionary/types";
import { Response } from "../../model/types";
import ApiService from "../ApiService";
import IDictionaryApiService from "./IDictionaryApiService";

class DictionaryApiService extends ApiService implements IDictionaryApiService {
    constructor() {
        super()
        this.ucPrefix = 'dictionary'
    }
    getAllKeywordsWithSynonyms(): Promise<Response<Array<Dictionary>>> {
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/`,
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
    getAllSynonymsForKeyword(keyword: string): Promise<Response<Dictionary>> {
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/${keyword}`,
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
    upsert(dictionary: Dictionary): Promise<Response<any>> {
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'POST',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/upsert`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: dictionary
            }).then(res => {
                resolve({ ok: res.data.ok, data: res.data })
            }).catch(err => {
                console.error(err)
                reject('Unable upsert data')
            })
        )
    }
    upsertSynonymsForKeyword(keyword: string, synonyms: Array<string>): Promise<Response<any>> {
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'POST',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/?${keyword}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {synonyms: synonyms}
            }).then(res => {
                resolve({ ok: res.data.ok, data: res.data })
            }).catch(err => {
                console.error(err)
                reject('Unable to fetch data')
            })
        )
    }
    removeKeyword(keyword: string): Promise<Response<any>> {
        return new Promise<Response<any>>((resolve, reject) => axios({
            method: 'DELETE',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/${keyword}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            }).then(res => {
                resolve({ ok: res.data.ok, data: res.data })
            }).catch(err => {
                console.error(err)
                reject('Unable to fetch data')
            })
        )
    }

}

export default DictionaryApiService