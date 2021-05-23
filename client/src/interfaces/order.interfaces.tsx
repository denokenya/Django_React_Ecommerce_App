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

export interface IOrder {
    _id: string
    paymentMethod: string
    taxPrice: number
    shippingPrice: number
    totalPrice: number
    isPaid: boolean
    paidAt: Date
    isDelivered: boolean
    deliveredAt: Date
    createdAt: Date
}

export interface OrderState {
    loading: boolean
    error: string
    success: boolean
    order?: IOrder
    orders: IOrder[]
}

// actions
interface OrderCreateRequest { type: typeof ORDER_CREATE_REQUEST }
interface OrderCreateSuccess {
    type: typeof ORDER_CREATE_SUCCESS
    payload: IOrder
}
interface OrderCreateFail {
    type: typeof ORDER_CREATE_FAIL
    payload: string
}
interface OrderCreateReset { type: typeof ORDER_CREATE_RESET }



interface OrderDetailsRerquest { type: typeof ORDER_DETAILS_REQUEST }
interface OrderDetailsSuccess {
    type: typeof ORDER_DETAILS_SUCCESS
    payload: IOrder
}
interface OrderDetailsFail {
    type: typeof ORDER_DETAILS_FAIL
    payload: string
}



interface OrderPayRerquest { type: typeof ORDER_PAY_REQUEST }
interface OrderPaySuccess {  
    type: typeof ORDER_PAY_SUCCESS 
    payload: any
}
interface OrderPayFail {
    type: typeof ORDER_PAY_FAIL
    payload: string
}
interface OrderPayReset { type: typeof ORDER_PAY_RESET }



interface OrderListMyRerquest { type: typeof ORDER_LIST_MY_REQUEST }
interface OrderListMySuccess {
    type: typeof ORDER_LIST_MY_SUCCESS
    payload: IOrder[]
}
interface OrderListMyFail {
    type: typeof ORDER_LIST_MY_FAIL
    payload: string
}
interface OrderListMyReset { type: typeof ORDER_LIST_MY_RESET }



interface OrderListRerquest { type: typeof ORDER_LIST_REQUEST }
interface OrderListSuccess {
    type: typeof ORDER_LIST_SUCCESS
    payload: IOrder[]
}
interface OrderListFail {
    type: typeof ORDER_LIST_FAIL
    payload: string
}



interface OrderDeliverRerquest { type: typeof ORDER_DELIVER_REQUEST }
interface OrderDeliverSuccess { 
    type: typeof ORDER_DELIVER_SUCCESS 
    payload: IOrder
}
interface OrderDeliverFail {
    type: typeof ORDER_DELIVER_FAIL
    payload: string
}
interface OrderDeliverReset { type: typeof ORDER_DELIVER_RESET }



export type OrderActions = OrderCreateRequest | OrderCreateSuccess | OrderCreateFail | OrderCreateReset | OrderDetailsRerquest | OrderDetailsSuccess | OrderDetailsFail | OrderPayRerquest | OrderPaySuccess | OrderPayFail | OrderPayReset | OrderListMyRerquest | OrderListMySuccess | OrderListMyFail | OrderListMyReset | OrderListRerquest | OrderListSuccess | OrderListFail | OrderDeliverRerquest | OrderDeliverSuccess | OrderDeliverFail | OrderDeliverReset;