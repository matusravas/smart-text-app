import styled from "styled-components"

export const DialogWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
    display: flex; /* hidden by default */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: all 0.2s ease-in-out;
    animation-name: slideIn;  
    @keyframes slideIn{
      from {
        opacity: 0;
        transform: translateY(100%-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
  }
`

export const DialogContentWrapper = styled.div`
    display: flex;
    background: #fafafa;
    /* padding: 32px; */
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

export const DialogContent = styled.div`
    display: flex;
    background: #fafafa;
    padding: 16px;
    border-radius: 10px;
    flex-direction: column;
    justify-content: end;
    align-items: center;
`

export const DialogText = styled.p`
    font-size: 1.1em;
`

export const DialogHeader = styled.h2`
    font-size: 1.3em;
`