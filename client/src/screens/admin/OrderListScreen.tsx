import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import { } from 'actions/order.actions';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store';
import { getOrders } from 'actions/order.actions';
import { IOrder } from 'interfaces/order.interfaces';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state: RootState) => state.order);
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrders())
        }
    }, [dispatch, user]);

    return (
        <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order: IOrder) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt?.toString().substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt?.toString().substring(0, 10)
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt?.toString().substring(0, 10)
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen
