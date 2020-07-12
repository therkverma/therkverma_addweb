import { fetchLogin, fetchAuth, logoutAuth } from '../api/auth'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_ERROR_MSG = 'LOGIN_ERROR_MSG'
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FALSE = 'LOGIN_AUTH_FALSE'
export const REMOVE_LOGIN_ERROR_MSG = 'REMOVE_LOGIN_ERROR_MSG'

export const authentication = () => {
    let expireDate = localStorage.getItem("expirydate")
    const token = localStorage.getItem('token')
    if (expireDate && token !== undefined && token !== null && expireDate > Date.now()) {
        return true
    }
    expireDate = new Date(Number(expireDate))
    localStorage.removeItem('token')
    localStorage.removeItem('expirydate')
    return false
}

const loginStart = () => ({
    type: LOGIN_START,
    payload: {
        errMsg: null,
        isProcessing: true,
    }
})

const setErrorMessage = errMsg => ({
    type: LOGIN_ERROR_MSG,
    payload: {
        loginAuthSuccess: false,
        isProcessing: false,
        errMsg
    }
})

const loginAuthSuccess = user => ({
    type: LOGIN_AUTH_SUCCESS,
    payload: {
        loginAuthSuccess: true,
        isProcessing: false,
        user
    }
})

const loginAuthFalse = () => ({
    type: LOGIN_AUTH_FALSE,
    payload: {
        loginAuthSuccess: false,
        user: {}
    }
})

export const removeFieldError = fieldName => ({
    type: REMOVE_LOGIN_ERROR_MSG,
    fieldName
})


/**
 * User Login Call
 * @param {*} data 
 */
export const login = (data) => async (dispatch) => {
    try {
        dispatch(loginStart())
        const resp = await fetchLogin(data)
        if (!!resp && !!resp.success && !!resp.token) {
            localStorage.setItem('token', resp.token)
            var now = new Date()
            var expireDate = now.setDate(now.getDate() + 1) // 1 day
            localStorage.setItem('expirydate', expireDate.toString())
            return dispatch(loginAuthSuccess(resp.data))
        }
        else {
            const errorBag = !!resp && !!resp.error ? resp.error : { otherError: resp.message }
            return dispatch(setErrorMessage(errorBag))
        }
    } catch (error) {
        const errorBag = !!error.responseJSON && !!error.responseJSON.error ? error.responseJSON.error : (
            !!error.responseJSON && !!error.responseJSON[0] ? { otherError: error.responseJSON[0] } : {}
        )
        return dispatch(setErrorMessage(errorBag))
    }
}


/**
 * Fetch logged in
 * user's info
 * @param {*} history 
 */
export const fetchAuthInfo = history => async (dispatch) => {
    try {
        const response = await fetchAuth()
        if (!!response && response.success && !!response.data) {
            return dispatch(loginAuthSuccess(response.data))
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('expirydate');
            dispatch(loginAuthFalse())
            history.push('/login')
        }
    } catch (error) {
        console.log("Fetch Auth Error: ", error)
    }
}


/**
 * Logout and redirect
 * @param {*} history 
 */
export const logoutUser = (history) => async (dispatch) => {
    try {
        const resp = await logoutAuth()
        if (!!resp && !!resp.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirydate');
            dispatch(loginAuthFalse())
            history.push('/login')
        }
    } catch (error) {
        console.log("Logout Error: ", error)
        return false
    }
}