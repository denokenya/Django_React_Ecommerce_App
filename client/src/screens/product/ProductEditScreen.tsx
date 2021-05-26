import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import Loader from 'components/reusable/Loader';
import Message from 'components/reusable/Message';
import FormContainer from 'components/reusable/FormContainer';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { IProduct, IProductForm } from 'interfaces/product.interface';
import { PRODUCT_UPDATE_RESET } from 'constants/product.constants';
import { getProductDetails, updateProduct } from 'actions/product.actions';
import { IParams } from 'interfaces/params.interface';
import axios from 'axios';
import FormInput from 'components/reusable/FormInput';

const ProductEditScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<IParams>();
    const [productData, setProductData] = useState<IProductForm>({
        name: '',
        price: 0,
        brand: '',
        category: '',
        countInStock: 0,
        description: ''
    });
    const { name, price, brand, category, countInStock, description } = productData;
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);

    // redux
    const { error, loading, success, product } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(getProductDetails(id));
        setProductData({
            name: product!.name,
            price: product!.price,
            countInStock: product!.countInStock,
            category: product!.category,
            brand: product!.brand,
            description: product!.description,
        }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0]
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsFormUpdate(true);
        if (success) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        }
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
        setIsFormUpdate(false);
    };

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={handleSubmit}>
                    <FormInput
                        label="Name"
                        placeholder="Enter product name"
                        value={name}
                        type="text"
                        name="name"
                        onChange={handleChange} />
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
                    <FormInput
                        label="Brand"
                        placeholder="Enter product brand"
                        value={brand}
                        name="brand"
                        type="text"
                        onChange={handleChange} />
                    <FormInput
                        label="Quantity"
                        value={countInStock}
                        placeholder="Enter product quantity"
                        name="countInStock"
                        type="number"
                        onChange={handleChange} />
                    <FormInput
                        label="Categrory"
                        value={category}
                        placeholder="Enter product category"
                        type="text"
                        name="category"
                        onChange={handleChange} />
                    <FormInput
                        label="Description"
                        placeholder="Enter product description"
                        value={description}
                        type="text"
                        name="description"
                        onChange={handleChange} />
                    <Button type='submit' variant='primary'>
                        {isFormUpdate ? 'Updating...' : 'Update'}
                    </Button>
                </Form>
            </FormContainer >
        </div>
    )
}

export default ProductEditScreen
