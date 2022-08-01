import { SET_DOCUSIGN_LOGIN, SET_ESRI_LOGIN, SET_MEDIAVALET_LOGIN } from "./action-types"

export const setDocusignLogin = (data) => {
    return ({
        type: SET_DOCUSIGN_LOGIN,
        payload: {
            docusign: data.login
        }
    })
}

export const setEsriLogin = (data) => {
    return ({
        type: SET_ESRI_LOGIN,
        payload: {
            esri: data.login
        }
    })
}

export const setMediavaletLogin = (data) => {
    return ({
        type: SET_MEDIAVALET_LOGIN,
        payload: {
            mediavalet: data.login
        }
    })
}