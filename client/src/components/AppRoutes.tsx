import React, { Suspense } from 'react';
import { Container } from 'react-bootstrap';
// routes
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import Loader from './reusable/Loader';
// screens
const HomeScreen = React.lazy(() => import('screens/HomeScreen'));
const LoginScreen = React.lazy(() => import('screens/auth/LoginScreen'));
const RegisterScreen = React.lazy(() => import('screens/auth/RegisterScreen'));
const ProfileScreen = React.lazy(() => import('screens/ProfileScreen'));
const UserEditScreen = React.lazy(() => import('screens/admin/UserEditScreen'));
const UserListScreen = React.lazy(() => import('screens/admin/UserListScreen'));
const ProductScreen = React.lazy(() => import('screens/product/ProductScreen'));
const ProductListScreen = React.lazy(() => import('screens/product/ProductListScreen'));
const ProductEditScreen = React.lazy(() => import('screens/product/ProductEditScreen'));
const ProfileEditScreen = React.lazy(() => import('screens/ProfileEditScreen'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
            <PublicRoute restricted={false} path='/' component={HomeScreen} exact />
            <PublicRoute restricted={true} path="/auth/login" component={LoginScreen} />
            <PublicRoute restricted={true} path="/auth/register" component={RegisterScreen} />

            <PrivateRoute path='/profile' component={ProfileScreen} />
            <PrivateRoute path='/admin/:id/update' component={UserEditScreen} />
            <PrivateRoute path='/admin/userlist' component={UserListScreen} />
            <PrivateRoute path='/admin/user/:id/update' component={ProfileEditScreen} />


            <PrivateRoute path='/product/:id' component={ProductScreen} />
            <PrivateRoute path='/admin/productlist' component={ProductListScreen} />
            <PrivateRoute path="/admin/product/:id/edit" component={ProductEditScreen} />
        </Container>
        </Suspense>
    )
}

export default AppRoutes
