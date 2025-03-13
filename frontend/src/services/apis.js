
const BASE_URL = "http://localhost:4000/api/v1"

export const authApi = {
    SIGNUP_API : `${BASE_URL}/users/register`,
    LOGIN_API : `${BASE_URL}/users/login`,
    FORGET_API : `${BASE_URL}/users/forgot-password`,
    RESET_PASSWORD : `${BASE_URL}/users/reset-password`,
    LOGOUT_API : `${BASE_URL}/users/logout`,
}

export const updateApi = {
    UPDATEPROFILE_API : `${BASE_URL}/users/update-details`,
    UPDATE_IMAGE : `${BASE_URL}/users/update-image`
}

export const concertApi = {
    ADDCONCERT_API : `${BASE_URL}/concert/add-concert`,
}