import React, { ReactNode } from 'react'
import { setActiveTab, useAppDispatch, useAppSelector } from 'src/store'
import { Container, Header, HeaderContent, Name, TabLink, Tabs, Title } from './LayoutStyles'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const activeTab = useAppSelector(state => state.tabs)
    const dispatch = useAppDispatch()

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Title>Teste Serasa</Title>
                    <Name>Olá, Usuário</Name>
                </HeaderContent>
            </Header>

            <Tabs>
                <TabLink
                    to="/cadastro"
                    active={activeTab === 'cadastro' ? 'true' : 'false'}
                    onClick={() => dispatch(setActiveTab('cadastro'))}
                >
                    Cadastro
                </TabLink>
                <TabLink
                    to="/dashboard"
                    active={activeTab === 'dashboard' ? 'true' : 'false'}
                    onClick={() => dispatch(setActiveTab('dashboard'))}
                >
                    Dashboard
                </TabLink>
            </Tabs>

            <div>{children}</div>
        </Container>
    )
}

export default Layout
