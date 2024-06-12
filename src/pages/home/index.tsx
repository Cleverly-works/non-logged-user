import { useState } from "react";
import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";

import { StepLabel } from "../../components/atoms";
import { SearchAutocomplete, IssueType } from "../../components/molecules";
import { getAllLocations } from "./network/services";
import { MediaSelector } from "../../components/organisms";
import { colors } from "../../const";
import { SubmitModal } from "./modals";
import mockImage from "../../images/icon.svg";
import { issueReportValidationSchema } from "./form/reportIssueValidationSchema";

const mockData = new Array(10).fill(null).map((_, ndx) => ({
  id: ndx,
  label: "Label" + ndx,
  imageLink: mockImage,
}));

const styles = {
  stepBox: {
    margin: "0 20px",
  },
  userDetials: {
    marginBottom: "3em",
  },
  submitButton: {
    marginLeft: "auto!important",
    backgroundColor: colors.mainBlue,
  },
};

export const HomePage = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(issueReportValidationSchema),
  });
  const [reportIssueData, setReportIssueData] = useState(null);
  const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const isWidth400pxOrLess = useMediaQuery("(max-width: 400px)");

  const mediaFilesWatch = watch("attachments") || [];
  const issueTypeWatch = watch("issueType");

  console.log(errors);

  const getLocations = () => {
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
          message: e.message,
        });
      });
  };

  const handleReportAnIssue = (form: any) => {
    console.log(form);
    setReportIssueData(form);
  };

  // console.log(issueTypeWatch);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleReportAnIssue)}
        style={{ height: "100%" }}
      >
        <Stack
          justifyContent="space-between"
          alignItems="space-between"
          height="100%"
        >
          <Stack direction="row" flexWrap="wrap">
            <Stack
              sx={{
                ...styles.stepBox,
                width: isWidth400pxOrLess ? "100%" : "35%",
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
                    loading={locationsLoading}
                    textFieldProps={{
                      color: "primary",
                      label: "Select location",
                    }}
                    onOpen={getLocations}
                    color="primary"
                    onChange={(_, newValue) => onChange(newValue)}
                    options={locations}
                  />
                )}
              />
              <StepLabel
                counter={2}
                text="Please provide a brief description of the issue and upload a photo if available (and relevant)"
              />
              <TextField
                multiline
                rows={4}
                {...register("description")}
                maxRows={4}
              />
              <MediaSelector
                values={mediaFilesWatch}
                setValue={setValue as any}
              />
            </Stack>
            <Stack
              sx={{
                ...styles.stepBox,
                width: isWidth400pxOrLess ? "100%" : "55%",
              }}
            >
              <StepLabel counter={3} text="Select the relevant issue type" />
              <Stack direction="row" flexWrap="wrap">
                {mockData.map((props) => (
                  <IssueType
                    {...props}
                    blurred={issueTypeWatch && issueTypeWatch?.id !== props.id}
                    isSelected={issueTypeWatch?.id === props.id}
                    onSelectIssueType={(issueTypeObj: any) => {
                      console.log(issueTypeObj);
                      setValue("issueType", issueTypeObj);
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack rowGap={2} sx={styles.userDetials}>
            <StepLabel counter={4} text="Your details" />
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <TextField
                color="primary"
                placeholder="Your name"
                {...register("name")}
              />
              <TextField
                color="primary"
                placeholder="Your email"
                {...register("email")}
              />
              <TextField
                color="primary"
                placeholder="Your phone number"
                {...register("phone")}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={styles.submitButton}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
      {!!reportIssueData && (
        <SubmitModal
          open={!!reportIssueData}
          onClose={() => setReportIssueData(null)}
          formData={reportIssueData}
        />
      )}
    </>
  );
};
