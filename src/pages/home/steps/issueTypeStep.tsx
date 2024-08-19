/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button, useMediaQuery } from "@mui/material";
import { issueReportFormSteps } from ".";
import { IssueType } from "../../../components/molecules";
import { colors } from "../../../const";
import { getIssueTypes } from "../network/services";
import { useSnackbar } from "notistack";

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
  issueTypes: {
    maxHeight: "500px",
    overflow: "auto",
  },
  errorText: {
    color: colors.errorRed,
  },
};

export const IssueTypeFormStep: React.FC<StepProps> = ({
  formOptions,
  setStep,
}) => {
  const { watch, setValue, errors, trigger } = formOptions;
  const issueTypeWatch = watch("issueType");
  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const isWidth450pxOrLess = useMediaQuery("(max-width: 450px)");

  useEffect(() => {
    getIssueTypes()
      .then((data: any) => {
        setIssueTypes(data);
      })
      .catch((e) => {
        enqueueSnackbar({
          variant: "error",
          message: e.data.message,
        });
      });
  }, [enqueueSnackbar]);

  const handleValidate = async () => {
    await trigger("issueType");
  };

  return (
    <Stack p={isWidth450pxOrLess ? 2 : 7} height="100%" width="90%">
      <Stack spacing={1}>
        {!isWidth450pxOrLess && (
          <Typography typography="h6" sx={styles.stepLabel}>
            Step 2/4
          </Typography>
        )}
        <Typography typography={isWidth450pxOrLess ? "h4" : "h5"}>
          Describe the issue
        </Typography>
        <Typography
          typography={isWidth450pxOrLess ? "subtitle1" : "subtitle2"}
          sx={styles.subtitle}
        >
          Choose from the issue types below and provide some information and
          photos if possible
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
        sx={styles.issueTypes}
      >
        {issueTypes.map((props) => (
          <IssueType
            {...props}
            blurred={issueTypeWatch && issueTypeWatch?.id !== props.id}
            isSelected={issueTypeWatch?.id === props.id}
            onSelectIssueType={(issueTypeObj: any) => {
              setValue("issueType", issueTypeObj);
            }}
          />
        ))}
        {!!errors?.issueType && (
          <Typography typography="subtitle1" mb={2} sx={styles.errorText}>
            {errors.issueType?.id?.message}
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent={isWidth450pxOrLess ? "flex-start" : "flex-end"}
        ml={isWidth450pxOrLess ? 2 : 0}
        columnGap={2}
        mt={"auto"}
      >
        <Button
          onClick={() => setStep(issueReportFormSteps.LOCATION)}
          sx={styles.backButton}
          size="large"
          variant="outlined"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleValidate().then(() => {
              if (issueTypeWatch && !errors.issueType) {
                setStep(issueReportFormSteps.DETAILS);
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
