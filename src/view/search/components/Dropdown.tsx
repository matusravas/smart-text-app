import { ChangeEvent, useState } from "react"
import { Operator } from "../../../model/search/types"
import { SelectWrapper } from "../styles/searchbar.styles"
import { Select, MenuItem, SelectProps, FormControl, InputLabel, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
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

// export const SelectButton = <T,>({ options, selected, onSelected, disabled=false, ...props }: SelectButtonProps<T>) => {
//     const selectedValue = selected && options.findIndex(o=>o.value===selected) !== -1? selected : options[0].value
//     const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
//         const { target: { value } } = e
//         const option = options.find(o => o.value === value)
//         option && onSelected(option.value as T)
//     }
//     return (
//         <SelectWrapper >
//             <label>{props.label}</label>
//             <select disabled={disabled} onChange={handleSelect} value={selectedValue}>
//                 {options.map((option, idx) => {
//                     return <option key={idx} value={option.value}>{option.label}</option>
//                 })}
//             </select>
//         </SelectWrapper>
//     )
// }


export const SelectButton = <T,>({ options, value, onSelected, ...props }: SelectButtonProps<T>) => {
    const styles = useStyles()
    const handleSelect = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const { target: { value } } = e
        const option = options.find(o => o.value === value)
        option && onSelected(option.value as T)
    }
    return (
        <FormControl>
            <InputLabel className={styles.label}>{props.label}</InputLabel>
            <Select
                className={styles.select}
                disabled={props.disabled}
                value={value}
                onChange={(e) => {
                    handleSelect(e)
                }}>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}