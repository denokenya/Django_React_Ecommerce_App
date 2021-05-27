import React, { useState, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from 'components/reusable/FormContainer';
import { Form, Button } from 'react-bootstrap'
import { saveShippingAddress } from 'actions/cart.actions';
import { RootState } from 'store';
import { useHistory } from 'react-router';
import CheckoutSteps from 'components/CheckoutSteps';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { shippingAddress } = useSelector((state: RootState) => state.cart
    );
    
    // state
    const [address, setAddress] = useState(shippingAddress!.address)
    const [city, setCity] = useState(shippingAddress!.city)
    const [postalCode, setPostalCode] = useState(shippingAddress!.postalCode)
    const [country, setCountry] = useState(shippingAddress!.country)

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
