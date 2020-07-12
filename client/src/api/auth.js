import { SERVER_URL } from '../constant'

const getHeaders = () => ({
    'Authorization': localStorage.getItem("token"),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

/**
 * Fetch and validate
 * login info
 * @param {*} params 
 */
export const fetchLogin = async ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${SERVER_URL}api/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(res => res.json()).then(result => resolve(result))
        } catch (error) {
            console.log("FETCH_LOGIN ERROR: ", error.message)
            return reject(error)
        }
    })
}

/**
 * Fetch logged in
 * auth info
 */
export const fetchAuth = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${SERVER_URL}api/auth`, {
                method: 'POST',
                headers: getHeaders()
            }).then((res) => res.json()).then(result => resolve(result))
        } catch (error) {
            console.log("FETCH_AUTH ERROR: ", error)
            return reject(error)
        }
    })
}


/**
 * Logout user
 */
export const logoutAuth = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await fetch(`${SERVER_URL}api/auth/logout`)
                .then((res) => res.json())
                .then(result => resolve(result))
        } catch (error) {
            console.log("LOGOUT ERROR: ", error)
            return reject(error)
        }
    })
}