import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { deleteFarmer, FarmerData, fetchFarmsData } from 'src/services'
import { ActionButton, ButtonAdd, Container, Table } from './FarmersStyles'
import StatusMessage from '../StatusMessage'
import Loading from '../Loading'
import { removeFarmer, setFarmersData, useAppDispatch, useAppSelector } from 'src/store'
import Swal from 'sweetalert2'
import FarmForm from '../FarmForm'
import Modal from '../Modal'
import { toast, ToastContainer } from 'react-toastify'

const Farmers: React.FC = () => {
    const dispatch = useAppDispatch()
    const farmers = useAppSelector(state => state.farmers)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedFarm, setSelectedFarm] = useState<FarmerData | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await fetchFarmsData()
            dispatch(setFarmersData(result))
            setLoading(false)
        } catch (err) {
            setError('Erro ao carregar os dados do dashboard.')
            setLoading(false)
        }
    }

    useEffect(() => {
        const loadFarmerData = async () => fetchData()

        loadFarmerData()
    }, [])

    const handleEdit = (id: string) => {
        const farm = farmers.find(f => f.id === id)
        if (farm) {
            setSelectedFarm(farm)
            setIsModalOpen(true)
        }
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: 'Essa ação não poderá ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        })

        if (result.isConfirmed) {
            try {
                await deleteFarmer(id)
                dispatch(removeFarmer(id))
                Swal.fire('Excluído!', 'O item foi excluído com sucesso.', 'success')
            } catch (error) {
                console.error('Erro ao deletar', error)
                Swal.fire('Erro!', 'Não foi possível excluir o item.', 'error')
            }
        }
    }

    const handleAdd = () => {
        const farm: FarmerData = {
            documentType: '',
            document: '',
            farmerName: '',
            farmName: '',
            city: '',
            stateCode: '',
            totalArea: 0,
            arableArea: 0,
            vegetationArea: 0,
            cropsPlanted: '',
            id: '',
        }
        setSelectedFarm(farm)
        setIsModalOpen(true)
    }

    const handleEditSubmit = (updatedFarm: FarmerData) => {
        const farmIndex = farmers.findIndex(f => f.id === updatedFarm.id)

        let updatedFarmers

        if (farmIndex !== -1) {
            updatedFarmers = [...farmers.slice(0, farmIndex), updatedFarm, ...farmers.slice(farmIndex + 1)]
        } else {
            updatedFarmers = [...farmers, updatedFarm]
        }
        dispatch(setFarmersData(updatedFarmers))
        setIsModalOpen(false)
        toast.success('Dados Salvos!!!')
    }

    const handleCloseFormEdit = () => {
        setIsModalOpen(false)
    }

    if (error) {
        return <StatusMessage message={error} type="error" />
    }

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <>
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
                            {farmers.map(farmer => (
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
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        {selectedFarm && <FarmForm data={selectedFarm} onSubmit={handleEditSubmit} onClose={handleCloseFormEdit} />}
                    </Modal>
                </>
            )}
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="light"
            />
        </Container>
    )
}

export default Farmers
