import { UCPrefix } from "./IApiService";

class ApiService {
    constructor(
        protected baseUrl = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5000',
        protected apiPrefix = process.env.REACT_APP_API_PREFIX ?? 'api/v1',
        protected ucPrefix: UCPrefix = 'foo'
    ) {}
}


export default ApiService