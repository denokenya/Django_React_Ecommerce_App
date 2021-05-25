import { Container } from 'react-bootstrap';
// screens
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import ProfileScreen from 'screens/ProfileScreen';
import ProfileUpdateScreen from 'screens/admin/ProfileUpdateScreen';
import UserListScreen from 'screens/admin/UserListScreen';
import ProductScreen from 'screens/product/ProductScreen';
import ProductListScreen from 'screens/product/ProductListScreen';
import ProductEditScreen from 'screens/product/ProductEditScreen';
// routes
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';

const AppRoutes = () => {
    return (
        <Container>
            <PublicRoute restricted={false} path='/' component={HomeScreen} exact />
            <PublicRoute restricted={true} path="/auth/login" component={LoginScreen} />
            <PublicRoute restricted={true} path="/auth/register" component={RegisterScreen} />

            <PrivateRoute path='/product/:id' component={ProductScreen} />
            <PrivateRoute path='/admin/productlist' component={ProductListScreen} />
            <PrivateRoute path="/admin/product/:id/edit" component={ProductEditScreen} />

            <PrivateRoute path='/profile' component={ProfileScreen} />
            <PrivateRoute path='/admin/:id/update' component={ProfileUpdateScreen} />
            <PrivateRoute path='/admin/userlist' component={UserListScreen} />
        </Container>
    )
}

export default AppRoutes
