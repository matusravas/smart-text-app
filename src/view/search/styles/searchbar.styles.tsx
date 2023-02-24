import { InputHTMLAttributes } from "react";
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

export const SearchbarWrapper = styled.div`
  height: auto;
  width: 100%;
  /* border: 1px solid #fafafa;
  box-shadow: 0 0 15px 2px #004ba033; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const SearchbarFormWrapper = styled.form`
  height: auto;
  width: 40%;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: right;
  align-items: center;
`;

export const SearchImage = styled.img`
  :hover {
    cursor: pointer;
  }
`

export const SearchInputWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  /* width: 100%; */
  width: auto;
  height: 70px;
  background-color: #fdfdfd;
  padding: 6px;
  padding-left: 20px;
  box-shadow: 2px 2px 10px #30303033;
  transition: all 0.2s ease-in-out;
  border: 2px solid #fafafa; 
  border-radius: 10px;
  :hover, :focus-within {
    border: 2px solid #004ba033 !important;
    box-shadow: 2px 2px 10px #004ba033;
    /* transform: scale(1.01); */
  }

`

export const SearchInputIconWrapper = styled.div`
  position: absolute;
`

export interface StyledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'autocomplete' | 'placeholder'> {

}

export const SearchInput = styled.input.attrs({
  type: 'text',
  autocomplete: false,
  placeholder: 'Search...',
})<StyledInputProps>
`
  width: 100%;
  height: 100%;
  font-size: 20px;
  outline: none;
  padding: 0px;
  border: 0px;
  ::placeholder {
    color: rgba(0,0,0,0.54)
  }
`;

export const SearchButton = styled.input.attrs({
  id: 'submitButton',
  type: 'submit',
  value: 'Search'
})`
  /* @keyframes pulse {
    0% {
     transform: scale(1, 1);
    }

    50% {
     transform: scale(1.05, 1.05);
    }

    100% {
    transform: scale(1, 1);
    }
  }; */
  width: 30%;
  height: 50px;
  background-color: #303030;
  color: #fafafa;
  font-size: 1em;
  text-align: center;
  border: none !important;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 2px 10px #30303033;
  outline: none;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    transform: scale(1.01)
    /* animation: pulse 0.5s linear 2; */
  };
`;