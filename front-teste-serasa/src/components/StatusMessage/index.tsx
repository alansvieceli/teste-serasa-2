import React from 'react'
import { MessageContainer, MessageText } from './StatusMessageStyles'

interface StatusMessageProps {
    message: string
    type: 'loading' | 'error' // Definindo o tipo da mensagem
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message, type }) => {
    return (
        <MessageContainer>
            <MessageText type={type}>{message}</MessageText>
        </MessageContainer>
    )
}

export default StatusMessage
