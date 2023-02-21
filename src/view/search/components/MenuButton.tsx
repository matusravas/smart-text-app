import { Menu, MenuItem } from '@material-ui/core';
import { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, useState } from "react";
import { MenuButtonWrapper } from '../styles/searchbar.toolbar.styles';

export interface MenuButtonOption {
    label: string,
    value: string,
}

type MenuButtonProps<T> = {
    options: MenuButtonOption[]
    onSelected: (value: T) => void
    title?: string
    value?: string
    disabled?: boolean
    visible?: boolean
    titleItem?: boolean
    buttonStyles?: CSSProperties
    menuStyles?: CSSProperties
}


export const MenuButton = <T,>({ options, onSelected, ...props }: MenuButtonProps<T>) => {
    const title = props.title ? props.title.toString().toLowerCase() : 'item'
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
        onSelected(value.value as T)
    };
    return (
        <>
            <MenuButtonWrapper 
                disabled={props.disabled} 
                style={{...props.buttonStyles, ...(props.visible && {display: 'none'})}}
                aria-controls={`${title}-menu`} 
                aria-haspopup="true" 
                onClick={handleClick}
            >
                <span style={{ fontWeight: 'bolder' }}> {props.value}</span>
            </MenuButtonWrapper>
            <Menu
                id={`${title}-menu`}
                anchorEl={anchorEl}
                style={{...props.menuStyles}}
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
        </>
    );
}