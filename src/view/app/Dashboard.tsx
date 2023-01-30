// import './App.css';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { drawerConfig } from '../../hooks/commons/router';
import SearchBar from '../dictionary/components/SearchBar';
import Sidebar from './components/Sidebar';
import AppBar from './components/TopBar';

const MainWrapper = styled.main`
    transition: margin-left .5s;
    padding: 16px;
    /* height: 100%; */
    /* background-image: url(img/my-background.svg);
    background-position: 0px 100%;
    background-repeat: no-repeat; */
`

export const Dashboard = () => {
    // Todo add global (same) search bar for both Search & Dictionary dashbaords 
    return (
        <>
            {/* <AppBar drawerItems={drawerConfig} /> */}
            <Sidebar drawerItems={drawerConfig}/>
            <MainWrapper>
                {/* <SearchBar searchQuery={''} handleSearchQueryChange={()=>{}}/> */}
                <Outlet />                
            </MainWrapper>
        </>
    );
}

export default Dashboard;
