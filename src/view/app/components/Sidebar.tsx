import { Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { DrawerItem } from '../../../hooks/commons/router';
import { SidebarWrapper } from './styles/sidebar.styles';


type AppBarProps = {
    drawerItems: DrawerItem[]
}

export default function Sidebar({ drawerItems, ...props }: AppBarProps) {
    const navigate = useNavigate()
    // return (
    //     <SidebarWrapper>
    //             {drawerItems.map(item => {
    //                 return <p></p>
    //             })}
    //     </SidebarWrapper>
    // )
    return (
        <SidebarWrapper>
            <List style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                {drawerItems.map(item => (
                    <Tooltip style={{width: '60px'}} title={<h3>{item.label}</h3>} placement="right">

                    <ListItem key={item.label} button onClick={() => {
                        navigate(item.path)
                    }} >

                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        {/* <ListItemText primary={item.label} /> */}
                        {/* <Divider /> */}
                    </ListItem>
                    </Tooltip>

                ))}
            </List>
        </SidebarWrapper>
    )
}