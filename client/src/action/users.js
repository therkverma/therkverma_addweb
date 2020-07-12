import { fetchAllUsers } from '../api/user'

export const HANDLE_PROCESSING = 'HANDLE_PROCESSING'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

const handleProcessing = status => ({
    type: HANDLE_PROCESSING,
    payload: {
        isProcessing: status,
    }
})

const fetchUsersSuccess = res => ({
    type: FETCH_USERS_SUCCESS,
    payload: {
        isProcessing: false,
        users: res.rows,
        total: res.count || 0
    }
})

const fetchUsersError = error => ({
    type: FETCH_USERS_ERROR,
    payload: {
        isProcessing: false,
        error
    }
})

/**
 * Fetch Pages
 * @param {*} query 
 */
export const fetchUsers = (query = {}) => async (dispatch) => {
    try {
        dispatch(handleProcessing(true))
        const resp = await fetchAllUsers(query)
        if (!!resp && !!resp.success) {
            dispatch(fetchUsersSuccess(resp))
            return true
        }
        else {
            const errorBag = !!resp && !!resp.error ? resp.error : { otherError: resp.message }
            dispatch(fetchUsersError(errorBag))
            return false
        }
    } catch (error) {
        const errorBag = !!error.responseJSON && !!error.responseJSON.error ? error.responseJSON.error : (
            !!error.responseJSON && !!error.responseJSON[0] ? { otherError: error.responseJSON[0] } : {}
        )
        dispatch(fetchUsersError(errorBag))
        return false
    }
}