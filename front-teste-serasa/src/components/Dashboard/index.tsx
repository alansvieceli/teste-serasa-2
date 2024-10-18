import React, { useEffect, useState } from 'react'
import { DashboardContainer, GridContainer, GridItem } from './DashboardStyles'
import PieChart from '../PieChart'
import DescriptionComponent from '../Description'
import { DashboardData, ValueByCrop, ValueByState, fetchDashboardData } from 'src/services'
import StatusMessage from '../StatusMessage'
import { formatNumber, getFriendlyCropName } from 'src/utils'
import Loading from '../Loading'

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [farmsByStateData, setFarmsByStateData] = useState<(string | number)[][]>([])
    const [areaByStateData, setAreaByStateData] = useState<(string | number)[][]>([])
    const [farmsByCropsplantedData, setFarmsByCropsplantedData] = useState<(string | number)[][]>([])
    const [areaByCropsplanteData, setAreaByCropsplanteData] = useState<(string | number)[][]>([])
    const [landUseData, setLandUseData] = useState<(string | number)[][]>([])

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true)
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

    useEffect(() => {
        const createChartData = (header: string[], data: any[], labelFormatter: (item: any) => string, valueKey: string) => {
            return [header, ...data.map(item => [labelFormatter(item), Number(item[valueKey])])]
        }

        const farmsByStateData = createChartData(
            ['Estado', 'Fazendas'],
            data?.farmsByState || [],
            (item: ValueByState) => `${item.state} - ${item.count}`,
            'count',
        )
        setFarmsByStateData(farmsByStateData)

        const areaByStateData = createChartData(
            ['Estado', 'Área'],
            data?.areaByState || [],
            (item: ValueByState) => `${item.state} - ${formatNumber(item.count)}ha`,
            'count',
        )
        setAreaByStateData(areaByStateData)

        const farmsByCropsplantedData = createChartData(
            ['Cultura', 'Fazendas'],
            data?.farmsByCropsPlanted || [],
            (item: ValueByCrop) => `${getFriendlyCropName(item.crop)} - ${item.count}`,
            'count',
        )
        setFarmsByCropsplantedData(farmsByCropsplantedData)

        const areaByCropsplanteData = createChartData(
            ['Cultura', 'Área'],
            data?.areaByCropsPlanted || [],
            (item: ValueByCrop) => `${getFriendlyCropName(item.crop)} - ${formatNumber(item.count)}ha`,
            'count',
        )
        setAreaByCropsplanteData(areaByCropsplanteData)

        const landUseData = [
            ['', ''],
            ['Área agricultável', Number(data?.landUse.arableArea)],
            ['Vegetação', Number(data?.landUse.vegetationArea)],
        ]
        setLandUseData(landUseData)
    }, [data])

    if (error) {
        return <StatusMessage message={error} type="error" />
    }

    return (
        <DashboardContainer>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <DescriptionComponent
                        label1="Total de fazendas em quantidade"
                        value1={data?.totalFarms.toString()}
                        label2="Total de fazendas em hectares (área total)"
                        value2={data?.totalArea.toString()}
                    />
                    <GridContainer>
                        {[
                            { data: farmsByStateData, title: 'Quantidade de Fazendas', subTitle: 'Por estado' },
                            { data: areaByStateData, title: 'Quantidade de Hectares (Área Total)', subTitle: 'Por estado' },
                            { data: farmsByCropsplantedData, title: 'Quantidade de Fazendas', subTitle: 'Por cultura' },
                            {
                                data: areaByCropsplanteData,
                                title: 'Quantidade de Hectares (Área Agrícultável)',
                                subTitle: 'Por cultura',
                            },
                            { data: landUseData, title: 'Uso de solo (Área agricultável e vegetação)', subTitle: '' },
                        ].map((chart, index) => (
                            <GridItem key={index}>
                                <PieChart
                                    data={chart.data}
                                    title={chart.title}
                                    subTitle={chart.subTitle}
                                    width="100%"
                                    height="300px"
                                />
                            </GridItem>
                        ))}
                    </GridContainer>
                </>
            )}
        </DashboardContainer>
    )
}

export default Dashboard
