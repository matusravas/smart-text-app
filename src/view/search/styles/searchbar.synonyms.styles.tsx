import styled from "styled-components"

export const SearchBarSynonymsWrapper = styled.div`
  display: flex;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  gap: 5px;
  .p {
    font-weight: bold;
  }
`

interface SynonymParagraphProps {
  use: boolean
}

export const SynonymParagraph = styled.p<SynonymParagraphProps>`
    font-size: 1em;
    font-weight: 250;
    /* display: inline-block; */
    /* width: auto; */
    color: black;
    padding: 6px;
    background: #f0f0f0;
    /* box-sizing: border-box; */
    border-radius: 10px;
    margin: 2px;
    font-weight: 500;
    text-decoration: ${props => !props.use ? 'line-through' : 'none'};
`

export const SwitchWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const SynonymsWrapper = styled.div`
  display: flex;
  height: auto;
  flex: 2;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  justify-content: flex-start;
`