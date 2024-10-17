import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { FarmerData, fetchFarmsData } from 'src/services'
import { ActionButton, ButtonAdd, Container, Table } from './CadastroStyles'

const Cadastro: React.FC = () => {
    const [data, setData] = useState<Array<FarmerData>>([])
    // const [loading, setLoading] = useState<boolean>(true)
    // const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadFarmerData = async () => {
            try {
                const result = await fetchFarmsData()
                setData(result)
                // setLoading(false)
            } catch (err) {
                // setError('Erro ao carregar os dados do dashboard.')
                // setLoading(false)
            }
        }

        loadFarmerData()
    }, [])

    const handleEdit = (id: string) => {
        console.log('Editando', id)
    }

    const handleDelete = (id: string) => {
        console.log('Deletando', id)
    }

    const handleAdd = () => {
        console.log('Adicionando novo')
    }

    return (
        <Container>
            <h2>Página de Cadastro</h2>
            <ButtonAdd onClick={handleAdd}>
                <FaPlus /> Incluir Novo
            </ButtonAdd>
            <Table>
                <thead>
                    <tr>
                        <th>Nome Produtor</th>
                        <th>Nome Fazenda</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Área Total</th>
                        <th>Área Arável</th>
                        <th>Área Vegetação</th>
                        <th>Cultura Plantada</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(farmer => (
                        <tr key={farmer.id}>
                            <td>{farmer.farmerName}</td>
                            <td>{farmer.farmName}</td>
                            <td>{farmer.city}</td>
                            <td>{farmer.stateCode}</td>
                            <td>{farmer.totalArea}</td>
                            <td>{farmer.arableArea}</td>
                            <td>{farmer.vegetationArea}</td>
                            <td>{farmer.cropsPlanted}</td>
                            <td>
                                <ActionButton onClick={() => handleEdit(farmer.id)}>
                                    <FaEdit />
                                </ActionButton>
                                <ActionButton onClick={() => handleDelete(farmer.id)}>
                                    <FaTrash />
                                </ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Cadastro
