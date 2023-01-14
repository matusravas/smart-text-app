import styled from "styled-components";

export const SearchDashboardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap; 
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
  & .select {
    outline: none;
    height: 100%;
  };
  & .label {
    font-size: 1rem;
    color: palegoldenrod;
    /* position: absolute;
    top: 10px; */
  }
`

export const SearchBarWrapper = styled.form`
  height: 200px;
  width: 40%;
  /* border: 1px solid #fafafa;
  box-shadow: 0 0 15px 2px #004ba033; */
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #searchInput, #submitButton {
    border: 2px solid #303030;
    border-radius: 10px;
  }
`;

export const SearchToolBarWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fdfdfd;
  border-radius: 10px;
  padding: 10px 2px 5px 2px;
  gap: 30px;
  /* border-color: #004ba0; */
  box-shadow: 0 0 15px 1px #004ba033;
`

export const SearchInput = styled.input.attrs({
  id: 'searchInput',
  type: 'text',
  placeholder: 'Search...'
})`
  width: 100%;
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
  width: 30%;
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