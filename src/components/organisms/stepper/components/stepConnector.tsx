import { styled } from "@mui/material";
import MuiStepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { colors } from "../../../../const";

export const StepConnector = styled(MuiStepConnector)(() => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: "33px",
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 50,
    border: 0,
    width: 3,
    backgroundColor: colors.lightBlue,
    borderRadius: 1,
  },
}));
