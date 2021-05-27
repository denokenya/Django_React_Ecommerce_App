import { IParams } from 'interfaces/params.interface'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from 'store';
import { getUserDetails, updateUser } from 'actions/user.actions';
import { Form, Button } from 'react-bootstrap'
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';
import FormContainer from 'components/reusable/FormContainer';

const ProfileEditScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        isAdmin: false
    });
    const { name, email, isAdmin } = userData;
    const { user, error, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!user!.name || user!._id !== id) {
            dispatch(getUserDetails(id))
        }
        setUserData({
            name: user?.name as string,
            email: user?.email as string,
            isAdmin: user?.isAdmin as boolean,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(updateUser({
            _id: user!._id,
            name,
            email,
            isAdmin
        }))
    };

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
                        <Form onSubmit={onSubmit}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
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
                                    onChange={handleChange}
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

export default ProfileEditScreen
