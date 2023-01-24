import styled, { css } from "styled-components"

interface ControlledInputProps {
    editable?: boolean
    error?: boolean
    errorText?: string
    required?: boolean
}

export const FormInput = styled.input`
    text-align: center;
    background: ${props => !props.disabled ? 'transparent' : '#f0f0f0'};
    border: none;
    outline: none;
    padding: 16px;
    overflow: hidden;
    width: auto;
    box-shadow: 2px 2px 5px #004ba033;
    ::placeholder {
        color: #00000090
    };
    ${props => !props.disabled! && css`
        :hover, :focus {
            box-shadow: 2px 2px 5px #004ba070;
            /* animation: pulse 0.5s linear 1; */
        }
    `}
`


export const FormControlledInput = styled.div<ControlledInputProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
        border: ${props => props.error ? '2px solid #b61827' : 'none'};
    }
    p {
        align-self: flex-start;
        ::after {
            ${props => props.required && css`
                content: '*';
            `};
            ${props => props.error &&
                css`
                    content: ' Required property';
                    color: #b61827;
                    font-weight: 500;
                `
            };
        };
    };
`

export const FormLabel = styled.p`
    font-size: 1.1em;
    font-weight: 300;
    text-align: left;
    padding-bottom: 6px;
    margin: 0;
`

export const FormHeader = styled(FormInput)`
    font-size: 2.25em;
    font-weight: 600;
    overflow: hidden;
    width: auto;
`

export const FormSubHeader = styled(FormInput)`
    font-size: 2em;
    font-weight: 400;
`