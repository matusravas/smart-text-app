import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, ApiResponseFail, ApiResponseSuccess } from "../model/types";

export type UCPrefix = '' | 'search' | 'dictionary'
class ApiService {
    constructor(
        protected baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
        protected apiPrefix = process.env.REACT_APP_API_PREFIX || 'api/v1',
        protected ucPrefix: UCPrefix = ''
    ) {}

    onResponse<T= any>(res: AxiosResponse): ApiResponse<T> {
        let msg = ''
        const success = [200, 201].includes(res.status) || res.data.ok === true || false
        if (res.status === 400) msg = res.data?.message || "Unknown service error" // bad request parameters
        else if (res.status === 401) msg = 'Not authorized to access resource'
        else if (res.status === 403) msg = res.data?.message || "Unknown service error" //Forbidden or Unauthorized
        else if (res.status === 404) msg = 'Can not found requested service' 
        else if (res.status === 405) msg = 'Not allowed method' // Not allowed method
        else if (res.status === 500) msg = res.data?.message || "Unknown service error" // Internal sever error
        else if (res.status === 503) msg = res.data?.message || "Unknown service error" // bad request parameters
        else if (res.status === 504) msg = res.data?.message || "Unknown service error" // Gateway error
        else if (res.status > 405)  msg = "Unknown service error"
        return success 
            ? {success: true, data: res.data.data as T} as ApiResponseSuccess<T> 
            : {success: false, message: msg} as ApiResponseFail
    }
    
    onError(err: AxiosError): ApiResponseFail {
        return {success: false, message: err.message} as ApiResponseFail
    }
}


export default ApiService