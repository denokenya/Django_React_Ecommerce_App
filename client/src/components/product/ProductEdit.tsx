import { FC, useState, ChangeEvent, useEffect } from 'react';
import { getProductDetails, updateProduct } from 'actions/product.actions';
import FormInput from 'components/reusable/FormInput';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { IProduct } from 'interfaces/product.interface';
import axios from 'axios';

interface ProductEditProps {
    onHide: () => void
    show: boolean
    product: IProduct
}

const ProductEdit: FC<ProductEditProps> = ({ onHide, show, product }) => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        name: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        description: ''
    })
    const { name, brand, category, price, description, countInStock } = productData;
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        dispatch(getProductDetails(product._id))
        setProductData({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            countInStock: product.countInStock,
            description: product.description,
        })
    }, [dispatch, product._id, product.brand, product.category, product.countInStock, product.description, product.name, product.price]);


    const onSubmitProduct = (e: any) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: product._id,
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
        const file = (e.target.files as FileList)[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', product._id)

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
        <Modal
            size="lg"
            aria-labelledby="example-modal-sizes-title-lg"
            show={show}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormInput
                        label="Name"
                        placeholder="Enter product name"
                        value={name}
                        type="text"
                        name="name"
                        onChange={handleChange} />
                    <FormInput
                        label="Email"
                        placeholder="Enter product price"
                        value={price}
                        type="number"
                        name="price"
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
                        {uploading && <p>Uploading Image...</p>}
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="secondary">
                    Close
                </Button>
                <Button onClick={onSubmitProduct} variant="primary">
                    Add Product
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductEdit
