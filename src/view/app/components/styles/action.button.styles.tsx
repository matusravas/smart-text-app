import styled, { css } from "styled-components"

interface ActionButtonProps {
    backgroundColor?: string
}

export const ActionButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
`

export const ActionButton = styled.button<ActionButtonProps>`
    padding: 8px;
    width: fit-content;
    height: 60px;
    outline: none;
    padding: 0px 100px;
    border-style: none;
    border-radius: 6px;
    box-sizing: border-box;
    font-weight: bolder;
    background: ${props => props.disabled ? '#f0f0f0' : props.backgroundColor ? props.backgroundColor : 'transparent'};
    :hover {
        ${(props) =>
        !props.disabled && css`
                cursor: pointer;
                ${!props.backgroundColor && css`
                    background: #f0f0f0;
                `
            };
                ${props.backgroundColor && css`
                filter: brightness(90%);
                `
            }
        `
        }   
    }
`