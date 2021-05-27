import axios from 'axios';
import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from 'constants/cart.constants';
import { CartActions, IShippingAddress } from 'interfaces/cart.interfaces';
import { Dispatch } from 'react';


export const addToCart = (id: string, qty: number) => async (dispatch: Dispatch<CartActions>) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
}

export const removeFromCart = (id: string) => (dispatch: Dispatch<CartActions>) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
}


export const saveShippingAddress = (data: IShippingAddress) => (dispatch: Dispatch<CartActions>) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
}

export const savePaymentMethod = (data: any) => (dispatch: Dispatch<CartActions>) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
}