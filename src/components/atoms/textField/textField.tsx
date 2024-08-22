import { TextField as MuiTextField, styled } from "@mui/material";
import { colors } from "../../../const";
import { forwardRef } from "react";

const StyledMuiInput = styled(MuiTextField)({
  "&:-webkit-autofill": {
    webkitBoxShadow: "0 0 0 100px inherit inset",
    webkitTextFillColor: "inherit",
  },
  [`& .MuiInputBase-root`]: {
    borderRadius: "15px",
    border: `2px solid ${colors.activeGreen}!important`,
  },
  [`& .Mui-disabled`]: {
    color: `${colors.defaultWhite}!important`,
    opacity: 0.7,
    "-webkit-text-fill-color": `${colors.defaultWhite}!important`,
  },
  input: {
    color: `${colors.defaultWhite}!important`,
    "-webkit-text-fill-color": `${colors.defaultWhite}!important`,
    "&:focus": {
      outline: "none!important",
    },
    "&:-webkit-autofill": {
      webkitBoxShadow: "0 0 0 100px inherit inset",
      webkitTextFillColor: "inherit",
    },
  },
  textarea: {
    color: `${colors.defaultWhite}!important`,
    "-webkit-text-fill-color": `${colors.defaultWhite}!important`,
    "&:focus": {
      outline: "none!important",
    },
    "&:-webkit-autofill": {
      webkitBoxShadow: "0 0 0 100px inherit inset",
      webkitTextFillColor: "inherit",
    },
  },
});

const TextField = forwardRef(function (props: any, ref: any) {
  return <StyledMuiInput {...props} ref={ref} />;
});

export default TextField;
