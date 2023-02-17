import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import { useEffect, useState } from "react";
import { MenuButtonWrapper } from '../styles/searchbar.toolbar.styles';


const useStyles = makeStyles({
    menu: {
        display: 'flex',
        alignItems: 'center',
    },
    select: {
        textAlign: 'center',
        '&:before': {
            borderColor: 'black',
        },
        '&:after': {
            borderColor: 'black',
        }
    },
    label: {
        textAlign: 'left',
    },
});

export interface MenuButtonOption {
    label: string,
    value: string,
}

type MenuButtonProps<T> = {
    title?: string
    // disabled?: boolean,
    // selected?: string,
    value?: string
    options: MenuButtonOption[]
    onSelected: (value: T) => void
    titleItem?: boolean
}


export const MenuButton = <T,>({ options, onSelected, ...props }: MenuButtonProps<T>) => {
    const title = props.title ? props.title.toString().toLowerCase() : 'item'
    // const [label, setLabel] = useState('N/A')
    // useEffect(()=>{
    //     setLabel(options.length > 0 ? options[0].label : 'N/A')
    // }, [options])
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (value: MenuButtonOption) => {
        setAnchorEl(null);
        console.log(value)
        // setLabel(value.label)
        onSelected(value.value as T)
    };
    return (
        <div>
            <MenuButtonWrapper aria-controls={`${title}-menu`} aria-haspopup="true" style={{color: '#303030'}} onClick={handleClick}>
                <span style={{fontWeight: 'bolder'}}> {props.value}</span>
            </MenuButtonWrapper>
            <Menu
                id={`${title}-menu`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.titleItem && <MenuItem disabled value={''}>
                    {`Select ${title}`}
                </MenuItem>}
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value} onClick={() => handleMenuItemClick(option)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}