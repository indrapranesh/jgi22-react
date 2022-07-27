import { SET_LOADING } from "./action-types"

export const setLoading = (data) => {
    return({
        type: SET_LOADING,
        payload: {loading: data}
    })
}