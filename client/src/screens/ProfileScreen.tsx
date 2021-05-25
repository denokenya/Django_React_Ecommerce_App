import React, { ChangeEvent, FormEvent, HTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store';
import { USER_UPDATE_PROFILE_RESET } from 'constants/user.constants';
import { useHistory } from 'react-router';
import { IUser } from 'interfaces/user.interfaces';
import { getUserDetails, updateProfile } from 'actions/user.actions';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormInput from 'components/reusable/FormInput';
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';



const ProfileScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const { name, email, password, confirmPassword } = profileData;

    // redux
    const state = useSelector((state: RootState) => state);
    const { error, loading, user, success } = state.user;
    const { userInfo } = state.auth;

    useEffect(() => {
        if (!user || !(user as IUser).name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'));
        } else {
            setProfileData({
                name: (user as IUser).name,
                email: (user as IUser).email,
                password: '',
                confirmPassword: ''
            })
        }
    }, [dispatch, history, success, user, userInfo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateProfile({
                'id': (user as IUser)._id as string,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    }

    const handleTriggerForm = (e: ChangeEvent<any>) => {
        e.preventDefault();
        setIsEdit(!isEdit);
    }

    return (
        <Row>
            <Col md={4}>
                <h2>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={handleSubmit}>
                    <div className="edit_form_input">
                        {
                            !isEdit
                                ? <p>{name}</p>
                                : <FormInput
                                    required
                                    name='name'
                                    type='text'
                                    placeholder='Enter your name'
                                    value={name}
                                    onChange={() => handleChange} />
                        }
                        <span onClick={handleTriggerForm}>
                            {!isEdit
                                ? <i className="fas fa-pencil-alt"></i>
                                : <i className="fas fa-window-close"></i>
                            }
                        </span>
                    </div>
                    <div className="edit_form_input">
                        {
                            !isEdit
                                ? <p>{email}</p>
                                : <FormInput
                                    required
                                    name='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={handleChange} />
                        }
                        <span onClick={handleTriggerForm}>
                            {!isEdit
                                ? <i className="fas fa-pencil-alt"></i>
                                : <i className="fas fa-window-close"></i>
                            }
                        </span>
                    </div>
                    <div className="edit_form_input">
                        {
                            !isEdit
                                ? <p>**********</p>
                                : <FormInput
                                    required
                                    name='password'
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={handleChange} />
                        }
                        <span onClick={handleTriggerForm}>
                            {!isEdit
                                ? <i className="fas fa-pencil-alt"></i>
                                : <i className="fas fa-window-close"></i>
                            }
                        </span>
                    </div>
                    <Button type='submit' variant='primary'>
                        Update
                </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileScreen
