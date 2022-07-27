import { SET_LOGIN } from "./action-types"

export const setIsLoggedIn = (data) => {
    return ({
        type: SET_LOGIN,
        payload: {
            isLoggedIn: data.isLoggedIn
        }
    })
}