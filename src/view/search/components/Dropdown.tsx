import { ChangeEvent, useState } from "react"
import { Operator } from "../../../model/search/types"

export interface SelectButtonOption {
    label: string,
    value: string,
}

interface SelectButtonProps<T> {
    label: string,
    disabled?: boolean,
    selected?: string,
    options: SelectButtonOption[]
    onSelected: (value: T) => void
}

export const SelectButton = <T,>({ options, selected, onSelected, disabled=false, ...props }: SelectButtonProps<T>) => {
    const selectedValue = selected && options.findIndex(o=>o.value===selected) !== -1? selected : options[0].value
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = e
        const option = options.find(o => o.value === value)
        option && onSelected(option.value as T)
    }
    return (
        <div>
            <label>{props.label}</label>
            <select disabled={disabled} onChange={handleSelect} value={selectedValue}>
                {options.map((option, idx) => {
                    return <option key={idx} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}