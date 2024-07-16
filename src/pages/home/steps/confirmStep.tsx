/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { issueReportFormSteps } from ".";

import { MediaDisplay, IssueType } from "../../../components/molecules";
import { colors } from "../../../const";

type StepProps = {
  setStep: (currentStep: number) => void;
  formData: any;
};

const styles = {
  stepLabel: {
    color: colors.halfTransparentBlue,
  },
  subtitle: {
    color: colors.halfTransparentBlue,
    fontSize: "12px",
  },
  backButton: {
    color: colors.defaultWhite,
    borderColor: colors.defaultWhite,
    borderRadius: "20px",
    width: "150px",
    "&:hover": {
      borderColor: colors.defaultWhite,
      opacity: 0.8,
    },
  },
  nextButton: {
    backgroundColor: colors.activeGreen,
    borderRadius: "20px",
    width: "150px",
    "&:hover": {
      backgroundColor: colors.activeGreen,
      opacity: 0.8,
    },
  },
  contactInformationTitle: {
    fontWeight: "700",
    margin: "20px 0",
  },
  infoItem: {
    margin: "10px 0px",
    alignItems: "center",
  },
  label: {
    width: "160px",
    fontWeight: "600",
  },
  value: {
    width: "80%",
    marginLeft: "50px",
  },
  description: {
    width: "80%",
    // maxHeight: "150px",
    marginLeft: "50px",
  },
};

export const ConfirmFormStep: React.FC<StepProps> = ({ formData, setStep }) => {
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  return (
    <Box p={7} height="100%" width="80%" display="inline-block">
      <Stack spacing={1}>
        <Typography typography="h5">
          Please check the information entered is correct
        </Typography>
        <Typography typography="subtitle2" sx={styles.subtitle}>
          Please recheck all information
        </Typography>
      </Stack>

      <Stack direction="row" sx={styles.infoItem}>
        <Typography typography="subtile1" sx={styles.label}>
          Your location:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value}>
          {formData.location.label}
        </Typography>
      </Stack>
      {formData.sublocation && (
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Your sublocation:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.sublocation.label}
          </Typography>
        </Stack>
      )}
      <Stack direction="row" sx={styles.infoItem}>
        <Typography
          typography="subtile1"
          sx={{
            ...styles.label,
            width: isWidth425pxOrLess ? "130px" : "160px",
          }}
        >
          Relevant issue:&nbsp;
        </Typography>
        <IssueType {...formData.issueType} displayMode />
      </Stack>
      <Stack direction="row" sx={styles.infoItem}>
        <Typography typography="subtile1" sx={styles.label}>
          Description:&nbsp;
        </Typography>
        <Stack>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.description}
          </Typography>
          <MediaDisplay mediaList={formData.attachments} />
        </Stack>
      </Stack>
      <Typography typography="h4" sx={styles.contactInformationTitle}>
        Contact information
      </Typography>
      <Stack direction="row" sx={styles.infoItem}>
        <Typography typography="subtile1" sx={styles.label}>
          Your name:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value}>
          {formData.name}
        </Typography>
      </Stack>
      <Stack direction="row" sx={styles.infoItem}>
        <Typography typography="subtile1" sx={styles.label}>
          Email:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value}>
          {formData.email}
        </Typography>
      </Stack>
      <Stack direction="row" sx={styles.infoItem}>
        <Typography typography="subtile1" sx={styles.label}>
          Number:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value}>
          {formData.phone}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" columnGap={2} mt="auto">
        <Button
          onClick={() => setStep(issueReportFormSteps.STAY_UPLOAD)}
          sx={styles.backButton}
          size="large"
          variant="outlined"
        >
          Back
        </Button>
        <Button
          sx={styles.nextButton}
          size="large"
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};
