import { ACTIONS } from './actions'; 

export default function reducer(state, action) { 
    switch (action.type) {
        case ACTIONS.SET_LANGUAGES: return { ...state, languages: action.payload };
        case ACTIONS.SET_USER_LANGUAGE: return { ...state, userLanguage: action.payload };
        case ACTIONS.SET_LOADING: return { ...state, isLoading: action.payload };
        case ACTIONS.SET_NETWORK_ERRORS: return { ...state, networkError: action.payload };
        case ACTIONS.SET_COMPILING: return { ...state, isCompiling: action.payload};
        case ACTIONS.SET_USER_OUTPUT: return { ...state, userOutput: action.payload};
        default: return state;
    } 
}; 