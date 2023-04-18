import { Checkbox, CircularProgress, Menu, MenuItem } from '@material-ui/core';
import { CSSProperties, useState } from "react";
import { MenuButtonWrapper, MenuItemCheckboxWrapper, MenuLabel, MenuLabelWrapper, MenuSubLabel } from '../styles/searchbar.toolbar.styles';


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


type MenuButtonCheckboxProps = {
    value: string
    onError?: (errMsg: string) => void
    onChecked: (value: MenuCheckboxOption) => void
    onSubmit?: (options: MenuCheckboxOption[]) => void
    forcedIndicesOnNothingChecked?: number[]
    title?: string
    label?: string
    disabled?: boolean
    visible?: boolean
    titleItem?: boolean
    buttonStyles?: CSSProperties
    menuStyles?: CSSProperties
} & (MenuButtonCheckboxDynamic | MenuButtonCheckboxStatic)


export const MenuButtonCheckbox = ({ onError, ...props }: MenuButtonCheckboxProps) => {
    const title = props.title ? props.title.toString().toLowerCase() : 'item'
    const label = props.label !== undefined ? props.label : props.value
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<MenuCheckboxOption[]>(props.options || []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const e = { ...event }
        if (props.dynamic && props.optionsFetcher) {
            setLoading(true)
            props.optionsFetcher(e)
                .then(res => {
                    console.log(res)
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

    const handleMenuItemClick = (option: MenuCheckboxOption) => {
        let checkedItems = options.map(it => {
            return it.value === option.value ? { ...it, checked: !it.checked } : it
        })
        // if (props.forcedIndicesOnNothingChecked) {
        //     const nCheckedItems = checkedItems.filter(it => it.checked).length
        //     console.log(nCheckedItems)
        //     if (!nCheckedItems) {
        //         props.forcedIndicesOnNothingChecked.map(it => {
        //             const item = checkedItems.at(it)
        //             console.log(item)
        //             console.log(option)
        //             item && (item.checked = true)
        //             item && !option.checked && props.onChecked(item)
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
        props.onChecked(option)
    }

    const renderCheckboxMenuItems = () => {
        return (
            options.map(option => {
                return (
                    <MenuItem key={option.value} value={option.value} onClick={() => { handleMenuItemClick(option) }}>
                        <MenuItemCheckboxWrapper>
                            <MenuLabelWrapper>
                                <MenuLabel>{option.label}</MenuLabel>
                                {option.subLabel && <MenuSubLabel>{option.subLabel}</MenuSubLabel>}
                            </MenuLabelWrapper>
                            <Checkbox checked={option.checked} style={{ marginLeft: '10px' }} />
                        </MenuItemCheckboxWrapper>
                    </MenuItem>
                )
            })
        )
    }

    return (
        <>
            <MenuButtonWrapper
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
            </MenuButtonWrapper>
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
                {renderCheckboxMenuItems()}
                {props.onSubmit && <MenuButtonWrapper
                    onClick={() => props.onSubmit!(options)}
                    style={{ 
                        marginBottom: '-8px'
                        , width: '100%'
                        , borderRadius: 0
                        , backgroundColor: '#E5E5E5'
                        ,fontWeight: 600
                     }}
                     >
                    Submit
                </MenuButtonWrapper>}
            </Menu>
        </>
    );
}