import { Row, Col } from 'react-bootstrap';
import products from 'product_data';
import { IProduct } from 'interfaces/product.interface';
import Product from 'components/Product';

const HomeScreen = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                { products.map((product: IProduct) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
