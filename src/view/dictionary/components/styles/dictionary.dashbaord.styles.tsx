import styled from "styled-components";

interface DictionaryWrapperProps {
    size: number;
}

export const DictionaryWrapper = styled.div<DictionaryWrapperProps>`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center; //${props => props.size < 4 ? 'start' : 'center'};
`