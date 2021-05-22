import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
// screens
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';

const AppRoutes = () => {
    return (
        <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/auth/register" component={RegisterScreen} />
        </Container>
    )
}

export default AppRoutes
