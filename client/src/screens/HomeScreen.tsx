import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IProduct } from 'interfaces/product.interface';
import Product from 'components/Product';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            // @ts-ignore
            const res = axios.get('http://127.0.0.1:8000/api/products/');
            setProducts((await res).data);
        }
        fetchProducts();
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product: IProduct) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen;
