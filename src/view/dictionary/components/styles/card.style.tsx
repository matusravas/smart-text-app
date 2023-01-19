import styled from "styled-components";


export const CardWrapper = styled.div`
    display: flex;
    padding: 16px;
    width: 200px;
    height: 300px;
    overflow: hidden;
    z-index: 0;
    flex-direction: column;
    background-color: #fafafa;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px #004ba033;
    :hover {
        cursor: pointer;
        box-shadow: 0 0 15px 2px #30303033
    }
`

// export const CardActionButtonsWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
// `

// export const CardActionButton = styled.button`
//     padding: 8px;
//     width: 80px;
//     outline: none;
//     /* color: #fafafa; */
//     border-style: none;
//     /* background-color: #303030; */
//     border-radius: 8px;
//     :hover {
//         cursor: pointer;
//         box-shadow: 0 0 10px 2px #004ba033
//     }
// `