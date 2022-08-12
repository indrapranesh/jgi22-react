import { SET_NOTIFICATIONS } from "./action-types"

export const setNotifications = (data) => {
    console.log(data)
    return ({
        type: SET_NOTIFICATIONS,
        payload: {
            notifications: data
        }
    })
}