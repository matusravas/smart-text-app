export default interface IApiService {
    baseUrl: string,
    apiPrefix: string,
    ucPrefix: UCPrefix
}

export type UCPrefix = 'foo' | 'search' | 'dictionary'