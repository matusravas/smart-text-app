import axios, { AxiosError, AxiosResponse } from "axios";
import { Dictionary } from "../../model/dictionary/types";
import { ApiResponse, ResponseDelete, ResponseUpsert } from "../../model/types";
import ApiService from "../ApiService";
import IDictionaryApiService from "./IDictionaryApiService";

class DictionaryApiService extends ApiService implements IDictionaryApiService {
    constructor() {
        super()
        this.ucPrefix = 'dictionary'
    }
    getAllKeywordsWithSynonyms(): Promise<ApiResponse<Dictionary[]>> {
        return new Promise<ApiResponse<Dictionary[]>>((resolve, reject) => axios({
            method: 'GET',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            }).then((res: AxiosResponse<Dictionary[]>) => {
                resolve(this.onResponse(res))
            }).catch((err: AxiosError) => {
                reject(this.onError(err))
            })
        )
    }
    upsert(dictionary: Dictionary): Promise<ApiResponse<ResponseUpsert<Dictionary>>> {
        return new Promise<ApiResponse<ResponseUpsert<Dictionary>>>((resolve, reject) => axios({
            method: 'POST',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/upsert`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: dictionary
            }).then((res: AxiosResponse) => {
                // resolve({ ok: data.ok, id: data.id, result: data.result,
                //      data: data.data, version: data.version })
                resolve(this.onResponse(res))
            }).catch((err: AxiosError) => {
                reject(this.onError(err))
            })
        )
    }
    removeKeyword(keyword: string): Promise<ApiResponse<ResponseDelete>> {
        return new Promise<ApiResponse<ResponseDelete>>((resolve, reject) => axios({
            method: 'DELETE',
            url: `${this.baseUrl}/${this.apiPrefix}/${this.ucPrefix}/${keyword}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            }).then((res: AxiosResponse) => {
                // const data = res.data
                // resolve({ ok: data.ok, id: data.id, result: data.result });
                resolve(this.onResponse(res))
            }).catch((err: AxiosError) => {
                reject(this.onError(err))
            })
        )
    }

}

export default DictionaryApiService