import React, { FC, ReactNode } from 'react'
import { Alert } from 'react-bootstrap'

interface MessageProps {
    children: ReactNode
    variant: string
}

const Message: FC<MessageProps> = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Message