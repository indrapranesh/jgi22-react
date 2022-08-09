import { SET_CATEGORIES } from "./action-types"

export const setCategories = (data) => {
    console.log(data)
    return ({
        type: SET_CATEGORIES,
        payload: {
            category: data
        }
    })
}