import styled from "styled-components";


export const StyledSearchBarWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Icon = styled.img`
position: absolute;
right: 5px;
height: 100px
`

export const SearchInput = styled.input.attrs({
  id: 'searchPhrase',
  type: 'text',
})`
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 5vh;
  padding: 0 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 20px;
  outline: none
`;


export const SearchButton = styled.input.attrs({
  id: 'submit',
  type: 'submit',
  value: 'Search'
})`
  margin: 1em 0;
  width: 200px;
  height: 30px;
  fontSize: 1em;
  textAlign: center;
  type: submit;
  id: submit; 
  value: Search; 
`;