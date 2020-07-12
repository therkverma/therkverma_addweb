export const errorCodes = {
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

export const SESSION_SECRET = 'repozitory';
export const SESSION_AGE = 5 * 60 * 1000; // 5 Minutes

export const PORT = 4000