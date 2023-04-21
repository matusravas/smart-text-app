import { CircularProgress, Menu, MenuItem, MenuProps } from '@material-ui/core';
import { CSSProperties, useState, forwardRef } from "react";
import { Button, MenuLabel, MenuLabelWrapper, MenuSubLabel } from '../styles/searchbar.toolbar.styles';

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

interface ComponentsProps {
    style: CSSProperties
    options: MenuOption[]
    // onClose: () => void
}

interface Components {
    Button?: React.ComponentType<{ onOpen: (event: React.MouseEvent<any>) => void, isLoading: boolean }>
    Header?: React.ComponentType<ComponentsProps>
    Footer?: React.ComponentType<ComponentsProps>
}

interface MenuStyles {
    Button?: CSSProperties
    Container?: CSSProperties
    Item?: {
        Container?: CSSProperties
        Label?: CSSProperties
        SubLabel?: CSSProperties
    }
    SubItem?: CSSProperties
}

type MenuButtonProps = {
    value: string
    id?: string
    label?: string
    disabled?: boolean
    menuProps?: MenuProps
    hidden?: boolean
    components?: Components
    styles: MenuStyles
    onSelected: (value: MenuOption) => void
    onError?: (errMsg: string) => void
} & (MenuButtonDynamic | MenuButtonStatic)


export const MenuButton = ({ onError, ...props }: MenuButtonProps) => {
    const { Header, Footer, Button: ButtonOverriden } = props.components || {}
    const label = props.label !== undefined ? props.label : props.value
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<MenuOption[]>(props.options || []);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                        <MenuLabelWrapper style={{ ...props.styles.Item?.Container }}>
                            <MenuLabel style={{ ...props.styles.Item?.Label }}>
                                {option.label}
                            </MenuLabel>
                            {option.subLabel &&
                                <MenuSubLabel style={{ ...props.styles.Item?.SubLabel }}>
                                    {option.subLabel}
                                </MenuSubLabel>}
                        </MenuLabelWrapper>
                    </MenuItem>
                )
            })
        )
    }

    const componentsProps = {
        options: [...options]
        // , onClose: handleClose
    }

    const HeaderElement = forwardRef((props, ref) => {
        return (
            Header ? <Header style={{}} {...componentsProps} /> : null
        )
    })
    
    const FooterElement = forwardRef((props, ref) => {
        return (
            Footer ? <Footer style={{ marginBottom: '-8px' }} {...componentsProps} /> : null
        )
    })

    return (
        <>
            {
                ButtonOverriden
                    ?
                    <ButtonOverriden onOpen={handleOpen} isLoading={loading} />
                    :
                    <Button
                        disabled={loading || props.disabled}
                        style={{ ...props.styles.Button, ...(props.hidden && { visibility: 'hidden' }) }}
                        aria-controls={`${props.id ? props.id : 'select'}-menu`}
                        aria-haspopup="true"
                        onClick={handleOpen}
                    >
                        {loading
                            ? <CircularProgress size={22} style={{ color: '#1AB5F1' }} />
                            : <span style={{ fontWeight: 'bolder' }}>{label}</span>
                        }
                    </Button>
            }
            <Menu
                {...props.menuProps}
                id={`${props.id ? props.id : 'select'}-menu`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {...props.styles.Container}
                }}
            >
                <HeaderElement />
                {renderMenuItems()}
                <FooterElement />
            </Menu>
        </>
    );
}