import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from 'constants/cart.constants';
import { IOrder } from './order.interfaces';
import { IProduct } from './product.interface';

export interface IOrderItem {
    _id?: string
    product: IProduct | string
    order?: IOrder
    name: string
    qty: number
    price: number
    image: string
    countInStock: number
}

export interface IShippingAddress {
    address: string
    city: string
    postalCode: string
    country: string
}

export interface CartState {
    cartItems: IOrderItem[]
    shippingAddress: IShippingAddress | null
    paymentMethod: any 
}

// actions
interface CartAddItem {
    type: typeof CART_ADD_ITEM
    payload: IOrderItem
}

interface CartRemoveItem {
    type: typeof CART_REMOVE_ITEM
    payload: string
}

interface CartSaveShippingAddress {
    type: typeof CART_SAVE_SHIPPING_ADDRESS
    payload: IShippingAddress
}

interface CartSavePaymentMethod {
    type: typeof CART_SAVE_PAYMENT_METHOD
    payload: string
}

interface CartClearItems { 
    type: typeof CART_CLEAR_ITEMS 
    payload: any
}

export type CartActions = CartAddItem | CartRemoveItem | CartSaveShippingAddress | CartSavePaymentMethod | CartClearItems;