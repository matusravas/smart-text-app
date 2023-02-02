import styled from "styled-components";

export const SidebarWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 6px;
height: 100%;
overflow-x: hidden;
z-index: 10;
/* padding: 6px; */
background: #fafafa;
box-shadow: 2px 2px 10px #30303010;
transition: all 0.5s ease;
:hover {
    width: 70px;
    background: #fafafa;
}
`