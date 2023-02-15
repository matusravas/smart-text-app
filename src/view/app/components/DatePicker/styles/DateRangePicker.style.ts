import styled from "styled-components";

export const DateRangePickerWrapper = styled.div`
  border-radius: 10px;
`

export const DateRangePickerContentWraper = styled.div`
  position: relative;
  top: calc(50% - 150px);
  left: 50%;
  transform: translate(-50%, 0%);
  background: white;
  display: flex;
  flex-direction: column;
`
export const DateRangePickerInputsWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 0px 5px;
`

export const DateRangePickerConfirmButton = styled.button`
  padding: 10px;
  outline: none;
  border: 0px ;
  background-color: #303030;
  color: #fafafa;
  :hover {
    cursor: pointer;
    /* filter: brightness(75%); */
  }
`