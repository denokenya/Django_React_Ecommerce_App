import { FC, useState, ChangeEvent } from 'react';
import { createProduct } from 'actions/product.actions';
import FormInput from 'components/reusable/FormInput';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux'

interface ProductCreateProps {
    onHide: () => void
    show: boolean
}

const ProductCreate: FC<ProductCreateProps> = ({ onHide, show }) => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        name: '',
        brand: '',
        category: '',
        price: 0
    })
    const { name, brand, category, price } = productData;

    const onSubmitProduct = () => {
        dispatch(createProduct());
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
                        name='name'
                        type='text'
                        placeholder='Enter product name'
                        value={name}
                        onChange={handleChange} />
                    <FormInput
                        label="Price"
                        name='price'
                        type='number'
                        value={price}
                        placeholder='Enter product price'
                        onChange={handleChange} />
                    <FormInput
                        label="Brand"
                        name='brand'
                        type='text'
                        placeholder='Enter product brand'
                        value={brand}
                        onChange={handleChange} />
                    <FormInput
                        label="Category"
                        name='category'
                        type='text'
                        placeholder='Enter product category'
                        value={category}
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

export default ProductCreate
