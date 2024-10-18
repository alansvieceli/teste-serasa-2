import ReactLoading from 'react-loading'
import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    padding-top: 20px;
`

const Loading: React.FC = () => {
    return (
        <LoadingContainer>
            <ReactLoading type={'spinningBubbles'} color={'#000"'} height={80} width={80} />
        </LoadingContainer>
    )
}

export default Loading
