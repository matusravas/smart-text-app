import styled from "styled-components"

export const SearchToolbar = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  padding: 10px 8px;
`

export const MenuButtonWrapper = styled.button`
  min-width: 125px;
  padding: 10px;
  outline: none;
  border: 0px ;
  border-radius: 10px;
  background-color: #fafafa;
  color: #f2f2f2;
  :hover {
    cursor: pointer;
    filter: brightness(90%);
    /* filter: brightness(75%); */
  }
`