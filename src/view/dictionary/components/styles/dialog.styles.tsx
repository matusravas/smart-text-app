import styled, { css } from "styled-components"

export const DialogWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
    display: flex; /* hidden by default */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* &.visible { */
    /* display: block; */
    animation: all 0.2s ease-in-out;
    animation-name: slideIn;
  /* } */
  
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
    position: absolute;
    box-shadow: 0px 0px 5px #333;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-between;
    background-color: #fafafa;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px #fafafa;  */
    border-radius: 5px;
    padding: 6px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #f2f2f2; 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #f0f0f0; 
    }
    padding: 64px 64px 0px 64px;
`

export const DialogContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


type DialogFormProps = {
    editable: boolean
}

export const DialogForm = styled.form<DialogFormProps>`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    pointer-events: ${p => !p.editable && 'none'};
`