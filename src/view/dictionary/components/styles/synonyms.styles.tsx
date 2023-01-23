import styled from "styled-components"
import { FormInput } from "../../../app/components/styles/form.styles"

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

export const SynonymInput = styled(FormInput)`
    font-size: 1em;
    font-weight: 250;
    display: inline-block;
    width: auto;
    background: #f1f1f1;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #004ba066;
`