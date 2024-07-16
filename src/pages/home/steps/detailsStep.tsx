/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import { issueReportFormSteps } from ".";
import { MediaSelector } from "../../../components/organisms";
import { colors } from "../../../const";

type StepProps = {
  setStep: (currentStep: number) => void;
  formOptions: any;
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
  description: {
    border: `1px solid ${colors.activeGreen}`,
    color: colors.defaultWhite,
    "& .css-127vtyk-MuiInputBase-root-MuiOutlinedInput-root": {
      color: `${colors.defaultWhite}!important`,
      border: "none!important",
    },
    width: "100%",
    height: "150px",
    borderRadius: "20px",
    margin: "20px 10px",
    "&:hover": {
      border: `1px solid ${colors.activeGreen}`,
    },
  },
};

export const DetailsFormStep: React.FC<StepProps> = ({
  formOptions,
  setStep,
}) => {
  const { register, errors, watch, setValue, trigger } = formOptions;

  const mediaFilesWatch = watch("attachments") || [];
  const descriptionWatch = watch("description");

  const handleValidate = async () => {
    await trigger("description");
  };

  return (
    <Box p={7} height="100%" width="80%" display="inline-block">
      <Stack spacing={1}>
        <Typography typography="subtitle1" sx={styles.stepLabel}>
          Step 3/4
        </Typography>
        <Typography typography="h5">Provide details</Typography>
        <Typography typography="subtitle2" sx={styles.subtitle}>
          Please provide a brief description of the issue and upload a photo if
          available (and relevant):
        </Typography>
      </Stack>
      <TextField
        multiline
        rows={4}
        sx={styles.description}
        {...register("description")}
        maxRows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <MediaSelector values={mediaFilesWatch} setValue={setValue as any} />
      <Stack direction="row" justifyContent="flex-end" columnGap={2} mt="auto">
        <Button
          onClick={() => setStep(issueReportFormSteps.ISSUE_TYPE)}
          sx={styles.backButton}
          size="large"
          variant="outlined"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleValidate().then(() =>
              setStep(issueReportFormSteps.STAY_UPLOAD),
            );
          }}
          sx={styles.nextButton}
          disabled={!descriptionWatch && !mediaFilesWatch?.length}
          size="large"
          variant="contained"
        >
          Next step
        </Button>
      </Stack>
    </Box>
  );
};
