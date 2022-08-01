import { SET_DOCUSIGN_LOGIN, SET_ESRI_LOGIN, SET_MEDIAVALET_LOGIN } from "../actions/action-types";


const initialState = {
	docusign: false,
    esri: false,
    mediavalet: false
};

const integration = (state = initialState, action) => {
	switch (action.type) {
        case SET_DOCUSIGN_LOGIN:
            return {...state, docusign: action.payload}
        case SET_MEDIAVALET_LOGIN:
            return {...state, mediavalet: action.payload}
        case SET_ESRI_LOGIN:
            return {...state, esri: action.payload}
        default:
            return state;
	}
};

export default integration;