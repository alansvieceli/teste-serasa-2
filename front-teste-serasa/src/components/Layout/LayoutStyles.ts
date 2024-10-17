import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    padding: 20px;
`

// Estilos atualizados para o Header e seu conteúdo
export const Header = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Title = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
`

export const Name = styled.span`
    font-size: 18px;
    color: #666;
`

// Estilização das Abas (Tabs)
export const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

export const TabLink = styled(Link)<{ active: string }>`
    margin: 0 20px;
    padding: 10px 20px;
    text-decoration: none;
    color: ${({ active }) => (active == 'true' ? 'blue' : 'black')};
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: ${({ active }) => (active == 'true' ? '#e0e0e0' : '#f0f0f0')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ active }) => (active == 'true' ? '#d4d4d4' : '#e6e6e6')};
    }
`
