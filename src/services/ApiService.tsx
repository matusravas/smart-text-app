// import IApiService, { UCPrefix } from "./IApiService"

import { UCPrefix } from "./IApiService";

class ApiService { //implements IApiService {
    // protected baseUrl: string
    // apiPrefix: string
    // ucPrefix: UCPrefix
    constructor(
        protected baseUrl = process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000',
        protected apiPrefix = process.env.REACT_APP_API_PREFIX ?? 'api/v1',
        protected ucPrefix: UCPrefix = 'foo'
    ) {
        // this.baseUrl = process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000'
        // this.apiPrefix = process.env.REACT_APP_API_PREFIX ?? 'api/v1'
        // this.ucPrefix = ''
    }
}


export default ApiService