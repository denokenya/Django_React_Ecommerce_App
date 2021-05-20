import { combineReducers } from 'redux';
import user from './user.reducers';
import auth from './auth.reducers';
import cart from './cart.reducers';
import product from './product.reducers';
import order from './product.reducers';

export default combineReducers({
    user,
    auth,
    cart,
    product,
    order
});