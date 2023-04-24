import { Checkbox, CircularProgress, Menu, MenuItem, MenuProps } from '@material-ui/core';
import { CSSProperties, forwardRef, useState } from "react";
import { Button, MenuItemCheckboxWrapper, MenuLabel, MenuLabelWrapper, MenuSubLabel } from '../styles/searchbar.toolbar.styles';


export type MenuCheckboxOption = {
    label: string,
    value: string,
    subLabel?: string
    checked: boolean
}

type MenuButtonCheckboxDynamic = {
    dynamic: true
    options?: MenuCheckboxOption[]
    optionsFetcher?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<MenuCheckboxOption[]>
    onOptionsFetched?: (options: MenuCheckboxOption[]) => void
}

type MenuButtonCheckboxStatic = {
    dynamic?: false
    options: MenuCheckboxOption[]
}

interface ComponentsProps {
    style: CSSProperties
    options: MenuCheckboxOption[]
    onClose: () => void
    onReset: () => void
}

interface Components {
    Button?: React.ComponentType<{onOpen: (event: React.MouseEvent<any>) => void, isLoading: boolean}>
    Header?: React.ComponentType<ComponentsProps>
    Footer?: React.ComponentType<ComponentsProps>
}

interface MenuCheckboxStyles {
    Button?: CSSProperties
    Checkbox?: CSSProperties
    Container?: CSSProperties
    Item?: {
        Container?: CSSProperties
        Label?: CSSProperties
        SubLabel?: CSSProperties
    }
}

type MenuButtonCheckboxProps = {
    id?: string
    label?: string
    disabled?: boolean
    hidden?: boolean
    forcedIndices?: number[]
    menuProps?: MenuProps
    components?: Components
    styles: MenuCheckboxStyles
    onChecked?: (value: MenuCheckboxOption) => void
    onError?: (errMsg: string) => void
    onSubmit?: (options: MenuCheckboxOption[]) => void
} & (MenuButtonCheckboxDynamic | MenuButtonCheckboxStatic)


export const MenuButtonCheckbox = ({ onError, ...props }: MenuButtonCheckboxProps) => {
    const { Header, Footer, Button: ButtonOverriden } = props.components || {}
    const label = props.label !== undefined ? props.label : 'Select'
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<MenuCheckboxOption[]>(props.options || []);

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
                    onError && onError('Failed obtaining checkbox menu items')
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

    const handleMenuItemClick = (option: MenuCheckboxOption) => {
        let checkedItems = options.map(it => {
            return it.value === option.value ? { ...it, checked: !it.checked } : it
        })
        // if (props.forcedIndices) {
        //     const nCheckedItems = checkedItems.filter(it => it.checked).length
        //     console.log(nCheckedItems)
        //     if (!nCheckedItems) {
        //         props.forcedIndices.map(it => {
        //             const item = checkedItems.at(it) 
        //             console.log(item) //false
        //             console.log(option) //true
        //             // item && item.checked && (props.onChecked(item))
        //             item && (item.checked = true)
        //             // if (item && option.checked !== !item.checked) {
        //             //     props.onChecked(item)
        //             //     item.checked = true
        //             // }
        //         })
        //         setOptions(checkedItems)
        //         return
        //     }
        // }
        setOptions(checkedItems)
        props.onChecked && props.onChecked(option)
    }


    const handleReset = () => {
        let newOptions = options.map(it => {
            return { ...it, checked: false }
        })

        if (props.forcedIndices) {

            props.forcedIndices.forEach(it => {
                const exists = options.at(it)
                exists && (newOptions[it].checked = true)
            })
        }
        setOptions(newOptions)
    }

    // const handleSubmit = () => {
    //     setAnchorEl(null);
    //     props.onSubmit!(options)
    // }

    const renderCheckboxMenuItems = () => {
        return (
            options.map(option => {
                return (
                    <MenuItem style={{ paddingRight: '6px' }} key={option.value} value={option.value} onClick={() => { handleMenuItemClick(option) }}>
                        <MenuItemCheckboxWrapper style={{ ...props.styles.Item?.Container }}>
                            <MenuLabelWrapper>
                                <MenuLabel style={{ ...props.styles.Item?.Label }}>
                                    {option.label}
                                </MenuLabel>
                                {option.subLabel &&
                                    <MenuSubLabel style={{ ...props.styles.Item?.SubLabel }}>
                                        {option.subLabel}
                                    </MenuSubLabel>}
                            </MenuLabelWrapper>
                            <Checkbox checked={option.checked} style={{ marginLeft: '20px', ...props.styles.Checkbox }} />
                        </MenuItemCheckboxWrapper>
                    </MenuItem>
                )
            })
        )
    }

    const componentsProps = {
        options: [...options]
        , onReset: handleReset
        , onClose: handleClose
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
                    <ButtonOverriden onOpen={handleOpen} isLoading={loading}/>
                    :
                    <Button
                        disabled={loading || props.disabled}
                        style={{ ...props.styles.Button, ...(props.hidden && { visibility: 'hidden' }) }}
                        aria-controls={`${props.id ? props.id : 'checkbox'}-menu`}
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
                id={`${props.id ? props.id : 'checkbox'}-menu`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {...props.styles.Container}
                }}
                // style={{...props.styles.Container}}
            >
                <HeaderElement />
                {renderCheckboxMenuItems()}
                <FooterElement />
            </Menu>
        </>
    );
}