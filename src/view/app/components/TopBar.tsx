import { AppBar as MUIAppBar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DrawerItem } from '../../../hooks/commons/router';
import Drawer from './Drawer';
import { SidebarWrapper } from './styles/sidebar.styles';


type AppBarProps = {
  drawerItems: DrawerItem[]
}

export default function AppBar({ drawerItems, ...props }: AppBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = (isOpen: boolean) => {
    setDrawerOpen(isOpen)
  }
  return (
    <SidebarWrapper>
      {drawerItems.map(item=>{
        return <p>{item.label}</p>
      })}
    </SidebarWrapper>
  )
  // return (
  //   <Box style={{ flexGrow: 1 }}>
  //     {/* <MUIAppBar position="static" style={{'height': '80px', 'background': '#fcfcfc', 'color': '#303030'}}> */}
  //     <MUIAppBar position="static" color='transparent'>
  //       <Toolbar>
  //         <IconButton
  //           edge="start"
  //           color="inherit"
  //           aria-label="menu"
  //           onClick={() => setDrawerOpen(!drawerOpen)}
  //         >
  //         <Drawer items={drawerItems} open={drawerOpen} handleOpen={handleDrawerOpen} />
  //           <MenuIcon />
  //         </IconButton>
  //         <Link to='/'>
  //           <img style={{height: '20px'}} src='/img/pds-logo.svg' alt='PDS'/>
  //         </Link>
  //       </Toolbar>
  //     </MUIAppBar>
  //   </Box>
  // );
}