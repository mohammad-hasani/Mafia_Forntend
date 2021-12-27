import 
    {REQUEST,
    GET_ROLES,
    FAILURE}
from './types'

const initialState = {
    loading: false,
    payload: undefined,
    roles: []
}

export const gameReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ROLES:
            console.log("AAAAAAAA");
            console.log(action.roles);
            return {
                ...state,
                loading: true,
                roles: action.roles,
                error: ''
            }
        case FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        default:
            return state;
    }
}