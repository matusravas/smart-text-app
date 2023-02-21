import React, { CSSProperties, useRef } from "react";
import { SearchInputWrapper, SearchInput as SearchInputStyled } from "../styles/searchbar.styles";

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    startAdornment?: (styles: CSSProperties) => React.ReactNode
    endAdornment?: (styles: CSSProperties) => React.ReactNode
}


export function SearchInput(props: SearchInputProps) {
    function renderAdornment(position: 'start' | 'end', renderCallback: (styles: CSSProperties) => React.ReactNode) {
        switch (position) {
            case 'start': {
                return (
                    <>
                        {renderCallback({ position: 'absolute', top: `9px`, left: '16px' })}
                    </>
                )
            }
            case 'end': {
                return (
                    <>
                        {renderCallback({ position: 'absolute', top: `9px` , right: '8px' })}
                    </>
                )
            }
        }
    }

    const renderStartAdornment = props.startAdornment ? renderAdornment('start', props.startAdornment) : null
    const renderEndAdornment = props.endAdornment ? renderAdornment('end', props.endAdornment) : null

    return (
        <SearchInputWrapper id="search-input-wrapper">
            <SearchInputStyled value={props.value} onChange={(e) => props.onChange(e.target.value)} />
            {renderStartAdornment}
            {renderEndAdornment}
        </SearchInputWrapper>
    )
}