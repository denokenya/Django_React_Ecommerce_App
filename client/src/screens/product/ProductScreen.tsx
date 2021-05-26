import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store';
import { PRODUCT_CREATE_REVIEW_RESET } from 'constants/product.constants';
import { createProductReview, getProductDetails } from 'actions/product.actions';
import { useHistory, useParams } from 'react-router';
import { IParams } from 'interfaces/params.interface';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import { Link } from 'react-router-dom';
import { IProduct, IReview } from 'interfaces/product.interface';
import Rating from 'components/Rating';

const ProductScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const history = useHistory();

    // state
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    // redux
    const { user } = useSelector((state: RootState) => state.user);
    const { loading, error, success, product } = useSelector((state: RootState) => state.product)


    useEffect(() => {
        if (success) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, success]);

    const addCart = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(createProductReview(
            id,
            rating,
            comment
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={(product as IProduct).image} alt={(product as IProduct).name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{(product as IProduct).name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {/* <Rating value={(product as IProduct).rating} text={`${(product as IProduct).numReviews} reviews`} color={'#f8e825'} /> */}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${(product as IProduct).price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {(product as IProduct).description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${(product as IProduct).price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {(product as IProduct).countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {(product as IProduct).countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                // @ts-ignore
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    // @ts-ignore
                                                                    [...Array((product as IProduct).countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addCart}
                                                    className='btn-block'
                                                    disabled={(product as IProduct).countInStock === 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {(product as IProduct).reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {(product as IProduct).reviews.map((review: IReview) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.toString().substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loading && <Loader />}
                                            {success && <Message variant='success'>Review Submitted</Message>}
                                            {error && <Message variant='danger'>{error}</Message>}

                                            {user ? (
                                                <Form onSubmit={handleSubmit}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            // @ts-ignore
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            rows={5}
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loading}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}

export default ProductScreen
