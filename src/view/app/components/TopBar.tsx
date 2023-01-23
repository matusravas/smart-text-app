import { AppBar as MUIAppBar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DrawerItem } from '../../../hooks/commons/router';
import Drawer from './Drawer';


type AppBarProps = {
  drawerItems: DrawerItem[]
}

export default function AppBar({ drawerItems, ...props }: AppBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = (isOpen: boolean) => {
    setDrawerOpen(isOpen)
  }
  return (
    <Box style={{ flexGrow: 1 }}>
      {/* <MUIAppBar position="static" style={{'height': '80px', 'background': '#fcfcfc', 'color': '#303030'}}> */}
      <MUIAppBar position="static" color='transparent'>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
            <Drawer items={drawerItems} open={drawerOpen} handleOpen={handleDrawerOpen} />
          </IconButton>
          <Link to='/'>
            <img style={{height: '35px'}} src='/img/bekaert-logo.svg' alt='PDS'/>
          </Link>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}