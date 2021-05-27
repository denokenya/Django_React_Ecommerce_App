
import React, { FormEvent, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from 'components/reusable/FormContainer'
import CheckoutSteps from 'components/CheckoutSteps'
import { savePaymentMethod } from 'actions/cart.actions'
import { useHistory } from 'react-router'
import { RootState } from 'store'

function PaymentScreen() {
    const dispatch = useDispatch()
    const history = useHistory();
    const { shippingAddress } = useSelector((state: RootState) => state.cart)


    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress!.address) {
        history.push('/shipping')
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen