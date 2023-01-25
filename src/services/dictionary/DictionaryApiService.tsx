import axios from "axios";
import { Dictionary } from "../../model/dictionary/types";
import { Response, ResponseDelete, ResponseUpsert } from "../../model/types";
import ApiService from "../ApiService";
import IDictionaryApiService from "./IDictionaryApiService";

class DictionaryApiService extends ApiService implements IDictionaryApiService {
    constructor() {
        super()
        this.ucPrefix = 'dictionary'
    }
    getAllKeywordsWithSynonyms(): Promise<Response<Dictionary[]>> {
        return new Promise<Response<Dictionary[]>>((resolve, reject) => axios({
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
                reject({ok: false , message: 'Unable to fetch data'})
            })
        )
    }
    upsert(dictionary: Dictionary): Promise<ResponseUpsert<Dictionary>> {
        return new Promise<ResponseUpsert<Dictionary>>((resolve, reject) => axios({
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
                console.log(res)
                const data = res.data
                resolve({ ok: data.ok, id: data.id, result: data.result,
                     data: data.data, version: data.version })
            }).catch(err => {
                console.error(err)
                reject({ok: false, result: 'Unable upsert data'})
            })
        )
    }
    removeKeyword(keyword: string): Promise<ResponseDelete> {
        return new Promise<ResponseDelete>((resolve, reject) => axios({
            method: 'DELETE',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/${keyword}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            }).then(res => {
                const data = res.data
                resolve({ ok: data.ok, id: data.id, result: data.result });
            }).catch(err => {
                console.error(err)
                reject({ok: false, result: 'Unable to remove data'})
            })
        )
    }

}

export default DictionaryApiService