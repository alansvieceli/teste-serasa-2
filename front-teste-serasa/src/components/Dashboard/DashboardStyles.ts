import styled from 'styled-components'

export const DashboardContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Inicia com 2 colunas */
    gap: 20px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Se ajusta a partir de 1024px */
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Para telas menores, colunas menores */
    }
`

export const GridItem = styled.div`
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
    }
`
