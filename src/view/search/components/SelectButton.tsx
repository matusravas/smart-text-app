import { FormControl, InputLabel, makeStyles, MenuItem, Select, SelectProps } from '@material-ui/core';
import { ChangeEvent, useState } from "react";


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
        },
    },
    label: {
        textAlign: 'left',
    },
});

export interface SelectButtonOption {
    label: string,
    value: string,
}

type SelectButtonProps<T> = {
    // label: string,
    // disabled?: boolean,
    // selected?: string,
    options: SelectButtonOption[]
    onSelected: (value: T) => void
} & SelectProps


export const SelectButton = <T,>({ options, value, onSelected, ...props }: SelectButtonProps<T>) => {
    const styles = useStyles()
    const handleSelect = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const { target: { value } } = e
        const option = options.find(o => o.value === value)
        option && onSelected(option.value as T)
    }
    return (
        <FormControl>
            <InputLabel >{props.label}</InputLabel>
            <Select
                disabled={props.disabled}
                value={value}
                MenuProps={{ className: styles.menu }}
                onChange={(e) => {
                    handleSelect(e)
                }}>
                <MenuItem disabled value={''}>
                    {'Select operator'}
                </MenuItem>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}