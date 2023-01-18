// import './App.css';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { drawerConfig } from '../../hooks/commons/router';
import AppBar from './components/TopBar';

const MainWrapper = styled.main`
    padding: 16px;
    height: 100%;
    /* background-image: url(img/my-background.svg);
    background-position: 0px 100%;
    background-repeat: no-repeat; */
`

export const Dashboard = () => {
    return (
        <>
            <AppBar drawerItems={drawerConfig} />
            <MainWrapper>
                <Outlet />                
            </MainWrapper>
        </>
    );
}

export default Dashboard;
