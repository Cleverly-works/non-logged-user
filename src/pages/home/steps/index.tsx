/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

import { LocationFormStep } from "./locationStep";
import { IssueTypeFormStep } from "./issueTypeStep";
import { DetailsFormStep } from "./detailsStep";
import { StayUploadFormStep } from "./stayUploadStep";

import { mainContext } from "../../../context";
import { usePredefinedQueryParams } from "../../../hooks";
import { issueReportValidationSchema } from "../form/reportIssueValidationSchema";
import { ConfirmFormStep } from "./confirmStep";
import { useNavigate } from "react-router-dom";
import { createReportedIssue } from "../network/services";
import { RoutesPath } from "../../../routing/routes";
import { useMediaQuery } from "@mui/material";

enum IssueReportFormStepNames {
  LOCATION = "LOCATION",
  ISSUE_TYPE = "ISSUE_TYPE",
  DETAILS = "DETAILS",
  STAY_UPLOAD = "STAY_UPLOAD",
  CONFIRM = "CONFIRM",
}

export const issueReportFormSteps: Record<IssueReportFormStepNames, number> = {
  [IssueReportFormStepNames.LOCATION]: 0,
  [IssueReportFormStepNames.ISSUE_TYPE]: 1,
  [IssueReportFormStepNames.DETAILS]: 2,
  [IssueReportFormStepNames.STAY_UPLOAD]: 3,
  [IssueReportFormStepNames.CONFIRM]: 4,
};

export const IssueReportForm = () => {
  const isWidth450pxOrLess = useMediaQuery("(max-width: 450px)");
  const [step, setStep] = useState(issueReportFormSteps.LOCATION);
  const [creatingReportLoading, setCreatingReportLoading] =
    useState<boolean>(false);
  const { setCurrentStep, hasShowedWelcomeMobiledScreen } =
    useContext(mainContext);
  const { enqueueSnackbar } = useSnackbar();

  const { predefinedParams, rawStringParams } = usePredefinedQueryParams();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      location: predefinedParams?.location.locationForSelect,
      sublocation: predefinedParams?.sublocation?.sublocationForSelect,
      shouldSendNotifications: false,
    },
    resolver: yupResolver(issueReportValidationSchema),
  });

  const navigate = useNavigate();

  const handleSetStep = (currentStep: number) => {
    setStep(currentStep);
    setCurrentStep(currentStep);
  };

  const formOptions = {
    control,
    errors,
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    trigger,
  };

  const onSubmit = (data: any) => {
    setCreatingReportLoading(true);
    createReportedIssue({
      ...data,
      customerId: predefinedParams?.customer.id,
    })
      .then((res) => {
        setCreatingReportLoading(false);
        navigate(`${RoutesPath.ACKNOWLEDGMENT}?jobId=${res.jobId}`);
        reset();
      })
      .catch((e) => {
        console.log("Error", e);
        enqueueSnackbar({
          variant: "error",
          message: e.data.message,
        });
        setCreatingReportLoading(false);
      });
  };

  if (isWidth450pxOrLess && !hasShowedWelcomeMobiledScreen) {
    navigate(`${RoutesPath.WELCOME_MOBILE}/?${rawStringParams}`);
  }

  let formStep: React.ReactNode | null = null;

  switch (step) {
    case issueReportFormSteps.LOCATION:
      formStep = (
        <LocationFormStep
          setStep={handleSetStep}
          formOptions={formOptions}
          predefinedParams={predefinedParams}
        />
      );
      break;
    case issueReportFormSteps.ISSUE_TYPE:
      formStep = (
        <IssueTypeFormStep setStep={handleSetStep} formOptions={formOptions} />
      );
      break;
    case issueReportFormSteps.DETAILS:
      formStep = (
        <DetailsFormStep setStep={handleSetStep} formOptions={formOptions} />
      );
      break;
    case issueReportFormSteps.STAY_UPLOAD:
      formStep = (
        <StayUploadFormStep setStep={handleSetStep} formOptions={formOptions} />
      );
      break;
    case issueReportFormSteps.CONFIRM:
      formStep = <ConfirmFormStep setStep={handleSetStep} formData={watch()} />;
      break;
    default:
      formStep = null;
      break;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      style={{ height: "90%" }}
    >
      {formStep}
    </form>
  );
};
