import { createSignUp } from "../api/signUp"

export const SIGNUP_START = 'SIGNUP_START'
export const SIGNUP_ERROR_MSG = 'SIGNUP_ERROR_MSG'
export const REMOVE_SIGNUP_ERROR_MSG = 'REMOVE_SIGNUP_ERROR_MSG'

const signUpStart = () => ({
    type: SIGNUP_START,
    payload: {
        errMsg: null,
        isProcessing: true,
    }
})

const setErrorMessage = errMsg => ({
    type: SIGNUP_ERROR_MSG,
    payload: {
        isProcessing: false,
        errMsg
    }
})

export const removeFieldError = fieldName => ({
    type: REMOVE_SIGNUP_ERROR_MSG,
    fieldName
})


/**
 * User SignUp Call
 * @param {*} data 
 */
export const signUp = (data) => async (dispatch) => {
    try {
        dispatch(signUpStart())
        const resp = await createSignUp(data)
        if (!!resp && !!resp.success) {
            alert(resp.message)
            return true
        }
        else {
            if(!!resp.message) {
                alert(resp.message)
            }
            const errorBag = !!resp && !!resp.error ? resp.error : { otherError: resp.message }
            dispatch(setErrorMessage(errorBag))
            return false
        }
    } catch (error) {
        const errorBag = !!error.responseJSON && !!error.responseJSON.error ? error.responseJSON.error : (
            !!error.responseJSON && !!error.responseJSON[0] ? { otherError: error.responseJSON[0] } : {}
        )
        dispatch(setErrorMessage(errorBag))
        return false
    }
}