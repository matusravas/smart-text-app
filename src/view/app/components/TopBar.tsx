// import * as React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Box from '@material-ui/core/Box';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// // import {} from '@material-ui/icons/Menu';

// export default function TopBar() {
//   return (
//     <Box style={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>

//           <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

import { useState } from 'react';
import { AppBar as MUIAppBar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';
import { DrawerItem } from '../../../hooks/commons/router';


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
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Smart-Text
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}