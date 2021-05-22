import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
// screens
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import ProfileScreen from 'screens/ProfileScreen';
import ProfileUpdateScreen from 'screens/admin/ProfileUpdateScreen';
import UserListScreen from 'screens/admin/UserListScreen';

const AppRoutes = () => {
    return (
        <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/auth/register" component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/admin/user/:id/update' component={ProfileUpdateScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
        </Container>
    )
}

export default AppRoutes
