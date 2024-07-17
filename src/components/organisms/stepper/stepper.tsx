import { Step, Stepper as MuiStepper, Box, Typography } from "@mui/material";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";

import { StepConnector } from "./components/stepConnector";
import { StepIcon } from "./components/stepIcon";
import { colors } from "../../../const";

const styles: Record<string, any> = {
  wrapper: {
    maxWidth: 400,
    height: "100%",
    padding: "0 4em",
  },
  label: {
    maxWidth: "300px",
    color: colors.activeGreen,
    marginBottom: "30px",
  },
  stepLabel: (isActive: boolean) => ({
    [`& .${stepLabelClasses.label}`]: {
      color: isActive
        ? `${colors.defaultWhite}!important`
        : `${colors.halfTransparentBlue}!important`,
      marginLeft: "15px",
      fontSize: "18px",
      fontWeight: "600",
    },
    padding: "0!important",
  }),
};

const steps = [
  {
    label: "Choose location",
  },
  {
    label: "Select issue",
  },
  {
    label: "Provide details",
  },
  {
    label: "Stay updated",
  },
];

type StepperProps = {
  currentStep: number;
};

function Stepper({ currentStep }: StepperProps) {
  return (
    <Box sx={styles.wrapper}>
      <Typography typography="h6" sx={styles.label}>
        Here, you can report an issue quickly and easily.
      </Typography>
      <MuiStepper
        activeStep={currentStep}
        connector={<StepConnector />}
        orientation="vertical"
      >
        {steps.map(({ label }, ndx) => (
          <Step key={label}>
            <StepLabel
              sx={styles.stepLabel(currentStep >= ndx)}
              StepIconComponent={StepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
}

export default Stepper;
