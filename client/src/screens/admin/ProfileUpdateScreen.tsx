import { IParams } from 'interfaces/params.interface';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router'
import { RootState } from 'store';
import { USER_UPDATE_RESET } from 'constants/user.constants';
import { IUser } from 'interfaces/user.interfaces';
import { getUserDetails, updateUser } from 'actions/user.actions';
import { Link } from 'react-router-dom';
import FormContainer from 'components/reusable/FormContainer';
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';
import { Form, Button } from 'react-bootstrap'


const ProfileUpdateScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    console.log(id);
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });
    const { name, email } = userData;

    // redux
    const state = useSelector((state: RootState) => state);
    const { error, loading, user, success } = state.user;
    const { userInfo } = state.auth;

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            // @ts-ignore
            if (!(user as IUser).name || (user as IUser)._id !== Number(id)) {
                dispatch(getUserDetails(id, userInfo))
            } else {
                setUserData({
                    name: (user as IUser).name,
                    email: (user as IUser).email,
                });
                setIsAdmin((user as IUser).isAdmin as boolean);
            }
        }
    }, [dispatch, history, id, success, user, userInfo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(updateUser(userInfo));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={handleChange}
                                    name='name'
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>
    )
}

export default ProfileUpdateScreen
