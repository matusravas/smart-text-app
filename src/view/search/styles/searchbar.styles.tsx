import styled from "styled-components";

export const SearchDashboardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SearchBarWrapper = styled.form`
  height: 200px;
  width: 90vw;
  /* border: 1px solid #fafafa;
  box-shadow: 0 0 15px 2px #004ba033; */
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    border: 2px solid #303030;
    border-radius: 10px;
  }
`;

export const SearchInput = styled.input.attrs({
  id: 'searchInput',
  type: 'text',
  placeholder: 'Search...'
})`
  width: 40%;
  height: 55px;
  padding-left: 20px;
  font-size: 20px;
  outline: none;
  &:focus {
   border-color: #004ba0;
   box-shadow: 0 0 15px 2px #004ba033//rgba(33,33,33,.2);
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
  height: 50px;
  background-color: #303030;
  color: #fafafa;
  font-size: 1em;
  text-align: center;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 15px 2px #30303033
  };
`;

export const Divider = styled.hr`
  border-top: 0px solid;
  color: #303030;
  box-shadow: 0 0 15px 2px rgba(33,33,33,.2);
  width: 100%;
`