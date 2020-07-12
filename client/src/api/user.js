import { SERVER_URL } from '../constant'
import { createQueryParams } from '../common/helpers'

/**
 * Fetch users
 */
export const fetchAllUsers = async (query) => {
    return new Promise(async (resolve, reject) => {
        let requestUrl = `${SERVER_URL}api/users`
        if (!!query && Object.keys(query).length > 0) {
            let paramsss = createQueryParams(query)
            requestUrl = requestUrl + '?' + paramsss
        }

        try {
            await fetch(requestUrl).then(res => res.json()).then(result => resolve(result))
        } catch (error) {
            console.log("Fetch User ERROR: ", error.message)
            return reject(error)
        }
    })
}