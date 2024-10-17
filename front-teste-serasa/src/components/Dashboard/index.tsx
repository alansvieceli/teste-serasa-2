import React, { useEffect, useState } from 'react'
import { DashboardContainer, GridContainer, GridItem } from './DashboardStyles'
import PieChartExample from '../PieChartExample'
import DescriptionComponent from '../Description'
import { DashboardData, ValueByCrop, ValueByState, fetchDashboardData } from 'src/services'
import StatusMessage from '../StatusMessage'
import { formatNumber, getFriendlyCropName } from 'src/utils'

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const result = await fetchDashboardData()
                setData(result)
                setLoading(false)
            } catch (err) {
                setError('Erro ao carregar os dados do dashboard.')
                setLoading(false)
            }
        }

        loadDashboardData()
    }, [])

    const createChartData = (header: string[], data: any[], labelFormatter: (item: any) => string, valueKey: string) => {
        return [header, ...data.map(item => [labelFormatter(item), Number(item[valueKey])])]
    }

    const farmsByStateData = createChartData(
        ['Estado', 'Fazendas'],
        data?.farmsByState || [],
        (item: ValueByState) => `${item.state} - ${item.count}`,
        'count',
    )

    const areaByStateData = createChartData(
        ['Estado', 'Área'],
        data?.areaByState || [],
        (item: ValueByState) => `${item.state} - ${formatNumber(item.count)}ha`,
        'count',
    )

    const farmsByCropsplantedData = createChartData(
        ['Cultura', 'Fazendas'],
        data?.farmsByCropsplanted || [],
        (item: ValueByCrop) => `${getFriendlyCropName(item.crop)} - ${item.count}`,
        'count',
    )

    const areaByCropsplanteData = createChartData(
        ['Cultura', 'Área'],
        data?.areaByCropsplante || [],
        (item: ValueByCrop) => `${getFriendlyCropName(item.crop)} - ${formatNumber(item.count)}ha`,
        'count',
    )

    const landUseData = [
        ['Cultura', 'Área'],
        ['Área agricultável', Number(data?.landUse.arableArea)],
        ['Vegetação', Number(data?.landUse.vegetationArea)],
    ]

    if (loading) {
        return <StatusMessage message="Carregando dados..." type="loading" />
    }

    if (error) {
        return <StatusMessage message={error} type="error" />
    }

    if (!data) {
        return <StatusMessage message="Erro ao carregar os dados do dashboard." type="error" />
    }

    return (
        <DashboardContainer>
            <DescriptionComponent
                label1="Total de fazendas em quantidade"
                value1={data.totalFarms.toString()}
                label2="Total de fazendas em hectares (área total)"
                value2={data.totalArea.toString()}
            />

            <GridContainer>
                {[
                    { data: farmsByStateData, title: 'Quantidade de Fazendas', subTitle: 'Por estado' },
                    { data: areaByStateData, title: 'Quantidade de Hectares (Área Total)', subTitle: 'Por estado' },
                    { data: farmsByCropsplantedData, title: 'Quantidade de Fazendas', subTitle: 'Por cultura' },
                    { data: areaByCropsplanteData, title: 'Quantidade de Hectares (Área Agrícultável)', subTitle: 'Por cultura' },
                    { data: landUseData, title: 'Uso de solo (Área agricultável e vegetação)', subTitle: '' },
                ].map((chart, index) => (
                    <GridItem key={index}>
                        <PieChartExample data={chart.data} title={chart.title} subTitle={chart.subTitle} width="100%" height="300px" />
                    </GridItem>
                ))}
            </GridContainer>
        </DashboardContainer>
    )
}

export default Dashboard
