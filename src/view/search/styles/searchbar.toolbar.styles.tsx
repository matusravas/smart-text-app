import styled, {css} from "styled-components"

export const SearchToolbar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  padding: 10px 8px;
`

export const MenuButtonWrapper = styled.button`
  padding: 10px;
  outline: none;
  border: 0px ;
  border-radius: 10px;
  background-color: white;
  :hover {
    ${props => !props.disabled && css`
      cursor: pointer;
      filter: brightness(90%);
    `
    }
  }
`