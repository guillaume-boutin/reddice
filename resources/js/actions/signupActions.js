import api from "../services/api";

export const userSignupRequest = (userPayload) => {
    return dispatch => {
        return api.request('users.signup', userPayload);
    }
};