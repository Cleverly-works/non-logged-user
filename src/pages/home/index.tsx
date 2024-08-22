import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  // Button,
  // FormControlLabel,
  Stack,
  TextField,
  useMediaQuery,
  // Checkbox,
  Typography,
} from "@mui/material";

import { StepLabel } from "../../components/atoms";
import { SearchAutocomplete, IssueType } from "../../components/molecules";
import {
  createReportedIssue,
  getAllLocations,
  getAllSublocations,
  getIssueTypes,
} from "./network/services";
import { MediaSelector } from "../../components/organisms";
import { SubmitModal } from "./modals";
import { issueReportValidationSchema } from "./form/reportIssueValidationSchema";
import { RoutesPath } from "../../routing/routes";
import { colors } from "../../const";
import { LoadingLayout } from "../../components/templates";
import { usePredefinedQueryParams } from "../../hooks";

const styles = {
  stepBox: {
    margin: "0 20px",
  },
  mainTitle: {
    margin: "0px 20px",
    marginBottom: "20px",
  },
  submitButton: (isWidth425pxOrLess: boolean) => ({
    height: "35px",
    ...(isWidth425pxOrLess
      ? { margin: "auto!important" }
      : { marginLeft: "auto!important" }),
  }),
  description: {
    backgroundColor: colors.defaultWhite,
  },
  notificationsCheckbox: (isWidth425pxOrLess: boolean) => ({
    display: "flex",
    alignItems: "center",
    ...(isWidth425pxOrLess
      ? {
          margin: "20px",
        }
      : {}),
  }),
  textField: (isWidth425pxOrLess: boolean) => ({
    height: "80px",
    ...(isWidth425pxOrLess
      ? {
          width: "100%",
          margin: "5px 10px",
        }
      : { width: "20%", marginRight: "15px" }),
  }),
  errorText: {
    color: colors.errorRed,
  },
  textDefault: {
    textTransform: "none",
  },
  issueTypes: {
    maxHeight: "600px",
    overflow: "auto",
  },
  mr: {
    marginLeft: "3em",
  },
  userInfoFields: {
    height: "80px",
  },
};

export const HomePage = () => {
  const { predefinedParams } = usePredefinedQueryParams();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      location: predefinedParams?.location.locationForSelect,
      sublocation: predefinedParams?.sublocation?.sublocationForSelect,
      shouldSendNotifications: false,
    },
    resolver: yupResolver(issueReportValidationSchema),
  });

  const [reportIssueData, setReportIssueData] = useState<any | null>(null);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const [sublocationsLoading, setSublocationsLoading] =
    useState<boolean>(false);
  const [creatingReportLoading, setCreatingReportLoading] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [sublocations, setSublocations] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const isWidth425pxOrLess = useMediaQuery("(max-width: 768px)");

  const mediaFilesWatch = watch("attachments") || [];
  const locationWatch = watch("location");
  const issueTypeWatch = watch("issueType");

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

  const handleReportAnIssue = (form: any): void => {
    setReportIssueData(form);
    setisModalOpen(true);
  };

  const handleSubmitForm = (): void => {
    setCreatingReportLoading(true);
    createReportedIssue({
      ...reportIssueData,
      customerId: predefinedParams?.customer.id,
    })
      .then((data) => {
        setCreatingReportLoading(false);
        navigate(`${RoutesPath.ACKNOWLEDGMENT}?jobId=${data.jobId}`);
        reset();
      })
      .catch((e) => {
        enqueueSnackbar({
          variant: "error",
          message: e.data.message,
        });
        setCreatingReportLoading(false);
      });
  };

  return (
    <LoadingLayout loading={creatingReportLoading}>
      <>
        <Typography typography="h6" sx={styles.mainTitle}>
          Please complete the fields below with details of the issue and then
          click submit.
        </Typography>
        <form onSubmit={handleSubmit(handleReportAnIssue)}>
          <Stack
            justifyContent="space-between"
            alignItems="space-between"
            height="100%"
          >
            <Stack direction="row" flexWrap="wrap">
              <Stack
                sx={{
                  ...styles.stepBox,
                  width: isWidth425pxOrLess ? "100%" : "35%",
                }}
                rowGap={2}
              >
                <StepLabel counter={1} text="Select your location: " />
                <Controller
                  name="location"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SearchAutocomplete
                      value={value}
                      disabled={!!predefinedParams?.location.id}
                      loading={locationsLoading}
                      textFieldProps={{
                        color: "primary",
                        label: "Select location",
                        error: !!errors.location,
                        helperText: errors.location?.message,
                      }}
                      onOpen={getLocations}
                      color="primary"
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
                          label: "Select sublocation",
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
                <StepLabel
                  counter={3}
                  text="Please provide a brief description of the issue and upload a photo if available (and relevant)"
                />
                <TextField
                  multiline
                  rows={4}
                  sx={styles.description}
                  {...register("description")}
                  maxRows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
                <MediaSelector
                  values={mediaFilesWatch}
                  setValue={setValue as any}
                />
              </Stack>
              <Stack
                sx={{
                  ...styles.stepBox,
                  width: isWidth425pxOrLess ? "100%" : "55%",
                }}
              >
                <Stack sx={styles.mr}>
                  <StepLabel
                    counter={2}
                    text="Select the relevant issue type"
                  />
                  {!!errors?.issueType && (
                    <Typography
                      typography="subtitle1"
                      mb={2}
                      sx={styles.errorText}
                    >
                      {errors.issueType?.id?.message}
                    </Typography>
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent={
                    isWidth425pxOrLess ? "space-between" : "flex-start"
                  }
                  alignItems="flex-start"
                  flexWrap="wrap"
                  sx={styles.issueTypes}
                  m={3}
                >
                  {issueTypes.map((props) => (
                    <IssueType
                      {...props}
                      blurred={
                        issueTypeWatch && issueTypeWatch?.id !== props.id
                      }
                      isSelected={issueTypeWatch?.id === props.id}
                      onSelectIssueType={(issueTypeObj: any) => {
                        setValue("issueType", issueTypeObj);
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            {/* <Stack rowGap={2} sx={{ ...styles.stepBox }}>
              <StepLabel counter={4} text="Your details" />
              <Stack
                direction="row"
                alignItems="center"
                rowGap={2}
                flexWrap="wrap"
              >
                <TextField
                  sx={styles.textField(isWidth425pxOrLess)}
                  color="primary"
                  placeholder="Your name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  sx={styles.textField(isWidth425pxOrLess)}
                  color="primary"
                  placeholder="Your email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  sx={styles.textField(isWidth425pxOrLess)}
                  color="primary"
                  placeholder="Your phone number"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    ...styles.submitButton(isWidth425pxOrLess),
                    ...styles.textDefault,
                  }}
                >
                  Submit
                </Button>
              </Stack>
              <Controller
                control={control}
                name="shouldSendNotifications"
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    sx={styles.notificationsCheckbox(isWidth425pxOrLess)}
                    label="Please check this box if you would like to be notified regarding updates to this issue such as attendance time (if appropriate)"
                    control={
                      <Checkbox
                        checked={value}
                        color="primary"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(e.target?.checked)
                        }
                      />
                    }
                  />
                )}
              />
            </Stack> */}
          </Stack>
        </form>
        {isModalOpen && (
          <SubmitModal
            open={isModalOpen}
            onClose={() => setisModalOpen(false)}
            onSubmit={handleSubmitForm}
            formData={reportIssueData}
          />
        )}
      </>
    </LoadingLayout>
  );
};
