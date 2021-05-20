import { auth_constants } from 'constants/auth.constants';
import { AuthActions } from 'interfaces/auth.interfaces';

const initialState = {
    userInfo: {},
    loading: false,
    user: {}
}

export const authReducer = (state = {}, action: AuthActions) => {
    switch (action.type) {
        case auth_constants.LOGIN_REQUEST:
            return { loading: true }

        case auth_constants.LOGIN_SUCCESS:
            return { 
                loading: false, 
                userInfo: action.payload 
            }

        case auth_constants.LOGIN_FAIL:
            return { 
                loading: false, 
                error: action.payload
            }

        case auth_constants.REGISTER_REQUEST:
            return { loading: true }

        case auth_constants.REGISTER_SUCCESS:
            return { 
                loading: false, 
                userInfo: action.payload 
            }

        case auth_constants.REGISTER_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }

        case auth_constants.LOGOUT:
            return {}

        default:
            return state
    }
}
