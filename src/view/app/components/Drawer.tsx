import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useNavigate } from 'react-router-dom';
import { DrawerItem } from '../../../router/router';

type DrawerProps = {
  items: DrawerItem[],
  open: boolean,
  handleOpen: (open: boolean) => void
}

export default function Drawer({ items, open, handleOpen }: DrawerProps) {
  const navigate = useNavigate()
  const renderDrawerListItems = () => (
    <Box
      style={{ width: 250 }}
      role="presentation"
    >
      <List>
        {items.map(item => (
          <ListItem key={item.label} button onClick={() => {
            navigate(item.path)
          }} >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => handleOpen(false)}
      onOpen={() => handleOpen(true)}
    >
      {renderDrawerListItems()}
    </SwipeableDrawer>
  );
}