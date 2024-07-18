import React from "react";
import { Box, Typography, Stack, Button, useMediaQuery } from "@mui/material";
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
  infoItem: (isWidth425pxOrLess: boolean) => ({
    ...(isWidth425pxOrLess ? { display: "block" } : { flexDirection: "row" }),
    margin: "10px 0px",
    alignItems: "center",
  }),
  label: (isWidth425pxOrLess: boolean) => ({
    color: isWidth425pxOrLess
      ? colors.halfTransparentBlue
      : colors.defaultWhite,
    width: "160px",
    fontWeight: "600",
  }),
  value: (isWidth425pxOrLess: boolean) => ({
    maxWidth: "300px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginLeft: isWidth425pxOrLess ? "0px" : "50px",
  }),
};

export const ConfirmFormStep: React.FC<StepProps> = ({ formData, setStep }) => {
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  return (
    <Box
      p={isWidth425pxOrLess ? 2 : 7}
      height="100%"
      width="90%"
      display="inline-block"
    >
      <Stack spacing={1}>
        <Typography typography="h5">
          Please check the information entered is correct
        </Typography>
        <Typography typography="subtitle2" sx={styles.subtitle}>
          Please recheck all information
        </Typography>
      </Stack>

      <Stack
        direction={isWidth425pxOrLess ? "column" : "row"}
        sx={styles.infoItem(isWidth425pxOrLess)}
      >
        <Typography typography="subtile1" sx={styles.label(isWidth425pxOrLess)}>
          Your location:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value(isWidth425pxOrLess)}>
          {formData.location.label}
        </Typography>
      </Stack>
      {formData.sublocation && (
        <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
          <Typography
            typography="subtile1"
            sx={styles.label(isWidth425pxOrLess)}
          >
            Your sublocation:&nbsp;
          </Typography>
          <Typography
            typography="subtile2"
            sx={styles.value(isWidth425pxOrLess)}
          >
            {formData.sublocation.label}
          </Typography>
        </Stack>
      )}
      <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
        <Typography
          typography="subtile1"
          sx={{
            ...styles.label(isWidth425pxOrLess),
          }}
        >
          Relevant issue:&nbsp;
        </Typography>
        <Box ml={isWidth425pxOrLess ? 0 : 3}>
          <IssueType {...formData.issueType} displayMode />
        </Box>
      </Stack>
      <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
        <Typography typography="subtile1" sx={styles.label(isWidth425pxOrLess)}>
          Description:&nbsp;
        </Typography>
        <Stack>
          <Typography
            typography="subtile2"
            sx={{
              ...styles.value(isWidth425pxOrLess),
            }}
          >
            {formData.description}
          </Typography>
        </Stack>
      </Stack>
      {!!formData.attachments?.length && (
        <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
          <Typography
            typography="subtile1"
            sx={styles.label(isWidth425pxOrLess)}
          >
            Media:&nbsp;
          </Typography>
          <Box sx={styles.value(isWidth425pxOrLess)}>
            <MediaDisplay mediaList={formData.attachments} />
          </Box>
        </Stack>
      )}
      <Typography typography="h4" sx={styles.contactInformationTitle}>
        Contact information
      </Typography>
      <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
        <Typography typography="subtile1" sx={styles.label(isWidth425pxOrLess)}>
          Your name:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value(isWidth425pxOrLess)}>
          {formData.name}
        </Typography>
      </Stack>
      <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
        <Typography typography="subtile1" sx={styles.label(isWidth425pxOrLess)}>
          Email:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value(isWidth425pxOrLess)}>
          {formData.email}
        </Typography>
      </Stack>
      <Stack direction="row" sx={styles.infoItem(isWidth425pxOrLess)}>
        <Typography typography="subtile1" sx={styles.label(isWidth425pxOrLess)}>
          Number:&nbsp;
        </Typography>
        <Typography typography="subtile2" sx={styles.value(isWidth425pxOrLess)}>
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
