import styled, {css} from "styled-components";

interface SnackbarWrapperProps {
    open: boolean,
    type: 'info' | 'success' | 'error',
    position?: string
    background?: string
}

export const SnackbarWrapper = styled.div<SnackbarWrapperProps>`
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    z-index: 999;
    display: ${props => props.open ? 'flex': 'none'};
    min-width: 280px;
    min-height: 30px;
    /* background: ${props => props.background ? props.background: '#398a20'}; */
    ${props => props.type === 'info' && css`background: #303030; color: #ffffff;`}
    ${props => props.type === 'success' && css`background: #398a20; color: #ffffff;`}
    ${props => props.type === 'error' && css`background: #c83d01; color: #ffffff;`}
    opacity: 90%;
    padding: 6px;
    border-radius: 6px;
    box-shadow: 2px 2px 30px #303030;
`

export const SnackbarText = styled.p`
    font-size: 1em;
    font-weight: bolder;
    /* color: #ffffff */
`