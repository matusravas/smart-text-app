import styled from "styled-components";


export const StyledSearchBarWrapper = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 55vh;
`;

export const Icon = styled.img`
position: absolute;
right: 5px;
height: 100px
`

export const SearchInput = styled.input.attrs({
  id: 'searchPhrase',
  type: 'text',
  placeholder: 'Search...'
})`
  position: relative;
  box-sizing: border-box;
  width: 40vw;
  height: 5vh;
  padding: 0 14px;
  border: 1px solid #303030;
  border-radius: 10px 0px 0px 10px ;
  font-size: 20px;
  outline: none;
  ::placeholder {
    color: #f6e0e0
  }
`;


export const SearchButton = styled.input.attrs({
  id: 'submit',
  type: 'submit',
  value: 'Search'
})`
  margin: 1em 0;
  width: 200px;
  height: 5vh;
  background-color: #303030;
  color: #fafafa;
  font-size: 1em;
  border: 1px solid #303030;
  border-radius: 0px 10px 10px 0px ;
  text-align: center;
`;