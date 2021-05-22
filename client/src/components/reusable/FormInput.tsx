import { FC, InputHTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string
    value: any
}

const FormInput: FC<FormInputProps> = ({ label, placeholder, value, onChange, type, name }) => {
    return (
        <Form.Group controlId={type}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        </Form.Group>
    )
}

export default FormInput
