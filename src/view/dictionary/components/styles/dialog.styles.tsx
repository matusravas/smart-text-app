import styled from "styled-components"

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
    animation: all 0.5s ease-in-out;
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

// export const DialogContentWrapper = styled.div`
//     position: relative;
//     box-shadow: 0px 0px 5px #333;
//     border-radius: 10px;
//     width: 50%;
//     height: 60%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: #fafafa;
//     overflow: hidden;
//     padding: 64px;
//     transition: all 2s ease-in-out;
// `

export const DialogContent = styled.div`
    box-shadow: 0px 0px 5px #333;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    overflow: auto;
    padding: 64px;
`

// export const DialogCancelButton = styled.div`
//     position: absolute;
//     top: 0px;
//     right: 0px;
// `

export const ActionButtonsWrapper = styled.div`
    position: absolute;
    display: inline-grid;
    justify-items: center;
    grid-template-columns: 1fr;
    bottom: 16px;
    width: 100%;
    box-sizing: border-box;
`

interface ActionButtonProps {
    backgroundColor?: string
}

export const ActionButton = styled.button<ActionButtonProps>`
    padding: 8px;
    width: fit-content;
    height: 60px;
    outline: none;
    padding: 0px 100px;
    border-style: none;
    border-radius: 6px;
    box-sizing: border-box;
    /* border: 1px solid ${props => props.backgroundColor ? props.backgroundColor: '#004ba033'}; */
    font-weight: bolder;
    background: ${props => props.backgroundColor ? props.backgroundColor: '#3c9040'};
    /* transition: all 0.2s ease-in-out; */
    :hover {
        cursor: pointer;
        filter: brightness(110%);
        /* transform: scale(1.1); */

        /* font-size: medium; */
        /* box-shadow: 0 0 10px 2px #004ba033 */
    }
`

type DialogFormProps = {
    editable: boolean
}

export const DialogForm = styled.form<DialogFormProps>`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    pointer-events: ${p => !p.editable && 'none'};
    input {
        text-align: center;
        background: transparent;
        border: none;
        outline: none;
        padding: 16px;
        overflow: hidden;
        width: auto;
        box-shadow: 2px 2px 5px #004ba033;
        ${p => p.editable && `{
                color: black;
                //overflow: hidden;
                //box-sizing: content-box;
                
            }`
    }
        ::placeholder {
            color: rgba(0,0,0,0.54)
        }
    };
    /* .header, .sub-header {
            width: 100%;
            ${p => p.editable && `{
                 //border-bottom: 2px solid #004ba0;
                }`
    };
        }; */
    .header, .sub-header, .word {
        @keyframes pulse {
            0% {
            transform: scale(1, 1);
            }

            50% {
            transform: scale(1.05, 1.05);
            }

            100% {
            transform: scale(1, 1);
            }
        };
        ${p => p.editable && `{
            background: #f1f1f1;
            box-shadow: 2px 2px 5px #004ba033;
            :hover, :focus {
                box-shadow: 2px 2px 5px #004ba066;
                animation: pulse 0.5s linear 1;
                //box-shadow: 0 0 15px 2px #30303033
            }
            }`
    }
        

    }
    /* .word {
        background: #f2f2f2;
        border-radius: 10px;
        padding: 16px;
        box-shadow: 2px 2px 5px #004ba033;
            ${p => p.editable && `{
                background: #f2f2f2;
                border-radius: 10px;
                padding: 16px;
                box-shadow: 2px 2px 5px #004ba033;

                }`
    }
        }; */
`

// export const DialogGrid = styled.div`
//     /* width: 100%; */
//     display: grid;
//     align-items: center;
//     box-sizing: border-box;
//     grid-template-columns: 1fr 1fr;
//     /* text-transform: capitalize; */
// `

export const DialogLabel = styled.p`
    font-size: 1.1em;
    font-weight: 300;
    text-align: left;
    padding: 6;
    margin: 0;
    /* text-decoration: underline;
    text-decoration-color: currentColor; */
`

export const DialogHeader = styled.input`
    font-size: 2.25em;
    font-weight: 600;
    overflow: hidden;
    width: auto;
    /* text-transform: capitalize; */
`

export const DialogSubHeader = styled.input`
    font-size: 2em;
    font-weight: 400;
`


export const Divider = styled.div`
    /* height: 1px; */
    background: transparent;
    padding: 0px !important;
    border: 1px solid #004ba066;
    /* box-shadow: 10px 10px 5px #004ba066; */
`

export const SynonymsWrapper = styled.div`
    padding: 8px !important;
    display: flex;
    flex-wrap: wrap;
    width: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const SynonymInput = styled.input`
    font-size: 1em;
    font-weight: 250;
    display: inline-block;
    width: auto;
    background: #f1f1f1;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #004ba066;
`