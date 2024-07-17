import {
  CircularProgress,
  CircularProgressProps,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { mainContext } from "../../../context";
import { colors } from "../../../const";

const styles = {
  image: {
    width: "50px",
    height: "50px",
  },
  borderBottom: {
    borderBottom: `3px solid ${colors.separatorBlue}`,
  },
  title: {
    textAlign: "end",
  },
  subtitle: {
    textAlign: "end",
    color: colors.halfTransparentBlue,
  },
};

const steps = [
  { currentStep: "Choose location", nextStep: "Select issue" },
  { currentStep: "Select issue", nextStep: "Provide details" },
  { currentStep: "Provide details", nextStep: "Stay upload" },
  { currentStep: "Stay upload", nextStep: "Confirm information" },
];

function MobileStepper(props: CircularProgressProps & { maxSteps: number }) {
  const { currentStep } = useContext(mainContext);

  const { maxSteps } = props;

  if (currentStep + 1 > maxSteps) {
    return (
      <Box width="100%" mb={3} sx={styles.borderBottom}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          columnGap={2}
          width="100%"
          mt={5}
          mb={3}
        >
          <img
            src={require("../../../images/icon-white.png")}
            style={styles.image}
            alt="..."
          />
          <Typography typography="h5">Thank you!</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
      height="150px"
      sx={styles.borderBottom}
    >
      <Stack
        sx={{
          position: "relative",
          display: "inline-flex",
          width: "50%%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          {...props}
          sx={{
            width: "80px",
            color: colors.activeGreen,
            borderRadius: "50%",
            boxShadow: `inset 0 0 0 7px ${colors.paleBlue}`,
          }}
          size="large"
          value={(currentStep + 1) * 25}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.defaultWhite,
          }}
        >
          <Typography variant="caption" component="div" typography="h5">
            {currentStep + 1}/{maxSteps}
          </Typography>
        </Box>
      </Stack>
      <Stack width="50%">
        <Typography sx={styles.title} typography="h5">
          {steps[currentStep].currentStep}
        </Typography>
        <Typography sx={styles.subtitle} typography="subtitle1">
          Next: {steps[currentStep].nextStep}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default MobileStepper;
