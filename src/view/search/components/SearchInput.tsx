import React, { ChangeEvent, CSSProperties, InputHTMLAttributes } from "react";
import { SearchInput as SearchInputStyled, SearchInputWrapper, StyledInputProps } from "../styles/searchbar.styles";

interface SearchInputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    style?: CSSProperties
    inputProps?: StyledInputProps
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
        <SearchInputWrapper id="search-input-wrapper" style={{width: '100%', ...props.style}}>
            <SearchInputStyled {...props.inputProps} spellCheck={false} value={props.value} onChange={props.onChange} />
            {renderStartAdornment}
            {renderEndAdornment}
        </SearchInputWrapper>
    )
}