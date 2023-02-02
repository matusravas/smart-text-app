import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { drawerConfig } from '../../hooks/commons/router';
import Sidebar from './components/Sidebar';

const Wrapper = styled.div`
    padding: 16px;
`

export const Dashboard = () => {
    // Todo add global (same) search bar for both Search & Dictionary dashbaords 
    return (
        <main>
            <Sidebar drawerItems={drawerConfig}/>
            <Wrapper>
                <Outlet />                
            </Wrapper>
        </main>
    );
}

export default Dashboard;
