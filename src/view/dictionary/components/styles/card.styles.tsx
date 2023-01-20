import styled from "styled-components";


export const CardWrapper = styled.div`
    display: flex;
    padding: 16px;
    /* text-align: center; */
    width: 200px;
    height: 300px;
    overflow: hidden;
    z-index: 0;
    flex-direction: column;
    background-color: #fafafa;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px #004ba033;
    /* h4 {
        display: list-item;
        margin-left : 1em;
    } */
    :hover {
        cursor: pointer;
        box-shadow: 0 0 15px 2px #30303033
    }
`