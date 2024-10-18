import React, { useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Farmers from './components/Farmers'
import Dashboard from './components/Dashboard'
import { useAppSelector } from './store'

const App: React.FC = () => {
    const activeTab = useAppSelector(state => state.tabs) // Obtém a aba ativa do Redux
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/${activeTab}`)
    }, [activeTab, navigate])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/cadastro" />} />
                <Route path="/cadastro" element={<Farmers />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Layout>
    )
}

export default App
