import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'store';
import { PRODUCT_CREATE_RESET } from 'constants/product.constants';
import { IProduct } from 'interfaces/product.interface';
import { getProducts, deleteProduct, createProduct } from 'actions/product.actions';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import Paginate from 'components/Paginate';


const ProductListScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading, error, success, products, pages, page } = useSelector((state: RootState) => state.product);

    let keyword = history.location.search;
    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [dispatch, keyword]);

    const onDeleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const onCreateProduct = () => {
        dispatch(createProduct());
        window.location.reload(false);
    };

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={onCreateProduct}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product: IProduct) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => onDeleteProduct(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate
                    pages={pages}
                    page={page}
                    isAdmin={true}
                    keyword='' />
            </div>
        </div>
    )
}

export default ProductListScreen
