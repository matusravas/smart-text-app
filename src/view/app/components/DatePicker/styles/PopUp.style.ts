import styled from "styled-components";

export const PopUpBackground = styled.div<{
  zIndex: number;
  backgroundColor?: string;
}>`
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgba(0, 0, 0, 0.2)"};
  z-index: ${(props) => props.zIndex};
  position: fixed;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;
