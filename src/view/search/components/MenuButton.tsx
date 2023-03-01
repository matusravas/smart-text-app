import { Menu, MenuItem } from '@material-ui/core';
import { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, useState } from "react";
import { MenuButtonWrapper } from '../styles/searchbar.toolbar.styles';

export interface MenuButtonOption {
    label: string,
    value: string,
}

type MenuButtonProps = {
    options: MenuButtonOption[]
    onSelected: (value: string) => void
    title?: string
    label?: string
    value: string
    disabled?: boolean
    visible?: boolean
    titleItem?: boolean
    buttonStyles?: CSSProperties
    menuStyles?: CSSProperties
}


export const MenuButton = ({ options, onSelected, ...props }: MenuButtonProps) => {
    const title = props.title ? props.title.toString().toLowerCase() : 'item'
    const label = props.label !== undefined ? props.label : props.value
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
        props.value !== value.value && onSelected(value.value)
    };
    return (
        <>
            <MenuButtonWrapper
                disabled={props.disabled}
                style={{ ...props.buttonStyles, ...(props.visible === false && { display: 'none' }) }}
                aria-controls={`${title}-menu`}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <span style={{ fontWeight: 'bolder' }}> {label}</span>
            </MenuButtonWrapper>
            <Menu
                id={`${title}-menu`}
                anchorEl={anchorEl}
                style={{ ...props.menuStyles }}
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