import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from 'constants/auth.constants';
import { AuthActions, AuthState } from 'interfaces/auth.interfaces';

const initialState: AuthState = {
    isAuth: false,
    loggedInUser: null,
    authLoading: false,
    authError: ''
}

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { 
                ...state,
                loading: true
             }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case REGISTER_REQUEST:
            return { 
                ...state,
                loading: true 
            }

        case REGISTER_SUCCESS:
            return {
                loading: false,
                isAuth: true,
                userInfo: action.payload
            }

        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                isAuth: false
            }

        default:
            return state
    }
}

export default authReducer;