/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { Box, Typography, Stack, Button, useMediaQuery } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";

import { SearchAutocomplete } from "../../../components/molecules";
import { issueReportFormSteps } from ".";
import { colors } from "../../../const";
import { getAllLocations, getAllSublocations } from "../network/services";

type StepProps = {
  setStep: (currentStep: number) => void;
  formOptions: any;
  predefinedParams: any;
};

const styles = {
  stepLabel: {
    color: colors.halfTransparentBlue,
  },
  subtitle: {
    color: colors.halfTransparentBlue,
  },
  input: {
    "& .MuiAutocomplete-input": {
      color: `${colors.defaultWhite}!important`,
    },
    input: { color: `${colors.defaultWhite}!important` },
    color: `${colors.defaultWhite}!important`,

    borderColor: `${colors.activeGreen}!important`,
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
};

export const LocationFormStep: React.FC<StepProps> = ({
  setStep,
  formOptions,
  predefinedParams,
}) => {
  const { control, errors, watch } = formOptions;
  const locationWatch = watch("location");
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  const [locations, setLocations] = useState<any[]>([]);
  const [sublocations, setSublocations] = useState<any[]>([]);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const [sublocationsLoading, setSublocationsLoading] =
    useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const getLocations = (): void => {
    setLocationsLoading(true);
    getAllLocations()
      .then((data: any) => {
        setLocations(data);
        setLocationsLoading(false);
      })
      .catch((e) => {
        setLocationsLoading(false);
        enqueueSnackbar({
          variant: "error",
          message: e.data.message,
        });
      });
  };

  const getSublocations = (): void => {
    setSublocationsLoading(true);
    getAllSublocations()
      .then((data: any) => {
        setSublocations(data);
        setSublocationsLoading(false);
      })
      .catch((e) => {
        setSublocationsLoading(false);
        enqueueSnackbar({
          variant: "error",
          message: e.data.message,
        });
      });
  };

  return (
    <Stack p={isWidth425pxOrLess ? 2 : 7} height="100%" width="90%">
      <Stack spacing={1}>
        {!isWidth425pxOrLess && (
          <Typography typography="h6" sx={styles.stepLabel}>
            Step 1/4
          </Typography>
        )}
        <Typography typography={isWidth425pxOrLess ? "h4" : "h5"}>
          Start with the location
        </Typography>
        <Typography
          typography={isWidth425pxOrLess ? "subtitle1" : "subtitle2"}
          sx={styles.subtitle}
        >
          Please tell us where the issue has occurred using the dropdown below
          if needed
        </Typography>
      </Stack>
      <Stack spacing={4} mt={3}>
        <Controller
          name="location"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SearchAutocomplete
              value={value}
              disabled={!!predefinedParams?.location.id}
              loading={locationsLoading}
              textFieldProps={{
                error: !!errors.location,
                helperText: errors.location?.message,
              }}
              onOpen={getLocations}
              color={colors.defaultWhite}
              onChange={(_, newValue) => onChange(newValue)}
              options={locations}
            />
          )}
        />
        {locationWatch && predefinedParams?.sublocation && (
          <Controller
            name="sublocation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SearchAutocomplete
                value={value}
                disabled={!!predefinedParams?.sublocation?.id}
                loading={sublocationsLoading}
                textFieldProps={{
                  color: "primary",
                  error: !!errors.sublocation,
                  helperText: errors.sublocation?.message,
                }}
                onOpen={getSublocations}
                color="primary"
                onChange={(_, newValue) => onChange(newValue)}
                options={sublocations}
              />
            )}
          />
        )}
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={"auto"}>
        <Button
          onClick={() => setStep(issueReportFormSteps.ISSUE_TYPE)}
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
