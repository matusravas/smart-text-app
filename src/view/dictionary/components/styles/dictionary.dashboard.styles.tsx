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
    scrollbar-width: none;
    ::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
    /* &::-webkit-scrollbar {
        display: none;
    } */
`

export const FAB = styled.button`
    position: fixed;
    bottom: 64px;
    right: 64px;
    width: 80px;
    height: 80px;
    background-color: #43a047;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 45px;
    border: 0;
    outline: 0;
    z-index: 1;
    color: #fafafa;
    transition: all 0.2s ease-in-out;
    :hover {
        transform: scale(1.1);
        /* transition: transform 0.5s;
        transform: rotate(90deg); */
        cursor: pointer;
        box-shadow: 2px 2px 10px #43a04733;
    }
    ::before {
        content: "+";
    }
`