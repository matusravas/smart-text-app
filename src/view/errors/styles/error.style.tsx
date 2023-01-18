import styled from "styled-components"

export const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background-image: url(/img/error-background.jpg);
    background-size: cover; 
    background-repeat: no-repeat;
    height: 100vh;
    width: auto;
    .image-container {
        margin-top: 16px;
        display: flex;
        justify-content: center
    };
    .image {
        max-width: 100%;
        width: 560;
        max-height: 300;
        height: auto
    };
    .button-container {
        margin-top: 16px;
        display: flex;
        justify-content: center
    }
`