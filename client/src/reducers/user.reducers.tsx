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
    user: {},
    userInfo: {},
    error: ''
}

const userReducer = (state = initialState, action: UserActions) => {
    switch (action.type) {
        // user details
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }

        // user profile update
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        // get users
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        // delete user
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        // update user
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}


export default userReducer;