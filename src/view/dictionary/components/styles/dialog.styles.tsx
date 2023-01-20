import styled from "styled-components"

export const DialogWrapper = styled.div`
    position: fixed;
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
    div {
        padding: 32px;
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
    align-items: center;
    background-color: #fafafa;
`

export const DialogContent = styled.div`
    position: absolute;
    box-shadow: 0px 0px 5px #333;
    border-radius: 10px;
    width: 50%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
`

export const DialogCancelButton = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
`

export const ActionButtonsWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
`

export const ActionButton = styled.button`
    padding: 8px;
    width: 100%;
    outline: none;
    border-style: none;
    border-radius: 8px;
    font-weight: bolder;
    :hover {
        cursor: pointer;
        font-size: medium;
        box-shadow: 0 0 10px 2px #004ba033
    }
`

type DialogFormProps = {
    editable: boolean
}

export const DialogForm = styled.form<DialogFormProps>`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    pointer-events: ${p=> !p.editable && 'none'};
    input {
        text-align: center;
        background: transparent;
        border: none;
        outline: none;
        padding: 16px;
        box-shadow: 2px 2px 5px #004ba010;
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
        ${p => p.editable && `{
            background: #f1f1f1;
            box-shadow: 2px 2px 5px #004ba033;
            :hover, :focus {
                box-shadow: 2px 2px 5px #004ba066;
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

export const DialogHeader = styled.input`
    font-size: 2.5em;
    font-weight: 700;
    /* text-transform: capitalize; */
`

export const DialogSubHeader = styled.input`
    font-size: 2em;
    font-weight: 500;
`

export const DialogText = styled.input`
    font-size: 1em;
    font-weight: 250;
    display: inline-block;
    width: auto;
    background: #f1f1f1;
    box-sizing: border-box;
    border-radius: 10px;
`

export const Divider = styled.div`
    height: 1px;
    background: transparent;
    padding: 0px !important;
    box-shadow: 10px 10px 5px #004ba066;
`

export const SynonymsWrapper = styled.div`
    padding: 8px !important;
    display: flex;
    flex-wrap: wrap;
    width: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`