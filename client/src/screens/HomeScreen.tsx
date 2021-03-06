import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from 'components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useHistory } from 'react-router';
import { getProducts } from 'actions/product.actions';
import Message from 'components/reusable/Message';
import Loader from 'components/reusable/Loader';
import Paginate from 'components/Paginate';
import ProductCarousel from 'components/ProductCarousel';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, loading, products, page, pages } = useSelector((state: RootState) => state.product);
    let keyword = history.location.search

    useEffect(() => {
        dispatch(getProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>
            <div>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate
                    page={page}
                    pages={pages}
                    keyword={keyword} />
            </div>
        </div>
    )
}

export default HomeScreen;
