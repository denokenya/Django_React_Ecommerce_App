import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import FormContainer from 'components/reusable/FormContainer';
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormInput from 'components/reusable/FormInput';
import { login } from 'actions/auth.actions';


const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { auth } = useSelector((state: RootState) => state);

    // state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/';
    const { error, loading, userInfo } = auth;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormInput
                    label="Email"
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <FormInput
                    label="Password"
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/auth/register?redirect=${redirect}` : '/auth/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
