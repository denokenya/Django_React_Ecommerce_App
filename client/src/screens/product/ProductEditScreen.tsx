import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import FormContainer from 'components/reusable/FormContainer';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { IProduct } from 'interfaces/product.interface';
import { PRODUCT_UPDATE_RESET } from 'constants/product.constants';
import { getProductDetails, updateProduct } from 'actions/product.actions';
import { IParams } from 'interfaces/params.interface';
import axios from 'axios';

const ProductEditScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<IParams>();
    const [productData, setProductData] = useState({
        name: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        description: '',
    });
    const { name, brand, category, price, countInStock, description } = productData;
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState();

    const { error, loading, success, product } = useSelector((state: RootState) => state.product);
    const productInfo = product as IProduct;

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
            
            dispatch(getProductDetails(id));
            console.log(product);
        }
    }, [dispatch, product, history, success, productInfo, id]);
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }));
    }

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file =(e.target.files as FileList)[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    }
    return (
        <div>
            {/* <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={onSubmit}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={handleChange}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={handleChange}
                                >
                                </Form.Control>

                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={handleImageChange}
                                >

                                </Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}
            </FormContainer > */}
        </div>
    )
}

export default ProductEditScreen
