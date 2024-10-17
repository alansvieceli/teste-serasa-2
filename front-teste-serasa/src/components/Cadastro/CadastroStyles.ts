import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f4f4f4;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
`

export const ButtonAdd = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;

    display: flex;
    align-items: center;

    svg {
        margin-right: 5px;
    }
`

export const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;

    svg {
        color: #333;
        font-size: 16px;
    }

    &:hover svg {
        color: #007bff;
    }
`
