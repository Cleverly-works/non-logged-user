/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Box, Typography, Stack, Button, useMediaQuery } from "@mui/material";
import { TextField } from "../../../components/atoms";
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
  description: (isWidth450pxOrLess: boolean) => ({
    width: "100%",
    height: isWidth450pxOrLess ? "300px" : "150px",
    borderRadius: "20px",
    margin: "20px 10px",
    ...(isWidth450pxOrLess
      ? {
          "& .MuiInputBase-root": {
            height: "280px",
          },
          textarea: {
            height: "260px!important",
          },
        }
      : {}),
  }),
};

export const DetailsFormStep: React.FC<StepProps> = ({
  formOptions,
  setStep,
}) => {
  const { register, errors, watch, setValue, trigger } = formOptions;
  const isWidth450pxOrLess = useMediaQuery("(max-width: 450px)");

  const mediaFilesWatch = watch("attachments") || [];
  const descriptionWatch = watch("description");

  const handleValidate = async () => {
    await trigger("description");
  };

  return (
    <Stack p={isWidth450pxOrLess ? 2 : 7} height="100%" width="90%">
      <Stack spacing={1}>
        {!isWidth450pxOrLess && (
          <Typography typography="h6" sx={styles.stepLabel}>
            Step 3/4
          </Typography>
        )}
        <Typography typography={isWidth450pxOrLess ? "h4" : "h5"}>
          Provide details
        </Typography>
        <Typography
          typography={isWidth450pxOrLess ? "subtitle1" : "subtitle2"}
          sx={styles.subtitle}
        >
          Please provide a brief description of the issue and upload a photo if
          available (and relevant):
        </Typography>
      </Stack>
      <TextField
        multiline
        rows={4}
        sx={styles.description(isWidth450pxOrLess)}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Box ml={2}>
        <MediaSelector values={mediaFilesWatch} setValue={setValue as any} />
      </Box>
      <Stack
        direction="row"
        justifyContent={isWidth450pxOrLess ? "flex-start" : "flex-end"}
        ml={isWidth450pxOrLess ? 2 : 0}
        columnGap={2}
        mt="auto"
      >
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
            handleValidate().then(() => {
              if (descriptionWatch || mediaFilesWatch?.length) {
                setStep(issueReportFormSteps.STAY_UPLOAD);
              }
            });
          }}
          sx={styles.nextButton}
          size="large"
          variant="contained"
        >
          Next step
        </Button>
      </Stack>
    </Stack>
  );
};
