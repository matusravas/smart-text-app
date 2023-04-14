export function createQueryParamsString(...args: (string|undefined)[]) {
    return args.filter((value, _) => value !== undefined).join('&')
}