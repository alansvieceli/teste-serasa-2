import styled from 'styled-components'

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`

export const FieldGroup = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;
`

export const Label = styled.label`
    font-weight: bold;
    margin-right: 8px;
    white-space: nowrap;
`

export const Input = styled.input`
    flex: 1;
    padding: 8px;
    font-size: 1rem;
    width: 100%; /* Garante que o input ocupe todo o espaço disponível */
`

export const Input2 = styled.input<{ hasError: boolean }>`
    flex: 1;
    padding: 8px;
    font-size: 1rem;
    width: 100%;
    border: 2px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')}; /* Borda vermelha se houver erro */
    background-color: ${({ hasError }) => (hasError ? '#ffe6e6' : 'white')}; /* Cor de fundo mais clara se houver erro */
    border-radius: 4px;

    &:focus {
        outline: none;
        border-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')}; /* Mantém a borda vermelha ao focar */
    }
`

export const Select = styled.select`
    flex: 1;
    padding: 8px;
    font-size: 1rem;
    width: 100%;
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    justify-content: flex-start; /* Alinha os botões à esquerda */
`

export const Button = styled.button`
    width: 100px; /* Define a largura de 100px para ambos os botões */
    padding: 10px;
    font-size: 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`

export const CloseButton = styled(Button)`
    background-color: #f44336; /* Cor diferente para o botão de fechar */
    &:hover {
        background-color: #e53935;
    }
`
