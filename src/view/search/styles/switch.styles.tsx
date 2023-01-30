import styled from "styled-components";

export const SwitchWrapper = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    margin: 12px;
    width: 45px;
    padding: 0px;
    height: 22px;
    border-radius: 32px;
    background-color: #f0f0f0;
    border: 1px solid #f0f0f0;
    transition: all 0.4s ease-in-out;
    &:hover {
        cursor: pointer;
    }
`;

interface SwitchProps {
    toggle: boolean
}
export const Switch = styled.span<SwitchProps>`
    position: absolute;
    right: ${props => props.toggle ? '-1px' : '26px'};
    width: 27px;
    height: 27px;
    border-radius: 27px;
    background-color: ${props => props.toggle ? '#303030' : '#f0f0f0'};
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease-in-out;
`;

export const SwitchLabel = styled.p`
    font-size: 0.8em;
`