import {useState} from 'react';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { DrawerItem } from '../../../hooks/commons/router';
import { Navigate } from 'react-router-dom';

type DrawerProps = {
    items: DrawerItem[],
    open: boolean,
    handleOpen: (open: boolean) => void
}
export default function Drawer({items, open, handleOpen}: DrawerProps) {
  const list = () => (
    <Box
      style={{ width: 250 }}
      role="presentation"
    //   onClick={toggleDrawer(false)}
    //   onKeyDown={toggleDrawer(false)}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={item.label} button onClick={()=>{<Navigate to={item.route.path!}/>}} >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              <Divider />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} button>
              <ListItemIcon>
              <InboxIcon />

              </ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
        <>
          <SwipeableDrawer
            anchor={"left"}
            open={open}
            onClose={()=>handleOpen(false)}
            onOpen={()=>handleOpen(true)}
          >
            {list()}
          </SwipeableDrawer>
        </>
      
    </div>
  );
}