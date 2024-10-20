import styled from 'styled-components'

export const ErrorMessage = styled.span`
    color: red;
    font-size: 0.9;
`

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`
export const HorizontalFieldGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
`

export const FieldGroup = styled.div<{ flexSize?: number }>`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: ${({ flexSize }) => flexSize || 1}; /* Flexível com base no tamanho fornecido */
`
export const Label = styled.label`
    font-weight: bold;
    color: #333;
`

export const Input = styled.input<{ hasError: boolean }>`
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    border: 2px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')};
    }
`

export const Select = styled.select<{ hasError: boolean }>`
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    border: 2px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')};
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 16px;
`

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #45a049;
    }
`

export const CloseButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #e53935;
    }
`
