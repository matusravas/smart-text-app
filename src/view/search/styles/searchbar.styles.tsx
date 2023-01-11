import styled from "styled-components";


export const StyledSearchBarWrapper = styled.form`
  height: 150px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    height: 100%;
    border: 2px solid #303030;
    border-radius: 10px;
    margin: 10px;
  }
`;

export const SearchInput = styled.input.attrs({
  id: 'searchInput',
  type: 'text',
  placeholder: 'Search...'
})`
  width: 40vw;
  padding-left: 20px;
  font-size: 20px;
  outline: none;
  &:focus {
   border-color: palevioletred;
   box-shadow: 0 0 15px 2px rgba(33,33,33,.2);
  }
  ::placeholder {
    color: #30303020
  }
`;

export const SearchButton = styled.input.attrs({
  id: 'submitButton',
  type: 'submit',
  value: 'Search'
})`
  width: 10vw;
  background-color: #303030;
  color: #fafafa;
  font-size: 1em;
  text-align: center;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 15px 2px rgba(33,33,33,.2);
  };
`;