import { List, ListItem, ListItemIcon, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerItem } from '../../../hooks/commons/router';
import { SidebarWrapper } from './styles/sidebar.styles';


type AppBarProps = {
    drawerItems: DrawerItem[]
}

export default function Sidebar({ drawerItems, ...props }: AppBarProps) {
    const navigate = useNavigate()
    const [toggleDrawer, setToggleDrawer] = useState(false)
    return (
        <SidebarWrapper onMouseEnter={() => setToggleDrawer(true)} onMouseLeave={() => setToggleDrawer(false)}>
            <List style={{ display: toggleDrawer ? 'flex' : 'none', alignItems: 'center', flexDirection: 'column' }}>
                {drawerItems.map(item => (
                    <Tooltip style={{ width: '60px' }} title={<h3>{item.label}</h3>} placement="right">
                        <ListItem key={item.label} button onClick={() => {
                            navigate(item.path)
                        }} >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </SidebarWrapper>
    )
}