import { CircularProgress, Menu, MenuItem } from '@material-ui/core';
import { CSSProperties, useState } from "react";
import { MenuSubmitButton, MenuLabel, MenuLabelWrapper, MenuSubLabel } from '../styles/searchbar.toolbar.styles';

export type MenuOption = {
    label: string,
    value: string,
    subLabel?: string
}

type MenuButtonDynamic = {
    dynamic: true
    options?: MenuOption[]
    optionsFetcher?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuOption[]>
    onOptionsFetched?: (options: MenuOption[]) => void
}

type MenuButtonStatic = {
    dynamic?: false
    options: MenuOption[]
}


type MenuButtonProps = {
    value: string
    onError?: (errMsg: string) => void
    title?: string
    label?: string
    onSelected: (value: MenuOption) => void
    disabled?: boolean
    visible?: boolean
    titleItem?: boolean
    buttonStyles?: CSSProperties
    menuStyles?: CSSProperties
} & (MenuButtonDynamic | MenuButtonStatic)


export const MenuButton = ({ onError, ...props }: MenuButtonProps) => {
    const title = props.title ? props.title.toString().toLowerCase() : 'item'
    const label = props.label !== undefined ? props.label : props.value
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<MenuOption []>(props.options || []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const e = { ...event }
        if (props.dynamic && props.optionsFetcher) {
            setLoading(true)
            props.optionsFetcher(e)
                .then(res => {
                    setOptions(res)
                    props.onOptionsFetched && props.onOptionsFetched(res)
                })
                .catch(err => {
                    setOptions([])
                    onError && onError('Failed obtaining menu items')
                })
                .finally(() => {
                    setLoading(false)
                    setAnchorEl(e.currentTarget);
                })
        }
        else setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemSelected = (option: MenuOption) => {
        setAnchorEl(null);
        props.value !== option.value && props.onSelected(option)
    };

    const renderMenuItems = () => {
        return (
            options.map(option => {
                return (
                    <MenuItem key={option.value} value={option.value} onClick={() => handleMenuItemSelected(option)}>
                        <MenuLabelWrapper>
                            <MenuLabel>{option.label}</MenuLabel>
                            {option.subLabel && <MenuSubLabel>{option.subLabel}</MenuSubLabel>}
                        </MenuLabelWrapper>
                    </MenuItem>
                )
            })
        )
    }

    return (
        <>
            <MenuSubmitButton
                disabled={loading || props.disabled}
                style={{ ...props.buttonStyles, ...(props.visible === false && { display: 'none' }) }}
                aria-controls={`${title}-menu`}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {loading
                    ? <CircularProgress size={22} style={{ color: '#1AB5F1' }} />
                    : <span style={{ fontWeight: 'bolder' }}>{label}</span>
                }
            </MenuSubmitButton>
            <Menu
                id={`${title}-menu`}
                anchorEl={anchorEl}
                style={{ ...props.menuStyles }}
                PaperProps={{
                    style: {
                        minWidth: 'fit-content'
                    }
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.titleItem && <MenuItem disabled value={''}>
                    {`Select ${title}`}
                </MenuItem>}
                { renderMenuItems() }
            </Menu>
        </>
    );
}