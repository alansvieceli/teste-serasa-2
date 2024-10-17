import styled from 'styled-components'

export const MessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Centraliza verticalmente */
`

export const MessageText = styled.p<{ type: 'loading' | 'error' }>`
    font-size: 20px;
    color: ${({ type }) => (type === 'error' ? '#ff4d4f' : '#007bff')}; /* Diferenciar cor para erro e loading */
    font-weight: bold;
`
