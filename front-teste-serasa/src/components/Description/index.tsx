import React from 'react'
import { DescriptionContainer, DescriptionText, DescriptionValue } from './DescriptionStyles'
import { formatNumber } from 'src/utils'

interface DescriptionProps {
    label1: string
    value1: string
    label2: string
    value2: string
}

const DescriptionComponent: React.FC<DescriptionProps> = ({ label1, value1, label2, value2 }) => {
    return (
        <DescriptionContainer>
            <DescriptionText>
                {label1}: <DescriptionValue>{value1}</DescriptionValue>
            </DescriptionText>
            <DescriptionText>
                {label2}: <DescriptionValue>{formatNumber(value2)}ha</DescriptionValue>
            </DescriptionText>
        </DescriptionContainer>
    )
}

export default DescriptionComponent
