import styled from "styled-components";

export const SidebarWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 15px;
height: 100%;
overflow-x: hidden;
z-index: 10;
/* padding: 6px; */
background: #ffffff;
box-shadow: 2px 2px 10px #30303010;
transition: 0.5s;
:hover {
    width: 80px;
}
`
export const SidebarItemTooltip = styled.div`
    background: #30303033;
    border-radius: 10px;
    padding: 6px;
    .tooltip {
    position: relative;
    display: inline-block;
    }

    .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    }
`

export const MenuItem = styled.p`
    display: block;
    padding: 16px;
`