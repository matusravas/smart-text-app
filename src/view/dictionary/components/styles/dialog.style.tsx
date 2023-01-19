import styled from "styled-components"

export const DialogWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
    display: flex; /* hidden by default */
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DialogContent = styled.div`
    /* position: relative; */
    /* margin: 10% auto; */
    /* background-color: white;
    padding: 20px; */
    position: absolute;
    box-shadow: 0px 0px 5px #333;
    border-radius: 10px;
    display: flex;
    padding: 16px;
    width: 50%;
    height: 60%;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    /* border-radius: 10px; */
    /* box-shadow: 0 0 10px 1px #004ba033; */
`

export const ActionButtonsWrapper = styled.div`
    position: relative;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    width: 100%;
    /* height: 100%; */
    align-self: flex-end !important;
    justify-content: space-between;
`

export const ActionButton = styled.button`
    padding: 8px;
    width: 100%;
    outline: none;
    border-style: none;
    border-radius: 8px;
    /* align-self: flex-end; */
    /* background-color: #fafafa; */
    font-weight: bolder;
    :hover {
        cursor: pointer;
        box-shadow: 0 0 10px 2px #004ba033
    }
`