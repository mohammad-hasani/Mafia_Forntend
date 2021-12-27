import 
    {REQUEST,
    LOGIN_SEND_SUCCESS,
    LOGIN_SEND_SUCCESS_CONFIRM,
    LOGOUT_SEND_SUCCESS,
    PROFILE_READ_DATA,
    CHANGED,
    WITHDRAW_SEND_SUCCESS,
    CHARGE_GET_SUCCESS,
    CHARGE_POST_SUCCESS,
    GET_STREAM_SUCCESS,
    GET_PLAYER_SUCCESS,
    FAILURE}
from './types'

const initialState = {
    loading: false,
    payload: undefined,
    token:undefined,
    phonenumber: '09383411967',
    money: 0,
    score: 0,
    rank: 0,
    username: '',
    email: '',
    error:'',
    changed: '',
    stream: 'amouranth'
}

export const authenticationReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SEND_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                phonenumber: action.phonenumber,
                error: ''
            }
        case LOGIN_SEND_SUCCESS_CONFIRM:
            return {
                ...state,
                loading: false,
                token: action.token,
                error: action.payload
            }
        case LOGOUT_SEND_SUCCESS:
            return {
                ...state,
                loading: false,
                token: '',
                error: ''
            }
        case PROFILE_READ_DATA:
            return {
                ...state,
                loading: true,
                phonenumber: action.phonenumber,
                email: action.email,
                money: action.money,
                username: action.username,
                error: ''
            }
        case FAILURE:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case CHANGED:
            return {
                ...state,
                changed: action.changed
            }
        case WITHDRAW_SEND_SUCCESS:
            return {
                ...state,
                payload: action.payload
            }
        case CHARGE_GET_SUCCESS:
            return {
                ...state,
                payload: action.payload
            }
        case CHARGE_POST_SUCCESS:
            return {
                ...state
            }
        case GET_STREAM_SUCCESS:
            return {
                ...state,
                stream: action.stream
            }

        case GET_PLAYER_SUCCESS:
            return {
                ...state,
                money: action.money,
                score: action.score,
                rank: action.rank
            }

            
        default:
            return state;
    }
}