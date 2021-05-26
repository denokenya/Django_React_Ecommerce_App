import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from 'constants/user.constants';
import { UserActions, UserState } from 'interfaces/user.interfaces';

const initialState: UserState = {
    success: false,
    loading: false,
    users: [],
    user: null,
    error: ''
}

const userReducer = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        // user details
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { ...state, user: null }

        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                success: true, 
                user: action.payload 
            }
        case USER_UPDATE_PROFILE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return { ...state }

        case USER_LIST_REQUEST:
            return { ...state, loading: true }
        case USER_LIST_SUCCESS:
            return { ...state, loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { ...state }

        case USER_DELETE_REQUEST:
            return { ...state, loading: true }
        case USER_DELETE_SUCCESS:
            return { ...state, loading: false, success: true }
        case USER_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case USER_UPDATE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { ...state }

        default:
            return state
    }
}


export default userReducer;