import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router';
import { RootState } from 'store';
import { register } from 'actions/auth.actions';
import FormContainer from 'components/reusable/FormContainer';
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormInput from 'components/reusable/FormInput';

const RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { auth } = useSelector((state: RootState) => state);
    const { error, loading } = auth;

    // state
    const [registerData, setRegisterData] = useState
        (RegisterData);
    const [message, setMessage] = useState('');
    const { name, email, password, confirmPassword } = registerData;
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    name='name'
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={handleChange} />
                <FormInput
                    label="Email"
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={handleChange} />
                <FormInput
                    label="Password"
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={handleChange} />
                <FormInput
                    label="Confirmation Password"
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={handleChange} />
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/auth/login?redirect=${redirect}` : '/auth/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
