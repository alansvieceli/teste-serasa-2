import React from 'react'
import { Chart } from 'react-google-charts'

interface PieChartProps {
    data: (string | number)[][]
    title: string
    subTitle: string
    width: string
    height: string
    is3D?: boolean
}

const PieChartExample: React.FC<PieChartProps> = ({
    data,
    title,
    subTitle,
    width,
    height,
    is3D = true, // Valor padrão
}) => {
    const options = {
        title: subTitle,
        is3D,
    }

    return (
        <div>
            <h2>{title}</h2>
            <Chart chartType="PieChart" data={data} options={options} width={width} height={height} />
        </div>
    )
}

export default PieChartExample
