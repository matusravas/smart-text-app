import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
    & label.Mui-focused {
        color: white;
    }
    & .MuiInput-underline::after {
        border-bottom-color: #303030;
    }
`;