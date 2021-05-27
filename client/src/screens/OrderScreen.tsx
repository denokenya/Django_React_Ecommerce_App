import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import { useParams } from 'react-router';
import { IParams } from 'interfaces/params.interface';
import { RootState } from 'store';
import { IOrder } from 'interfaces/order.interfaces';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from 'constants/order.constants';
import { deliverOrder, getOrderDetails, payOrder } from 'actions/order.actions';


const OrderScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();

    const [sdkReady, setSdkReady] = useState(false);
    const { loading, success, error, order, isPaid, isDelivered } = useSelector((state: RootState) => state.order);
    const { user } = useSelector((state: RootState) => state.user);

    if (!loading && !error) {
        (order as IOrder).itemsPrice = order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!order || isPaid || order._id !== id || isDelivered) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [])

    const handlePayment = (paymentResult: string) => {
        dispatch(payOrder(id, paymentResult))
    }

    const handleDeliver = () => {
        dispatch(deliverOrder(order as IOrder))
    }

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div>
                        <h1>Order: {order?._id}</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p><strong>Name: </strong> {order?.user?.name}</p>
                                        <p><strong>Email: </strong><a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a></p>
                                        <p>
                                            <strong>Shipping: </strong>
                                            {order?.shippingAddress.address},  {order?.shippingAddress.city}
                                            {'  '}
                                            {order?.shippingAddress.postalCode},
                                                                            {'  '}
                                            {order?.shippingAddress.country}
                                        </p>

                                        {order?.isDelivered ? (
                                            <Message variant='success'>Delivered on {order?.deliveredAt}</Message>
                                        ) : (
                                            <Message variant='warning'>Not Delivered</Message>
                                        )}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order?.paymentMethod}
                                        </p>
                                        {order?.isPaid ? (
                                            <Message variant='success'>Paid on {order?.paidAt}</Message>
                                        ) : (
                                            <Message variant='warning'>Not Paid</Message>
                                        )}

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {order?.orderItems.length === 0 ? <Message variant='info'>
                                            Order is empty
                                                                        </Message> : (
                                            <ListGroup variant='flush'>
                                                {order?.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </ListGroup.Item>

                                </ListGroup>

                            </Col>

                            <Col md={4}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Order Summary</h2>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Items:</Col>
                                                <Col>${order?.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping:</Col>
                                                <Col>${order?.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax:</Col>
                                                <Col>${order?.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total:</Col>
                                                <Col>${order?.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>


                                        {!order?.isPaid && (
                                            <ListGroup.Item>
                                                {loading && <Loader />}

                                                {!sdkReady ? (
                                                    <Loader />
                                                ) : (
                                                    <PayPalButton
                                                        amount={order?.totalPrice}
                                                        onSuccess={handlePayment}
                                                    />
                                                )}
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                    {loading && <Loader />}
                                    {user && user.isAdmin && order?.isPaid && !order?.isDelivered && (
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={handleDeliver}>
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </>
    )
}

export default OrderScreen
