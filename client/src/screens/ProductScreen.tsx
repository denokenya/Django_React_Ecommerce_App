import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from 'components/Rating';
import { IParams } from 'interfaces/params.interface';
import { IProduct } from 'interfaces/product.interface';
import axios from 'axios';

const ProductScreen = () => {
    const params = useParams<IParams>()
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        async function fetchProduct() {
            // @ts-ignore
            const res = axios.get(`http://127.0.0.1:8000/api/products/${params.id}`);
            setProduct((await res).data);
        }
        fetchProduct();
    }, [params.id]);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product?.image} alt={product?.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product?.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={(product as IProduct).rating} text={`${(product as IProduct).numReviews} reviews`} color={`#f82825`} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Price: ${product?.price}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product?.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{(product as IProduct).countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type="button"
                                    style={{ width: '100%' }}
                                    disabled={product?.countInStock === 0}>
                                    Add To Cart
                            </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
