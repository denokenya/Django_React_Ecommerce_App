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
    userInfo: undefined,
    loading: false,
    error: ''
}

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true }

        case LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case REGISTER_REQUEST:
            return { loading: true }

        case REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case LOGOUT:
            return {}

        default:
            return state
    }
}

export default authReducer;