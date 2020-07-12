/**
 * Create Query params
 * for get method requests
 * @param {*} params 
 */
export const createQueryParams = params =>
    Object.keys(params)
        .map(k => `${k}=${encodeURI(params[k])}`)
        .join('&')