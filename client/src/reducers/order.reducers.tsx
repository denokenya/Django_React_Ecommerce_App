import { OrderActions, OrderState } from 'interfaces/order.interfaces';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from 'constants/order.constants';

const initialState: OrderState = {
    loading: false,
    error: '',
    success: false,
    order: undefined,
    orders: [],
    isPaid: false,
    isDelivered: false
}

const orderReducer = (state = initialState, action: OrderActions): OrderState => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_CREATE_RESET:
            return { ...state }

        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }

        case ORDER_PAY_REQUEST:
            return { ...state, loading: true }
        case ORDER_PAY_SUCCESS:
            return {
                ...state, 
                loading: false,
                isPaid: true
            }
        case ORDER_PAY_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return { ...state }

        case ORDER_DELIVER_REQUEST:
            return { ...state, loading: true }
        case ORDER_DELIVER_SUCCESS:
            return { ...state, loading: false, isDelivered: true }
        case ORDER_DELIVER_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_DELIVER_RESET:
            return { ...state }

        case ORDER_LIST_MY_REQUEST:
            return { ...state, loading: true }
        case ORDER_LIST_MY_SUCCESS:
            return { ...state, loading: false, orders: action.payload }
        case ORDER_LIST_MY_FAIL:
            return { ...state, loading: false, error: action.payload }
        case ORDER_LIST_MY_RESET:
            return { ...state, orders: [] }

        case ORDER_LIST_REQUEST:
            return { ...state, loading: true }
        case ORDER_LIST_SUCCESS:
            return { ...state, loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}

export default orderReducer;