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
    user: null,
    error: '',
    loading: false,
};

export const authReducer =  (state = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST: 
        case REGISTER_REQUEST:
            return { ...state, loading: true };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                user: action.payload,
                isAuth: true
            };
            
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            return { ...state, isAuth: false, user: null };
        default:
            return state
    }
}

